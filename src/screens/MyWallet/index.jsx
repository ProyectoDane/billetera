import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';

import Layout from '../../components/Layout';
import WalletBalance from './WalletBalance';
import WalletCarrousel from './WalletCarrousel';
import { AddRemoveContext } from '../AddRemove/AddRemoveContext';
import { styles } from '../HomeScreen/styles';
import { formatNum } from '../../utils/functions/formatNum';

export default function MyWallet() {
  const { totalMoneyWallet, actualBillsMoneyWallet, initialCoinsMoneyWallet } =
    useContext(AddRemoveContext);

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
        <WalletBalance total={formatNum(totalMoneyWallet)} />
      </View>
      <WalletCarrousel
        moneyType="billetes"
        dataCarrousel={handleMoney(actualBillsMoneyWallet)}
      />
      <WalletCarrousel
        moneyType="monedas"
        dataCarrousel={handleMoney(initialCoinsMoneyWallet)}
      />
    </Layout>
  );
}
