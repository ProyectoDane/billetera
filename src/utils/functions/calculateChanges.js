const getQuantityString = (array) => {
  return array.reduce((accString, x) => {
    accString += x.quantity.toString();
    return accString;
  }, '');
};

export const calculateChanges = (initialBills, initialCoins, actualBills, actualCoins) => {
  const initialBillsQuantities = getQuantityString(initialBills);
  const initialCoinsQuantities = getQuantityString(initialCoins);
  const actualBillsQuantities = getQuantityString(actualBills);
  const actualCoinsQuantities = getQuantityString(actualCoins);
  return initialBillsQuantities !== actualBillsQuantities || initialCoinsQuantities !== actualCoinsQuantities;
};
