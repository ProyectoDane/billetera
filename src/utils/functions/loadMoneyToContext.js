import { getBills, getCoins } from '../../dataAccess/Money';
import { getDineroWallet, getTotalWallet } from '../../dataAccess/Wallet';
import { getDineroSaving, getTotalSaving } from '../../dataAccess/Savings';
import {getUser} from "../../dataAccess/User";

async function getTotal() {
  const wallet = await getTotalWallet();
  let total = 0;
  let money = [];

  if (wallet) {
    money = await getDineroWallet(wallet.moneyId);

    for (let property of money) {
      const { amount, quantity } = property;
      total = total + amount * quantity;
    }

    return {
      money,
      total,
    };
  }

  return {
    money,
    total,
  };
}

async function getTotalSavings() {
  const savings = await getTotalSaving();
  let totalSavings = 0;
  let moneySavings = [];

  if (savings) {
    moneySavings = await getDineroSaving(savings.moneyId);

    for (let property of moneySavings) {
      const { amount, quantity } = property;
      totalSavings = totalSavings + amount * quantity;
    }

    return {
      moneySavings,
      totalSavings,
    };
  }

  return {
    moneySavings,
    totalSavings,
  };
}

/**
 * Carga el dinero desde la BD y lo pone en el contexto
 * @param context
 * @returns {Promise<void>}
 */
async function getMoney(context) {
  console.log("Start getting Money");
  let billetes = await getBills();
  let monedas = await getCoins();
  let user =  await getUser();

  let billetesSavings = [];
  let monedasSavings = [];

  for (let element of billetes) {
    let el = JSON.parse(JSON.stringify(element));
    billetesSavings.push(el);
  }

  for (let element of monedas) {
    let el = JSON.parse(JSON.stringify(element));
    monedasSavings.push(el);
  }

  const { money, total } = await getTotal();

  const { moneySavings, totalSavings } = await getTotalSavings();

  const idMoney = money.map(({ moneyId }) => moneyId);
  const idMoneySavings = moneySavings.map(({ moneyId }) => moneyId);

  let totalBilletes = billetes.map((el) => {
    let indexMoney = idMoney.indexOf(el.id);

    if (indexMoney > -1) {
      el.quantity = el.quantity + money[indexMoney].quantity;
    }
    return el;
  });

  let totalCoins = monedas.map((el) => {
    let indexMoney = idMoney.indexOf(el.id);

    if (indexMoney > -1) {
      el.quantity = el.quantity + money[indexMoney].quantity;
    }
    return el;
  });

  let totalBilletesSavings = billetesSavings.map((el) => {
    let indexMoney = idMoneySavings.indexOf(el.id);

    if (indexMoney > -1) {
      el.quantity = el.quantity + moneySavings[indexMoney].quantity;
    }

    return el;
  });

  let totalCoinsSavings = monedasSavings.map((el) => {
    let indexMoney = idMoneySavings.indexOf(el.id);

    if (indexMoney > -1) {
      el.quantity = el.quantity + moneySavings[indexMoney].quantity;
    }

    return el;
  });

  //// USER
  context.setCurrentUser(user);

  /////// WALLET

  context.setInitialBillsMoneyWallet(totalBilletes); //El ultimo estado recuperado de la BD
  context.setActualBillsMoneyWallet(totalBilletes); //Sujeto a cambios por la UI

  context.setInitialCoinsMoneyWallet(totalCoins); //El ultimo estado recuperado de la BD
  context.setActualCoinsMoneyWallet(totalCoins); //Sujeto a cambios por la UI
  context.setTotalMoneyWallet(total);
  context.setActualMoneyWallet(total);

  context.setActualBills(JSON.parse(JSON.stringify(totalBilletes))); //copia para usar en la UI
  context.setActualCoins(JSON.parse(JSON.stringify(totalCoins))); //copia para usar en la UI

  /////// SAVINGS

  context.setInitialBillsMoneySavings(totalBilletesSavings); //El ultimo estado recuperado de la BD
  context.setActualBillsMoneySavings(totalBilletesSavings); //Sujeto a cambios por la UI

  context.setInitialCoinsMoneySavings(totalCoinsSavings); //El ultimo estado recuperado de la BD
  context.setActualCoinsMoneySavings(totalCoinsSavings); //Sujeto a cambios por la UI
  context.setTotalMoneySavings(totalSavings);
  context.setActualMoneySavings(totalSavings);

  context.setActualBillsSavings(
    JSON.parse(JSON.stringify(totalBilletesSavings)),
  ); //copia para usar en la UI
  context.setActualCoinsSavings(JSON.parse(JSON.stringify(totalCoinsSavings))); //copia para usar en la UI
  console.log("Done getting Money");
}

export default getMoney;
