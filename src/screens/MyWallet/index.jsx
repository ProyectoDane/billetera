import React, { useContext } from 'react';
import { View } from 'react-native';

import Layout from '../../components/Layout';
import WalletBalance from './WalletBalance';
import WalletCarrousel from './WalletCarrousel';
import { AddRemoveContext } from '../AddRemove/AddRemoveContext';
import { styles } from './styles';
import { formatNum } from '../../utils/functions/formatNum';

export default function MyWallet() {
  const { totalMoneyWallet, initialBillsMoneyWallet, initialCoinsMoneyWallet } =
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
      <View style={styles.moneyContainer}>
        <WalletCarrousel
          moneyType="billetes"
          dataCarrousel={handleMoney(initialBillsMoneyWallet)}
        />
        <WalletCarrousel
          moneyType="monedas"
          dataCarrousel={handleMoney(initialCoinsMoneyWallet)}
        />
      </View>
    </Layout>
  );
}
