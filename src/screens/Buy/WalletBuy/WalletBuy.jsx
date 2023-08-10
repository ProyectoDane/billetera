import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {deleteMoneyWallet, getDineroWallet} from '../../../dataAccess/Wallet';
import {AddRemoveContext} from '../../AddRemove/AddRemoveContext';
import {SCREEN_NAME} from '../../../constants';
import {ManualPaymentContext} from '../../AddRemove/ManualPaymentContext';
import BuyBaseScreen from '../BuyBaseScreen/BuyBaseScreen';

const WalletBuy = () => {
  const navigation = useNavigation();

  const {
    setActualMoneyWallet,
    setTotalMoneyWallet,
    totalMoneyWallet,
    setInitialCoinsMoneyWallet,
    setInitialBillsMoneyWallet,
    initialCoinsMoneyWallet,
    initialBillsMoneyWallet,
  } = useContext(AddRemoveContext);

  const {setTotalPaymentWallet} = useContext(ManualPaymentContext);

  const handleManualPay = (amount) => {
    setTotalPaymentWallet(amount);
    navigation.navigate(SCREEN_NAME.WALLET_MANUAL_PAYMENT);
  };

  return (
    <BuyBaseScreen
      setActualTotal={setActualMoneyWallet}
      setInitialTotal={setTotalMoneyWallet}
      initialTotal={totalMoneyWallet}
      setInitialCoins={setInitialCoinsMoneyWallet}
      setInitialBills={setInitialBillsMoneyWallet}
      initialCoins={initialCoinsMoneyWallet}
      initialBills={initialBillsMoneyWallet}
      getDinero={getDineroWallet}
      deleteMoney={deleteMoneyWallet}
      handleManualPay={handleManualPay}
    />
  );
};

export default WalletBuy;
