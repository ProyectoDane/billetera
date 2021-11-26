import { executeSelect, executeQuery2 } from '../db/queries';

export const getTotalSaving = async (userId = 1) => {
  let money = [];
  try {
    const result = await executeSelect(
      `SELECT * FROM Saving WHERE userId = ${userId}`,
    );

    if (result.length === 0) {
      return 0;
    }

    for (let i = 0; i < result.length; i++) {
      money.push(result.item(i));
    }

    return money;
  } catch (err) {
    console.log('Error: ', err);
  }
};

export const getDineroSaving = async (money_id = 1) => {
  let money = [];

  let query = `SELECT * FROM Saving AS w , Money AS m WHERE w.moneyId = m.id AND w.userId =?`;

  try {
    let result = await executeQuery2(query, [money_id]);

    if (result.rows.length === 0) {
      return 0;
    }

    for (let i = 0; i < result.rows.length; i++) {
      money.push(result.rows.item(i));
    }

    return money;
  } catch (err) {
    console.log('Error: ', err);
  }
};

export const insertMoneyToSaving = async (
  user_id = 1,
  //TODO: pasarlo por UI
  money_id = 2,
  quantity = 1,
) => {
  try {
    let queryExists = `SELECT * FROM Saving WHERE userId =? AND moneyId =?`;

    let queryParams = [user_id, money_id];

    let existsResult = await executeQuery2(queryExists, queryParams);

    if (existsResult.rows.length) {
      // UPDATE
      let query = `UPDATE Saving SET quantity = quantity + ? WHERE userId =? AND moneyId =?`;
      let insertMoney = await executeQuery2(query, [
        quantity,
        user_id,
        money_id,
      ]);

      return insertMoney;
    } else {
      let query = `INSERT INTO Saving (userId, moneyId, quantity) VALUES (${user_id},${money_id},${quantity})`;
      let insertMoney = await executeQuery2(query);

      return insertMoney;
    }
  } catch (err) {
    console.log('Error: ', err);
  }
};

export const deleteMoneySaving = async (
  user_id = 1,
  //TODO: pasarlo por UI
  money_id = 2,
  quantity = 1,
) => {
  try {
    let queryExists = `SELECT * FROM Saving WHERE userId =? AND moneyId =?`;

    let queryParams = [user_id, money_id];

    let existsResult = await executeQuery2(queryExists, queryParams);

    if (existsResult.rows._array[0].quantity === quantity) {
      // UPDATE
      let query = `DELETE FROM Saving WHERE userId =? AND moneyId =?`;
      let insertMoney = await executeQuery2(query, [user_id, money_id]);

      return insertMoney;
    } else {
      let query = `UPDATE Saving SET quantity = quantity - ? WHERE userId =? AND moneyId =?`;
      let insertMoney = await executeQuery2(query, [
        quantity,
        user_id,
        money_id,
      ]);

      return insertMoney;
    }
  } catch (err) {
    console.log('Error: ', err);
  }
};
