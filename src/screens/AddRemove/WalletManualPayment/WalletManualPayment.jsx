import React, { useContext, useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { formatNum } from '../../../utils/functions/formatNum';
import { AddRemoveContext } from '../AddRemoveContext';

const WalletManualPayment = ({ route }) => {
  const { purchaseValue } = route.params;
  const [total, setTotal] = useState(purchaseValue);
  const [coins, setCoins] = useState([]);
  const [bills, setBills] = useState([]);
  const { actualBillsMoneyWallet, actualCoinsMoneyWallet } =
    useContext(AddRemoveContext);

  useEffect(() => {
    setCoins(JSON.parse(JSON.stringify(actualCoinsMoneyWallet)));
    setBills(JSON.parse(JSON.stringify(actualBillsMoneyWallet)));
  }, []);

  console.log('actualBillsMoneyWallet', bills);
  console.log('actualCoinsMoneyWallet', coins);
  return (
    <View>
      <Text>PAGO MANUAL</Text>
      <Text>EL VALOR DE TU COMPRA ES DE: {formatNum(total)}</Text>
    </View>
  );
};

export default WalletManualPayment;
