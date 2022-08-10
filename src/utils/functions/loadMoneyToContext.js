import { getBills, getCoins } from '../../dataAccess/Money';
import { getDineroWallet, getTotalWallet } from '../../dataAccess/Wallet';
import { getDineroSaving, getTotalSaving } from '../../dataAccess/Savings';
import {getUser} from "../../dataAccess/User";

async function getTotal(userId) {
  // const wallet = await getTotalWallet();
  let totalWallet = 0;
  let moneyWallet = await getDineroWallet(userId);

  for (let property of moneyWallet) {
    const { amount, quantity } = property;
    totalWallet = totalWallet + amount * quantity;
  }

  return {
    moneyWallet,
    totalWallet
  };

}

async function getTotalSavings(userId) {
  // const savings = await getTotalSaving();
  let totalSavings = 0;
  let moneySavings = await getDineroSaving(userId);

  for (let property of moneySavings) {
    const { amount, quantity } = property;
    totalSavings = totalSavings + amount * quantity;
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
  const start = new Date();

  let user =  await getUser();
  let billetes = await getBills(); //Maestro de billetes
  let monedas = await getCoins(); //Maestro de monedas

  let billetesSavings = JSON.parse(JSON.stringify(billetes));
  let monedasSavings = JSON.parse(JSON.stringify(monedas));

  const { moneyWallet, totalWallet } = await getTotal(user.id);
  const { moneySavings, totalSavings } = await getTotalSavings(user.id);

  const idMoney = moneyWallet.map(({ moneyId }) => moneyId);
  const idMoneySavings = moneySavings.map(({ moneyId }) => moneyId);

  let totalBilletesWallet = billetes.map((el) => {
    let indexMoney = idMoney.indexOf(el.id);

    if (indexMoney > -1) {
      el.quantity = el.quantity + moneyWallet[indexMoney].quantity;
    }
    return el;
  });

  // console.log(`moneyWallet ${JSON.stringify(moneyWallet, "", 2)}`)
  // console.log(`totalBilletesWallet ${JSON.stringify(totalBilletesWallet, "", 2)}`)

  let totalCoinsWallet = monedas.map((el) => {
    let indexMoney = idMoney.indexOf(el.id);

    if (indexMoney > -1) {
      el.quantity = el.quantity + moneyWallet[indexMoney].quantity;
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

  context.setInitialBillsMoneyWallet(totalBilletesWallet); //El ultimo estado recuperado de la BD
  context.setActualBillsMoneyWallet(totalBilletesWallet); //Sujeto a cambios por la UI

  context.setInitialCoinsMoneyWallet(totalCoinsWallet); //El ultimo estado recuperado de la BD
  context.setActualCoinsMoneyWallet(totalCoinsWallet); //Sujeto a cambios por la UI
  context.setTotalMoneyWallet(totalWallet);
  context.setActualMoneyWallet(totalWallet);

  context.setActualBills(JSON.parse(JSON.stringify(totalBilletesWallet))); //copia para usar en la UI
  context.setActualCoins(JSON.parse(JSON.stringify(totalCoinsWallet))); //copia para usar en la UI

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

  const end = new Date();
  let time = end - start;
  console.log(`getMoney took ${time} ms`);
}

export default getMoney;
