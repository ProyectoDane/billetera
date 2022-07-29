/* eslint-disable react/jsx-no-undef */
import React, { useContext } from 'react';
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
    totalMoneySavings,
    actualMoneySavings,
    initialBillsMoneySavings,
    initialCoinsMoneySavings,
  } = useContext(AddRemoveContext);
  // const navigation = useNavigation();

  // eslint-disable-next-line no-unused-vars
  const handleMoney = (money) => {
    let finalArray = [];
    for (let property of money) {
      if (property.quantity > 0) {
        finalArray.push(property);
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
              <Amount>{totalMoneySavings}</Amount>
            </CardSection>
            <CardCollapse>
              <View style={{ backgroundColor: '#fff' }}>
                <WalletCarrousel moneyType="billetes" dataCarrousel={handleMoney(initialBillsMoneySavings)} />
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
              <Amount>{actualMoneySavings}</Amount>
            </CardSection>
            <CardCollapse>
              <View style={{ backgroundColor: '#fff' }}>
                <WalletCarrousel moneyType="monedas" dataCarrousel={handleMoney(initialCoinsMoneySavings)} />
              </View>
            </CardCollapse>
          </Card>
        </View>
      </View>
    </Layout>
  );
}
