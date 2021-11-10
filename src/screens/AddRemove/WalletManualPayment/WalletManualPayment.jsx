import React from 'react';
import { Text, View } from 'react-native';
import { formatNum } from '../../../utils/functions/formatNum';

const WalletManualPayment = ({ route }) => {
  const { purchaseValue } = route.params;

  return (
    <View>
      <Text>PAGO MANUAL</Text>
      <Text>EL VALOR DE TU COMPRA ES DE: {formatNum(purchaseValue)}</Text>
    </View>
  );
};

export default WalletManualPayment;
