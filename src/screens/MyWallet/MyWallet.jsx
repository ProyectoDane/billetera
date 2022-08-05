/* eslint-disable react/jsx-no-undef */
import React, {useContext, useEffect, useRef, useState} from 'react';
import { View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

import Layout from '../../components/Layout';
import { AddRemoveContext } from '../AddRemove/AddRemoveContext';
import { styles } from './styles';
import SvgWallet from '../HomeScreen/SvgWallet';
import SvgBills from '../MyWallet/SvgBills';
import SvgPiggyBank from '../HomeScreen/SvgPiggyBank';
import CardSection from '../../components/Card/CardSection';
import Card from '../../components/Card/Card';
import Amount from '../../components/Amount/Amount';
import CardText from '../../components/Card/CardText';
import CardCollapse from '../../components/Card/CardCollapse';
import WalletCarrousel from './WalletCarrousel';

export default function MyWallet() {
  const {
    totalMoneyWallet,
    actualMoneySavings,
    actualCoinsMoneyWallet,
    initialBillsMoneyWallet,
    initialCoinsMoneyWallet,
  } = useContext(AddRemoveContext);
  // const navigation = useNavigation();

  // eslint-disable-next-line no-unused-vars
  const [totales, setTotales] = useState({
    bills: 0,
    coins: 0
  });

  useEffect(()=> {
    const totalize = (money) => {
      const aux = {
        bills: 0,
        coins: 0
      }
      for (let currentEntry of money) {
        if (currentEntry.quantity > 0) {
          if (currentEntry.isCoins) {
            aux.coins = aux.coins + (currentEntry.amount * currentEntry.quantity)
          } else {
            aux.bills = aux.bills + (currentEntry.amount * currentEntry.quantity)
          }
        }
      }
      return aux;
    }
    setTotales(totalize(initialBillsMoneyWallet.concat(initialCoinsMoneyWallet)));

  }, [initialCoinsMoneyWallet, initialBillsMoneyWallet])

  const handleMoney = (money) => {
    let finalArray = [];

    for (let currentEntry of money) {
      if (currentEntry.quantity > 0) {
        finalArray.push(currentEntry);
      }
    }
    return finalArray;
  };



  const flexrow = { flex: 1, flexDirection: 'row', alignItems: 'center' };
  const svgicon = { width: 58, aspectRatio: 1 / 1, marginRight: 12 };

  return (
    <Layout>
      <View style={styles.cardGroup}>
        <View style={styles.container}>
          <Card containerStyle={{ flex: 1 }}>
            <CardSection>
              <View style={flexrow}>
                <SvgWallet style={svgicon} />
                <CardText>total billetera</CardText>
              </View>
              <Amount>{totalMoneyWallet}</Amount>
            </CardSection>
          </Card>
        </View>
        <View style={[styles.container, { marginTop: -5 }]}>
          <Card expandable>
            <CardSection>
              <View style={flexrow}>
                <SvgPiggyBank style={svgicon} />
                <CardText>Billetes</CardText>
              </View>
              <Amount>{totales.bills}</Amount>
            </CardSection>
            <CardCollapse>
              <View style={{ backgroundColor: '#fff' }}>
                <WalletCarrousel moneyType="billetes" dataCarrousel={handleMoney(initialBillsMoneyWallet)} />
              </View>
            </CardCollapse>
          </Card>
        </View>
        <View style={[styles.container, { marginTop: -5 }]}>
          <Card expandable>
            <CardSection>
              <View style={flexrow}>
                <SvgBills style={svgicon} />
                <CardText>Monedas</CardText>
              </View>
              <Amount>{totales.coins}</Amount>
            </CardSection>
            <CardCollapse>
              <View style={{ backgroundColor: '#fff' }}>
                <WalletCarrousel moneyType="monedas" dataCarrousel={handleMoney(initialCoinsMoneyWallet)} />
              </View>
            </CardCollapse>
          </Card>
        </View>
      </View>
    </Layout>
  );
}
