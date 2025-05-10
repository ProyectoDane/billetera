import {deleteDinero, getDinero, insertDinero} from "./dineroBase";

const TABLE_NAME = 'Wallet';

export const getDineroWallet = async (money_id = 1) => {
  return getDinero(TABLE_NAME, money_id);
};

export const insertMoneyToWallet = async (    user_id = 1,    money_id = 2,    quantity = 1) => {
  return insertDinero(TABLE_NAME, user_id, money_id, quantity);
};

export const deleteMoneyWallet = async (    user_id = 1,    money_id = 2,     quantity = 1) => {
  return deleteDinero(TABLE_NAME, user_id, money_id, quantity);
};
