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
    userId,
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
      await insertMoneyToWallet(userId, money_id, quantity);
    }
  }

  if (subMoney.length) {
    for (let property in subMoney) {
      const { money_id, quantity } = subMoney[property];
      await deleteMoneyWallet(userId, money_id, quantity);
    }
  }
  let end = new Date();
  const diff = end - start;
  console.log(`innerSaveAddRemove took ${diff} ms for userId ${userId}`);
}
export async function innerSaveAddRemoveSavings(
    userId,
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
      await insertMoneyToSaving(userId, money_id, quantity);
    }
  }

  if (subMoney.length) {
    for (let property in subMoney) {
      const { money_id, quantity } = subMoney[property];
      await deleteMoneySaving(userId, money_id, quantity);
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

export function calcularEntraSaleManualPaymentV2(
  subMoney,
  initial,
  novedades,
) {
  for (let i = 0; novedades.length > i; i++) {    
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
    userId,
  initialCoinsMoneyWallet,
  coins,
  initialBillsMoneyWallet,
  bills,
) {
  let subMoney = [];

  calcularEntraSaleManualPaymentV2(subMoney, initialCoinsMoneyWallet, coins);
  calcularEntraSaleManualPaymentV2(subMoney, initialBillsMoneyWallet, bills);

  if (subMoney.length) {
    for (let property in subMoney) {
      const { money_id, quantity } = subMoney[property];
      await deleteMoneyWallet(userId, money_id, quantity);
    }
  }
}

export async function innerSaveManualPaymentSavings(
    userId,
  initialCoinsMoneySavings,
  coins,
  initialBillsMoneySavings,
  bills,
) {
  let subMoney = [];

  calcularEntraSaleManualPaymentV2(subMoney, initialCoinsMoneySavings, coins);
  calcularEntraSaleManualPaymentV2(subMoney, initialBillsMoneySavings, bills);
  
  for (let elem of subMoney) {
    const { money_id, quantity } = elem;
    await deleteMoneySaving(userId, money_id, quantity);
  }
}
