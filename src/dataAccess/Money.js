import {executeSelect} from '../db/queries';

let billsCache = [];
let coinsCache = [];


async function innerGetMoney(isCoin = 0) {
    // console.log(`innerGetMoney -> isCoin = ${isCoin}`)
    let money = [];
    try {
        const result = await executeSelect(
            `SELECT *
             FROM Money
             WHERE isCoins = ?
             ORDER BY amount DESC, id DESC`,
        [isCoin]);

        //console.log(`innerGetMoney -> result = ${result}`)

        for (let i = 0; i < result.length; i++) {
            let item = result[i];
            const {id, amount, image, isCoins: isCoin} = item;

            // console.log(`innerGetMoney -> item = ${JSON.stringify(item)}`)

            money.push({
                id,
                amount,
                image,
                isCoins: !!isCoin,
                quantity: 0,
            });
        }
    } catch (err) {
        console.log('Error: ', err);
    }
    // console.log(`innerGetMoney done! -> isCoin = ${isCoin}`)
    return money;
}

export const getBills = async () => {
    if (billsCache.length > 0) return billsCache;

    let money = await innerGetMoney(0);
    billsCache = money;
    return money;
};

export const getCoins = async () => {
    if (coinsCache.length > 0) return coinsCache;

    let money = await innerGetMoney(1);
    coinsCache = money;
    return money;
};
