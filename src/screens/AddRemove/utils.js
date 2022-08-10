import {
  deleteMoneyWallet,
  insertMoneyToWallet,
} from '../../dataAccess/Wallet';

import {
  deleteMoneySaving,
  insertMoneyToSaving,
} from '../../dataAccess/Savings';

export function calcularEntraSale(subMoney, addMoney, initialList, novedades) {
  let moneyLength = novedades.length;

  for (let i = 0; moneyLength > i; i++) {
    let initialValue = initialList[i].quantity;
    let actualValue = novedades[i].quantity;

    if (initialValue > actualValue) {
      subMoney.push({
        money_id: novedades[i].id,
        quantity: initialValue - actualValue,
      });
    }
    if (actualValue > initialValue) {
      addMoney.push({
        money_id: novedades[i].id,
        quantity: actualValue - initialValue,
      });
    }
  }
}

export async function innerSaveAddRemove(
  initialCoinsMoneyWallet,
  coins,
  initialBillsMoneyWallet,
  bills,
) {
  let start = new Date();
  let addMoney = [];
  let subMoney = [];

  calcularEntraSale(subMoney, addMoney, initialCoinsMoneyWallet, coins);
  calcularEntraSale(subMoney, addMoney, initialBillsMoneyWallet, bills);

  if (addMoney.length) {
    for (let property in addMoney) {
      const { money_id, quantity } = addMoney[property];
      await insertMoneyToWallet(1, money_id, quantity);
    }
  }

  if (subMoney.length) {
    for (let property in subMoney) {
      const { money_id, quantity } = subMoney[property];
      await deleteMoneyWallet(1, money_id, quantity);
    }
  }
  let end = new Date();
  const diff = end - start;
  console.log(`innerSaveAddRemove took ${diff} ms`);
}
export async function innerSaveAddRemoveSavings(
  initialCoinsMoneyWallet,
  coins,
  initialBillsMoneyWallet,
  bills,
) {
  let addMoney = [];
  let subMoney = [];

  calcularEntraSale(subMoney, addMoney, initialCoinsMoneyWallet, coins);
  calcularEntraSale(subMoney, addMoney, initialBillsMoneyWallet, bills);

  if (addMoney.length) {
    for (let property in addMoney) {
      const { money_id, quantity } = addMoney[property];
      await insertMoneyToSaving(1, money_id, quantity);
    }
  }

  if (subMoney.length) {
    for (let property in subMoney) {
      const { money_id, quantity } = subMoney[property];
      await deleteMoneySaving(1, money_id, quantity);
    }
  }
}

export function calcularEntraSaleManualPayment(
  subMoney,
  initialList,
  novedades,
) {
  let initial = initialList.filter((elem) => elem.quantity > 0);
  let moneyLength = novedades.length;

  for (let i = 0; moneyLength > i; i++) {
    let initialValue = initial[i].quantity;
    let actualValue = novedades[i].quantity;

    if (initialValue > actualValue) {
      subMoney.push({
        money_id: novedades[i].id,
        quantity: initialValue - actualValue,
      });
    }
  }
}

export async function innerSaveManualPayment(
  initialCoinsMoneyWallet,
  coins,
  initialBillsMoneyWallet,
  bills,
) {
  let subMoney = [];

  calcularEntraSaleManualPayment(subMoney, initialCoinsMoneyWallet, coins);
  calcularEntraSaleManualPayment(subMoney, initialBillsMoneyWallet, bills);

  if (subMoney.length) {
    for (let property in subMoney) {
      const { money_id, quantity } = subMoney[property];
      await deleteMoneyWallet(1, money_id, quantity);
    }
  }
}

export async function innerSaveManualPaymentSavings(
  initialCoinsMoneySavings,
  coins,
  initialBillsMoneySavings,
  bills,
) {
  let subMoney = [];

  calcularEntraSaleManualPayment(subMoney, initialCoinsMoneySavings, coins);
  calcularEntraSaleManualPayment(subMoney, initialBillsMoneySavings, bills);

  if (subMoney.length) {
    for (let elem of subMoney) {
      const { money_id, quantity } = elem;
      await deleteMoneySaving(1, money_id, quantity);
    }
  }
}
