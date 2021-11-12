// import { getPendingResultAsync } from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
import {
  queryCreateTables,
  queryInsertMoney,
  queryInsertUser
} from '../constants/bdStructure';

export const db = SQLite.openDatabase('db.DaneWallet');

export const executeQuery2 = async (query, params) =>
  new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            query,
            params,
            (tx, results) => resolve(results),
            (_, err) => {
              reject(err);
              return false;
            }
          );
        })
  });

export const insertQuery = async(query, params) => {
        return db.transaction((tx) => {
          return tx.executeSql(
            query,
            params,
            (tx,results) => {
              if (results.rowsAffected > 0) {
                console.log('Data Inserted Successfully....');
              } else console.log('Failed....');

              return results
            }
          );
        })
  };


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