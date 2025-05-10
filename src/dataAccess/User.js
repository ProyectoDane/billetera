import {executeQuery3, executeSelect} from '../db/queries';
import {User} from '../models/User';

export const getUser = async (userId) => {
  let user = new User();
  try {
    const result = await executeSelect(`SELECT * FROM User WHERE id = ?`,[userId]);

    // console.log(`getUser result: ${JSON.stringify(result, null, 2)}`);

    if (result.length > 0) {
      user = result[0];
    }
  } catch (err) {
    console.log('Error: ', err);
  }
  console.log(`Loaded user ${user.name}`);
  return user;
};

export const getAllUsers = async () => {

  const ret = [];
  try {
    const result = await executeSelect(`SELECT * FROM User ORDER BY id`,[]);

    if (result.length > 0) {
      for (let i=0; i< result.length; i++){
        let user = new User();
        user = result[i];
        ret.push(user);
      }
    }
  } catch (err) {
    console.log('Error: ', err);
  }
  // console.log(`Loaded ${ret.length} users`);
  return ret;
};

export const surveyDone = async (id = 1) => {
  try {
    // console.log(`Checking if survey is done for user ${id}`);
    const result = await executeSelect(`SELECT * FROM User WHERE id = ?`, [id]);
    return !!result[0].surveyDone;
  } catch (err) {
    console.log('Error: ', err);
  }
};

export const tourDone = async (id = 1) => {
  try {
    // console.log(`Checking if tour is done for user ${id}`);
    const result = await executeSelect(`SELECT * FROM User WHERE id = ?`, [id]);
    return !!result[0].tourDone;
  } catch (err) {
    console.log('Error: ', err);
  }
};

export const updateSurveyDone = async (id = 1, change = true) => {
  try {
    await executeQuery3(
      `UPDATE User SET surveyDone = ${change ? 1 : 0} WHERE id = ?`, [id]);
  } catch (err) {
    console.log('Error: ', err);
  }
};
export const updateTourDone = async (id = 1, change = true) => {
  // console.log(`updateTourDone ${id} ${change}`);
  try {
    await executeQuery3(`UPDATE User SET tourDone = ${change ? 1 : 0} WHERE id = ?`, [id]);
  } catch (err) {
    console.log('Error: ', err);
  }
};

export const updatePhoto = async (user) => {
  try {
    await executeQuery3(`UPDATE User SET photo = ? WHERE id = ?`,    [user.photo, user.id]);
  } catch (err) {
    console.log('Error: ', err);
  }
};

export const updateName = async (user) => {
  try {
    await executeQuery3(`UPDATE User SET name = ? WHERE id = ?`,    [user.name, user.id]);
  } catch (err) {
    console.log('Error: ', err);
  }
};
