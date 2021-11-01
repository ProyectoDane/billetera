import { executeSelect, executeQuery2 } from '../db/queries';

export const getTotalWallet = async (userId = 1) => {
  let money = [];
  try {
    const result = await executeSelect(
      `SELECT * FROM Wallet WHERE userId = ${userId}`,
    );

    if(result.length === 0){
        return 0
    }

    for(let i = 0; i < result.length; i++){
      money.push(result.item(i))
    }

  } catch (err) {
    console.log('Error: ', err);
  }

  return money;
};


export const getDineroWallet = async(user_id = 1) => {
    let query = `SELECT * FROM Wallet AS w , Money AS m WHERE w.moneyId = m.id AND w.userId =?`;

    let results = await executeQuery2(query, [user_id]);


    return results
}

export const insertMoneyToWallet = async (
    user_id = 1,
    //TODO: pasarlo por UI
    money_id = 2,
    quantity = 1
    ) => {

    try {
        let queryExists = `SELECT * FROM Wallet WHERE userId =? AND moneyId =?`;

        let queryParams = [user_id, money_id];

        let existsResult = await executeQuery2(queryExists, queryParams);


        if(existsResult.rows.length){
            // UPDATE
            let query = `UPDATE Wallet SET quantity = quantity + ? WHERE userId =? AND moneyId =?`;
            let insertMoney = await executeQuery2(query, [quantity, user_id, money_id]);


            return insertMoney;
        } else {
            let query = `INSERT INTO Wallet (userId, moneyId, quantity) VALUES (${user_id},${money_id},${quantity})`;
            let insertMoney = await executeQuery2(query);

            return insertMoney;
        }


    } catch (err) {
      console.log('Error: ', err);
    }
  
  };

  export const deleteMoneyWallet = async (
    user_id = 1,
    //TODO: pasarlo por UI
    money_id = 2,
    quantity = 1
    ) => {

    try {
        let queryExists = `SELECT * FROM Wallet WHERE userId =? AND moneyId =?`;

        let queryParams = [user_id, money_id];

        let existsResult = await executeQuery2(queryExists, queryParams);


        if(existsResult.rows.length === quantity){
            // UPDATE
            let query = `DELETE FROM Wallet WHERE userId =? AND moneyId =?`;
            let insertMoney = await executeQuery2(query, [user_id, money_id]);


            return insertMoney;
        } else {
            let query = `UPDATE Wallet SET quantity = quantity - ? WHERE userId =? AND moneyId =?`;
            let insertMoney = await executeQuery2(query, [quantity, user_id, money_id]);

            return insertMoney;
        }

    } catch (err) {
      console.log('Error: ', err);
    }
  
  };


export const getCoins = async () => {
    let coins = [];
    try {
      const result = await executeSelect(
        `SELECT * FROM Money WHERE isCoins = 1`,
      );
  
      for(let i = 0; i < result.length; i++){
        coins.push(result.item(i))
      }

    } catch (err) {
      console.log('Error: ', err);
    }
  
    return coins;
  };