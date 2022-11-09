export const queryCreateTables = [
  'CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, photo TEXT, surveyDone INTEGER)',
  'CREATE TABLE IF NOT EXISTS Money (id INTEGER PRIMARY KEY AUTOINCREMENT, image TEXT, amount REAL, isCoins INTEGER)',
  'CREATE TABLE IF NOT EXISTS Wish (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, value INTEGER, icon TEXT, done INTEGER, userId INTEGER REFERENCES User(id))',
  'CREATE TABLE IF NOT EXISTS Wallet (id INTEGER PRIMARY KEY AUTOINCREMENT, quantity INTEGER, moneyId INTEGER REFERENCES Money(id), userId INTEGER REFERENCES User(id))',
  'CREATE TABLE IF NOT EXISTS Saving (id INTEGER PRIMARY KEY AUTOINCREMENT, quantity INTEGER, moneyId INTEGER REFERENCES Money(id), userId INTEGER REFERENCES User(id))',
];

export const queryInsertMoney = [
  'INSERT INTO Money (image, amount, isCoins) SELECT "10BelgranoNuevo.png", 10, 0 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "10BelgranoNuevo.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "10BelgranoViejo.png", 10, 0 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "10BelgranoViejo.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "20Guanaco.png", 20, 0 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "20Guanaco.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "20Rosas.png", 20, 0 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "20Rosas.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "50Condor.png", 50, 0 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "50Condor.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "50Malvinas.png", 50, 0 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "50Malvinas.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "50Sarmiento.png", 50, 0 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "50Sarmiento.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "100Eva.png", 100, 0 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "100Eva.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "100RocaV1.png", 100, 0 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "100RocaV1.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "100Taruca.png", 100, 0 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "100Taruca.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "200.png", 200, 0 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "200.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "500Yaguarete.png", 500, 0 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "500Yaguarete.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "1000Hornero.png", 1000, 0 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "1000Hornero.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "1Jacaranda.png", 1, 1 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "1Jacaranda.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "1Sol.png", 1, 1 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "1Sol.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "2Independencia.png", 2, 1 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "2Independencia.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "2PaloBorracho.png", 2, 1 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "2PaloBorracho.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "2Sol.png", 2, 1 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "2Sol.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "5Arrayan.png", 5, 1 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "5Arrayan.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "5CentavosBronce.png", 0.05, 1 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "5CentavosBronce.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "5CentavosPlata.png", 0.05, 1 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "5CentavosPlata.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "10Calden.png", 10, 1 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "10Calden.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "10Centavos.png", 0.10, 1 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "10Centavos.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "25CentavosDorada.png", 0.25, 1 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "25CentavosDorada.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "25CentavosPlateada.png", 0.25, 1 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "25CentavosPlateada.png");',
  'INSERT INTO Money (image, amount, isCoins) SELECT "50Centavos.png", 0.5, 1 WHERE NOT EXISTS(SELECT 1 FROM Money WHERE image = "50Centavos.png");',
];

export const queryInsertUser = [
  'INSERT INTO User (name, photo, surveyDone) SELECT "", "", 0 WHERE NOT EXISTS(SELECT 1 FROM User WHERE id = 1);',
  'INSERT INTO User (name, photo, surveyDone) SELECT "", "", 0 WHERE NOT EXISTS(SELECT 1 FROM User WHERE id = 2);',
  'INSERT INTO User (name, photo, surveyDone) SELECT "", "", 0 WHERE NOT EXISTS(SELECT 1 FROM User WHERE id = 3);',
  'INSERT INTO User (name, photo, surveyDone) SELECT "", "", 0 WHERE NOT EXISTS(SELECT 1 FROM User WHERE id = 4);',
  'INSERT INTO User (name, photo, surveyDone) SELECT "", "", 0 WHERE NOT EXISTS(SELECT 1 FROM User WHERE id = 5);',
];
