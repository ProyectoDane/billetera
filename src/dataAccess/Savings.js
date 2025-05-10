import {deleteDinero, getDinero, insertDinero} from "./dineroBase";

const TABLE_NAME = 'Saving';

export const getDineroSaving = async (money_id = 1) => {
    return await getDinero(TABLE_NAME, money_id);
};

export const insertMoneyToSaving = async (    user_id = 1,    money_id = 2,    quantity = 1) => {
    return await insertDinero(TABLE_NAME, user_id, money_id, quantity);
};

export const deleteMoneySaving = async (    user_id = 1,    money_id = 2,     quantity = 1) => {
    return await deleteDinero(TABLE_NAME, user_id, money_id, quantity);
};
