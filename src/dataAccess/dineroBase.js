import {executeQuery3, executeSelect, executeSelectForSingle} from '../db/queries';

export const getDinero = async (table, money_id = 1) => {
    let money = [];

    let query = `SELECT *
                 FROM ${table} AS w,
                      Money  AS m
                 WHERE w.moneyId = m.id
                   AND w.userId = ?`;

    try {
        let result = await executeSelect(query, [money_id]);

        if (result.length === 0) {
            return [];
        }

        for (let i = 0; i < result.length; i++) {
            // console.log(`*** getDineroSaving -> result[i] = ${JSON.stringify(result[i])}`);
            money.push(result[i]);
        }

        return money;
    } catch (err) {
        console.log('Error: ', err);
    }
};

export const insertDinero = async ( table,   user_id = 1,    money_id = 2,    quantity = 1) => {
    // console.log(`insertMoneyToSaving -> user_id = ${user_id}, money_id = ${money_id}, quantity = ${quantity}`);
    try {

        let queryParams = [user_id, money_id];

        const queryExists = `SELECT exists(SELECT 1 FROM ${table} WHERE userId = ? AND moneyId = ?) as ret`;

        let existsResult = (await executeSelectForSingle(queryExists, queryParams)).ret;

        // console.log(`*** insertMoneyToSaving executeSelectForSingle -> existsResult = ${JSON.stringify(existsResult, null, 2)}`);

        if (existsResult) {
            // UPDATE
            let query = `UPDATE ${table}
                         SET quantity = quantity + ?
                         WHERE userId = ?
                           AND moneyId = ?`;
            // console.log(`*** EXISTE! insertMoneyToSaving -> query UPDATE = ${query}`);
            return await executeQuery3(query, [quantity, user_id, money_id]);
        } else {
            let query = `INSERT INTO ${table} (userId, moneyId, quantity)
                         VALUES (${user_id}, ${money_id}, ${quantity})`;
            // console.log(`*** NO EXISTE! insertMoneyToSaving -> query INSERT = ${query}`);
            return await executeQuery3(query, []);
        }
    } catch (err) {
        console.log('Error insertMoneyToSaving: ', err);
    }
};

export const deleteDinero = async (table,    user_id = 1,    money_id = 2,     quantity = 1) => {
    try {
        let queryExists = `SELECT *
                           FROM ${table}
                           WHERE userId = ?
                             AND moneyId = ?`;

        let queryParams = [user_id, money_id];

        let moneyRecord = await executeSelectForSingle(queryExists, queryParams);

        // console.log(`*** deleteMoneySaving -> moneyRecord = ${moneyRecord}`);
        // console.log(`*** deleteMoneySaving -> moneyRecord = ${JSON.stringify(moneyRecord, null, 2)}`);

        if (moneyRecord && moneyRecord.quantity === quantity) {
            // UPDATE
            // console.log(`*** EXISTE! deleteMoneySaving y coincide el quantity => DELETE = ${moneyRecord}`);
            let query = `DELETE
                         FROM ${table}
                         WHERE userId = ?
                           AND moneyId = ?`;
            return await executeQuery3(query, [user_id, money_id]);
        } else {
            // console.log(`*** NO EXISTE! deleteMoneySaving y NO coincide el quantity => UPDATE = ${moneyRecord}`);
            let query = `UPDATE ${table}
                         SET quantity = quantity - ?
                         WHERE userId = ?
                           AND moneyId = ?`;
            // console.log(`*** deleteMoneySaving -> AFTER UPDATE: insertMoney = ${JSON.stringify(insertMoney, null, 2)}`);
            return await executeQuery3(query, [quantity, user_id, money_id]);
        }
    } catch (err) {
        console.log('Error: ', err);
    }
};


