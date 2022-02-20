import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {deleteMoneyWallet, getDineroWallet} from '../../../dataAccess/Wallet';
import {AddRemoveContext} from '../../AddRemove/AddRemoveContext';
import {SCREEN_NAME} from '../../../constants';
import {ManualPaymentContext} from '../../AddRemove/ManualPaymentContext';
import BuyBaseScreen from "../BuyBaseScreen/BuyBaseScreen";

const WalletBuy = () => {

  const navigation = useNavigation();

  const {
    setTotalMoneyWallet,
    totalMoneyWallet,
    setInitialCoinsMoneyWallet,
    setInitialBillsMoneyWallet,
    initialCoinsMoneyWallet,
    initialBillsMoneyWallet,
  } = useContext(AddRemoveContext);

  const { setTotalPaymentWallet } = useContext(ManualPaymentContext);

  const handleManualPay = (amount) => {
    setTotalPaymentWallet(amount);
    navigation.navigate(SCREEN_NAME.WALLET_MANUAL_PAYMENT);
  };

  return (
      <BuyBaseScreen
          setTotalMoneyWallet={setTotalMoneyWallet}
          totalMoneyWallet={totalMoneyWallet}
          setInitialCoinsMoneyWallet={setInitialCoinsMoneyWallet}
          setInitialBillsMoneyWallet={setInitialBillsMoneyWallet}
          initialCoinsMoneyWallet={initialCoinsMoneyWallet}
          initialBillsMoneyWallet={initialBillsMoneyWallet}
          getDineroWallet={getDineroWallet}
          deleteMoneyWallet={deleteMoneyWallet}
          handleManualPay={handleManualPay}
      />
  );
};

export default WalletBuy;
