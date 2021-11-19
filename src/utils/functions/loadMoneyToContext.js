import {getBills, getCoins} from "../../dataAccess/Money";
import {getDineroWallet, getTotalWallet} from "../../dataAccess/Wallet";

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

/**
 * Carga el dinero desde la BD y lo pone en el contexto
 * @param context
 * @returns {Promise<void>}
 */
async function getMoney(context) {
    let billetes = await getBills();
    let monedas = await getCoins();

    const { money, total } = await getTotal();

    const idMoney = money.map(({ moneyId }) => moneyId);

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

    context.setInitialBillsMoneyWallet(totalBilletes); //El ultimo estado recuperado de la BD
    context.setActualBillsMoneyWallet(totalBilletes); //Sujeto a cambios por la UI

    context.setInitialCoinsMoneyWallet(totalCoins);
    context.setActualCoinsMoneyWallet(totalCoins);
    context.setTotalMoneyWallet(total);
    context.setActualMoneyWallet(total);

    context.setActualBills(JSON.parse(JSON.stringify(totalBilletes)));
    context.setActualCoins(JSON.parse(JSON.stringify(totalCoins)));
}

export default getMoney;