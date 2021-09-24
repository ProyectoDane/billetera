import { executeSelect, executeQuery } from '../db/queries';
// import { Wish } from '../models/Wish';

export const getAllWish = async (done, userId = 1) => {
  let wishes = [];
  try {
    const result = await executeSelect(
      `SELECT * FROM wish WHERE userId = ${userId} and done = ${
        done ? '1' : '0'
      }`,
    );

    if (result._array && result._array.length > 0) {
      wishes = result._array;
    }
  } catch (err) {
    console.log('Error: ', err);
  }

  return wishes;
};

export const getWishById = async (wishId) => {
  let wish = null;
  try {
    const result = await executeSelect(
      `SELECT * FROM wish WHERE id = ${wishId} `,
    );

    if (result._array && result._array.length > 0) {
      wish = result._array[0];
    }
  } catch (err) {
    console.log('Error: ', err);
  }

  return wish;
};

export const insertWish = async (wish) => {
  try {
    void (await executeQuery([
      `INSERT INTO wish (name, value, icon, done, userId) VALUES ('${
        wish.name
      }', ${wish.value}, '${wish.icon}', ${wish.done ? 1 : 0}, ${
        wish.userId
      });`,
    ]));
  } catch (err) {
    console.log('Error: ', err);
  }
};

export const fulfillWish = async (wishId) => {
  try {
    void (await executeQuery([
      `UPDATE wish SET done = 1 WHERE id = ${wishId}`,
    ]));
  } catch (err) {
    console.log('Error: ', err);
  }
};

export const updateWish = async (wish) => {
  try {
    void (await executeQuery([
      `UPDATE wish SET name = '${wish.name}', value = ${wish.value}, icon='${wish.icon}' WHERE id = ${wish.id}`,
    ]));
  } catch (err) {
    console.log('Error: ', err);
  }
};

export const deleteWish = async (wishId) => {
  try {
    void (await executeQuery([`DELETE FROM wish WHERE id = ${wishId}`]));
  } catch (err) {
    console.log('Error: ', err);
  }
};

////////// Ejemplo de uso //////////

// /// Insert wish
//   await insertWish(new Wish('juguete', 12, 'camion')); // por defecto le pone el user 1 y que no esta cumplido

// /// Get por id
//   const wish = await getWishById(1);
//   console.log('wish: ', wish);

// /// Update
//   const wish = await getWishById(1);
//   console.log('wish: ', wish);
//   wish.icon = 'auto';
//   wish.name = 'deseo 1 modificado';
//   wish.value = 1;
//   void (await updateWish(wish));
//   const wish2 = await getWishById(1);
//   console.log('wish despues de modificar: ', wish2);

// // Get todos los wish cumplidos
//   const wishes = await getAllWish(true) // el usuario por defecto es el 1

// // Marcar un deseo como cumplido
//   void await fulfillWish (1);
//   const wish = await getWishById(1);
//   console.log('wish: ', wish);

// // Borrar un deseo
//   void (await deletetWish(1));
//   const wish = await getWishById(1);
//   console.log('despues de eliminar debería ser null: ', wish);
