import React, { useContext } from 'react';
import { View } from 'react-native';

import Layout from '../../components/Layout';
import { formatNum } from '../../utils/functions/formatNum';
import { AddRemoveContext } from '../AddRemove/AddRemoveContext';
import { styles } from '../MyWallet/styles';
import WalletBalance from '../MyWallet/WalletBalance';
import WalletCarrousel from '../MyWallet/WalletCarrousel';

export default function MySavings() {
  const {
    totalMoneySavings,
    initialBillsMoneySavings,
    initialCoinsMoneySavings,
  } = useContext(AddRemoveContext);

  const handleMoney = (money) => {
    let finalArray = [];

    for (let property of money) {
      if (property.quantity > 0) {
        finalArray.push(property);
      }
    }

    return finalArray;
  };

  return (
    <Layout>
      <View style={styles.wrapperBalance}>
        <WalletBalance isWallet={false} total={formatNum(totalMoneySavings)} />
      </View>
      <View style={styles.moneyContainer}>
        <WalletCarrousel
          moneyType="billetes"
          dataCarrousel={handleMoney(initialBillsMoneySavings)}
        />
        <WalletCarrousel
          moneyType="monedas"
          dataCarrousel={handleMoney(initialCoinsMoneySavings)}
        />
      </View>
    </Layout>
  );
}
