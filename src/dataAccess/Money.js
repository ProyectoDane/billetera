import { executeSelect } from '../db/queries';

export const getBills = async () => {
  let bills = [];
  try {
    const result = await executeSelect(
      `SELECT * FROM Money WHERE isCoins = 0`,
    );

    for(let i = 0; i < result.length; i++){
      bills.push(result.item(i))
    }

  } catch (err) {
    console.log('Error: ', err);
  }

  return bills;
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