import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import Layout from '../../components/Layout';
import WalletBalance from "./WalletBalance";
import WalletCarrousel from './WalletCarrousel';
import { styles } from '../HomeScreen/styles';

import { getTotalWallet } from "../../dataAccess/Wallet";

export default function MyWallet() {
  const [balance, setBalance] = useState(0)
  const [bills, setBills] = useState(null)
  const [coins, setCoins] = useState(null)

  useEffect(() => {
    async function getTotalWalletData(){
      const total = await getTotalWallet()

      if(total){
        //Do something with array result
      }
    }

    getTotalWallet()
  }, [])

  return (
    <Layout>
      <View style={styles.wrapperBalance}>
        <WalletBalance total={balance} />
      </View>
      <WalletCarrousel moneyType="billetes" dataCarrousel={bills}/>
      <WalletCarrousel moneyType="monedas" dataCarrousel={coins}/>
    </Layout>
  );
}