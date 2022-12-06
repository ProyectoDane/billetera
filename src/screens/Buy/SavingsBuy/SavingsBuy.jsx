import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';

import {ManualPaymentContext} from '../../AddRemove/ManualPaymentContext';
import {AddRemoveContext} from '../../AddRemove/AddRemoveContext';
import {
  deleteMoneySaving,
  getDineroSaving,
} from '../../../dataAccess/Savings';
import {SCREEN_NAME} from '../../../constants';
import BuyBaseScreen from "../BuyBaseScreen/BuyBaseScreen";

const SavingsBuy = () => {
  const navigation = useNavigation();

  const {
    setTotalMoneySavings,
    totalMoneySavings,
    setActualMoneySavings,
    setInitialCoinsMoneySavings,
    setInitialBillsMoneySavings,
    initialCoinsMoneySavings,
    initialBillsMoneySavings,
  } = useContext(AddRemoveContext);

  const { setTotalPaymentSavings } = useContext(ManualPaymentContext);

  const handleManualPay = (amount) => {
    setTotalPaymentSavings(amount);
    navigation.navigate(SCREEN_NAME.SAVINGS_MANUAL_PAYMENT);
  };

  return (
      <BuyBaseScreen
          setActualTotal={setActualMoneySavings}
          setTotalMoneyWallet={setTotalMoneySavings}          
          totalMoneyWallet={totalMoneySavings}
          setInitialCoinsMoneyWallet={setInitialCoinsMoneySavings}
          setInitialBillsMoneyWallet={setInitialBillsMoneySavings}
          initialCoinsMoneyWallet={initialCoinsMoneySavings}
          initialBillsMoneyWallet={initialBillsMoneySavings}
          getDineroWallet={getDineroSaving}
          deleteMoneyWallet={deleteMoneySaving}
          handleManualPay={handleManualPay}
      />
  );
};

export default SavingsBuy;
