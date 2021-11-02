import { useState, useEffect } from 'react';
import { mySavings, wallet } from '../../../mockData/wallet';

const useCalcTotal = () => {
  const [amountWallet, setAmountWallet] = useState();
  const [amountSavings, setAmountSavings] = useState();

  useEffect(() => {
    setAmountWallet(
      wallet
        .map((item) => item.value * item.quantity)
        .reduce((a, b) => a + b, 0),
    );
    setAmountSavings(
      mySavings
        .map((item) => item.value * item.quantity)
        .reduce((a, b) => a + b, 0),
    );
  }, []);

  return { amountWallet, amountSavings };
};

export default useCalcTotal;
