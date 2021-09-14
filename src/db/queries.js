import * as SQLite from 'expo-sqlite';
import {
  queryCreateTables,
  queryInsertMoney,
  queryInsertUser
} from '../constants/bdStructure';

export const db = SQLite.openDatabase('db.DaneWallet');

export const executeQuery = async (querys) =>
  new Promise((resolve, reject) => {
    querys.length > 0
      ? db.transaction((tx) => {
          tx.executeSql(
            querys[0],
            [],
            () => {
              querys.shift();
              resolve(executeQuery(querys));
            },
            (_, err) => {
              reject(err);
              return false;
            }
          );
        })
      : resolve('');
  });

export const executeSelect = async (querys)=>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        querys,
        [],
        (_, { rows }) => {
          resolve(rows);
        },
        (_, err) => {
          console.log('ERROR', err);
          reject(err);

          return false;
        }
      );
    });
  });

export const initialization = async () => {
  try {
    await executeQuery(queryCreateTables);
    await executeQuery(queryInsertMoney);
    await executeQuery(queryInsertUser);
  } catch (err) {
    console.log('Error: ', err);
  }
};