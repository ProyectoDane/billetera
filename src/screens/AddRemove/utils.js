import {deleteMoneyWallet, insertMoneyToWallet} from "../../dataAccess/Wallet";

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

export async function innerSaveAddRemove(initialCoinsMoneyWallet, coins, initialBillsMoneyWallet, bills) {
    let addMoney = [];
    let subMoney = [];

    calcularEntraSale(subMoney, addMoney, initialCoinsMoneyWallet, coins);
    calcularEntraSale(subMoney, addMoney, initialBillsMoneyWallet, bills);

    if (addMoney.length) {
        for (let property in addMoney) {
            const {money_id, quantity} = addMoney[property];
            await insertMoneyToWallet(1, money_id, quantity);
        }
    }

    if (subMoney.length) {
        for (let property in subMoney) {
            const {money_id, quantity} = subMoney[property];
            await deleteMoneyWallet(1, money_id, quantity);
        }
    }
}
