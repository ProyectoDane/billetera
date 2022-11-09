import { executeSelect, executeQuery, executeQuery2 } from '../db/queries';
import { User } from '../models/User';

export const getUser = async (userId) => {
  let user = new User();
  try {
    const result = await executeSelect(`SELECT * FROM User WHERE id = ${userId}`);

    if (result._array && result._array.length > 0) {
      user = result._array[0];
    }
  } catch (err) {
    console.log('Error: ', err);
  }

  return user;
};

export const getAllUsers = async () => {

  const ret = new Array();
  try {
    const result = await executeSelect(`SELECT * FROM User ORDER BY id`);

    if (result._array && result._array.length > 0) {
      for (let i=0; i< result._array.length; i++){
        let user = new User();
        user = result._array[i];
        ret.push(user);
      }
    }
  } catch (err) {
    console.log('Error: ', err);
  }
  console.log(`Loaded ${ret.length} users`);
  return ret;
};

export const surveyDone = async (id = 1) => {
  try {
    console.log(`Checking if survey is done for user ${id}`);
    const result = await executeSelect(`SELECT * FROM User WHERE id = ${id}`);
    return !!result._array[0].surveyDone;
  } catch (err) {
    console.log('Error: ', err);
  }
};

export const updateSurveyDone = async (id = 1, change = true) => {
  try {
    await executeQuery2(
      `UPDATE User SET surveyDone = ${change ? 1 : 0} WHERE id = ${id}`,
    );
  } catch (err) {
    console.log('Error: ', err);
  }
};

export const updatePhoto = async (user) => {
  try {
    void (await executeQuery([
      `UPDATE User SET photo = '${user.photo}' WHERE id = ${user.id}`,
    ]));
  } catch (err) {
    console.log('Error: ', err);
  }
};

export const updateName = async (user) => {
  try {
    void (await executeQuery([
      `UPDATE User SET name = '${user.name}' WHERE id = ${user.id};`,
    ]));
  } catch (err) {
    console.log('Error: ', err);
  }
};
