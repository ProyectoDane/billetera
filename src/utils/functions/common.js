export const totalize = (list) =>
  list.reduce((prevTotal, item) => {
    return prevTotal + item.amount * item.quantity;
  }, 0);

export const withQuantity = (list) => list.filter((item) => item.quantity > 0);
