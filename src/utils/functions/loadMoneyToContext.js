import { getBills, getCoins } from '../../dataAccess/Money';
import { getDineroWallet, getTotalWallet } from '../../dataAccess/Wallet';
import { getDineroSaving, getTotalSaving } from '../../dataAccess/Savings';
import {getUser} from "../../dataAccess/User";

async function getTotal(userId) {
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

  let billetesSavings = billetes.map(({...el}) => el); // JSON.parse(JSON.stringify(billetes));
  let monedasSavings = monedas.map(({...el}) => el); // JSON.parse(JSON.stringify(monedas));

  const { moneyWallet, totalWallet } = await getTotal(user.id);
  const { moneySavings, totalSavings } = await getTotalSavings(user.id);

  const idMoney = moneyWallet.map(({ moneyId }) => moneyId);
  const idMoneySavings = moneySavings.map(({ moneyId }) => moneyId);

  let totalBilletesWallet = billetes.map((el) => {
    let indexMoney = idMoney.indexOf(el.id);
    let auxEl = {...el};

    if (indexMoney > -1) {
      auxEl.quantity = auxEl.quantity + moneyWallet[indexMoney].quantity;
    }
    return  auxEl;
  });

  let totalCoinsWallet = monedas.map((el) => {
    let indexMoney = idMoney.indexOf(el.id);
    let auxEl = {...el};
    if (indexMoney > -1) {
      auxEl.quantity = auxEl.quantity + moneyWallet[indexMoney].quantity;
    }
    return auxEl;
  });

  let totalBilletesSavings = billetesSavings.map((el) => {
    let indexMoney = idMoneySavings.indexOf(el.id);
    let auxEl = {...el};
    if (indexMoney > -1) {
      auxEl.quantity = auxEl.quantity + moneySavings[indexMoney].quantity;
    }

    return auxEl;
  });

  let totalCoinsSavings = monedasSavings.map((el) => {
    let indexMoney = idMoneySavings.indexOf(el.id);
    let auxEl = {...el};
    if (indexMoney > -1) {
      auxEl.quantity = auxEl.quantity + moneySavings[indexMoney].quantity;
    }

    return auxEl;
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

  context.setActualBills(cloneFlatArray(totalBilletesWallet)); //copia para usar en la UI
  context.setActualCoins(cloneFlatArray(totalCoinsWallet)); //copia para usar en la UI
  //
  // context.setActualBills(JSON.parse(JSON.stringify(totalBilletesWallet))); //copia para usar en la UI
  // context.setActualCoins(JSON.parse(JSON.stringify(totalCoinsWallet))); //copia para usar en la UI

  /////// SAVINGS

  context.setInitialBillsMoneySavings(totalBilletesSavings); //El ultimo estado recuperado de la BD
  context.setActualBillsMoneySavings(totalBilletesSavings); //Sujeto a cambios por la UI

  context.setInitialCoinsMoneySavings(totalCoinsSavings); //El ultimo estado recuperado de la BD
  context.setActualCoinsMoneySavings(totalCoinsSavings); //Sujeto a cambios por la UI
  context.setTotalMoneySavings(totalSavings);
  context.setActualMoneySavings(totalSavings);

  context.setActualBillsSavings(cloneFlatArray(totalBilletesSavings)); //copia para usar en la UI
  context.setActualCoinsSavings(cloneFlatArray(totalCoinsSavings)); //copia para usar en la UI

  const end = new Date();
  const time = end - start;
  console.log(`getMoney took ${time} ms`);
}

function cloneFlatArray(array) {
  return array.map(({...el}) => el);
}

export default getMoney;
