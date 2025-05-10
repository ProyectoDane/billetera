// import { getPendingResultAsync } from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
import {
  queryCreateTables,
  queryInsertMoney,
  queryInsertUser
} from '../constants/bdStructure';

// export const db = SQLite.openDatabaseSync('db.DaneWallet');
//const db = await SQLite.openDatabaseAsync('db.DaneWallet');
//const db = null; //await SQLite.openDatabaseAsync('db.DaneWallet');
let db = null;

/**
 * Usar para INSERT, UPDATE, DELETE
 * @param query
 * @param params
 * @returns {Promise<*>}
 */
export const executeQuery3 = async (query, params) => {
    // console.log('executeQuery3: ', query, "params:",  params);
    db.runAsync(query, params);
}


export const executeInitQuery = async (queries) => {
    if (db === null) { console.log('db is null'); }
    queries = queries || [];
    // console.log(`Executing init querys: ${queries.length}`);
    for (let i = 0; i < queries.length; i++) {
        //console.log(`Executing query: ${queries[i]}`);
        await db.execAsync(queries[i]);
    }
};

export const executeSelectForSingle = async (query, params)=>
    // console.log(`executeSelectForSingle: ${query}, ${params}`) ||
    db.getFirstAsync(query, params);


/**
 * Para SQL del tipo SELECT solamente...
 * @param query
 * @param params
 * @returns {Promise<*>}
 */
export const executeSelect = async (query, params)=>
    db.getAllAsync(query, params);

export const initialization = async () => {
    db = await SQLite.openDatabaseAsync('db.DaneWallet');
    global.db = db;
    // console.log('db: ', db);
  try {
    await executeInitQuery(queryCreateTables);
  } catch (err) {
    console.log('Error queryCreateTables: ', err);
  }
  try {
    await executeInitQuery(queryInsertMoney);
  } catch (err) {
    console.log('Error queryInsertMoney: ', err);
  }
  try {
    await executeInitQuery(queryInsertUser);
  } catch (err) {
    console.log('Error queryInsertUser: ', err);
  }
  console.log("db initialization done!");
};