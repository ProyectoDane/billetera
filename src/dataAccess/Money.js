import { executeSelect } from '../db/queries';

export const getBills = async () => {
  let bills = [];
  try {
    const result = await executeSelect(
      `SELECT * FROM Money WHERE isCoins = 0 ORDER BY amount DESC, id DESC`,
    );

    for(let i = 0; i < result.length; i++){
      let item = result.item(i)
      const {id, amount, image, isCoins : isCoin } = item;
      
      bills.push({
          id,
          amount,
          image,
          isCoins: !!isCoin,
          quantity: 0
        })
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
        `SELECT * FROM Money WHERE isCoins = 1 ORDER BY amount DESC, id DESC`,
      );
  
      for(let i = 0; i < result.length; i++){
        let item = result.item(i)
        const {id, amount, image, isCoins : isCoin } = item;
        
        coins.push({
            id,
            amount,
            image,
            isCoins: !!isCoin,
            quantity: 0
          })
      }

    } catch (err) {
      console.log('Error: ', err);
    }
  
    return coins;
  };