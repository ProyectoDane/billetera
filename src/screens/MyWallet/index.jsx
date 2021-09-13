import React from 'react';
import { View } from 'react-native';

import Layout from '../../components/Layout';
import WalletBalance from "./WalletBalance";
import WalletCarrousel from './WalletCarrousel';
import { styles } from '../HomeScreen/styles';

export default function MyWallet() {
  return (
    <Layout>
      <View style={styles.wrapperBalance}>
        <WalletBalance />
      </View>
      {/* <WalletCarrousel moneyType="billetes" />
      <WalletCarrousel moneyType="monedas" /> */}
    </Layout>
  );
}