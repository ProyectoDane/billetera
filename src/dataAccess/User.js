import { executeSelect, executeQuery, executeQuery2 } from '../db/queries';
import { User } from '../models/User';

export const getUser = async () => {
  let user = new User();
  try {
    const result = await executeSelect(`SELECT * FROM User WHERE id = ${1}`);

    if (result._array && result._array.length > 0) {
      user = result._array[0];
    }
  } catch (err) {
    console.log('Error: ', err);
  }

  return user;
};

export const surveyDone = async (id = 1) => {
  try {
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
