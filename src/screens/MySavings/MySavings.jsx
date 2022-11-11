import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';

import Layout from '../../components/Layout';
import { AddRemoveContext } from '../AddRemove/AddRemoveContext';
import { styles } from '../MyWallet/styles';
import SvgWallet from '../HomeScreen/SvgWallet';
import SvgBills from '../MyWallet/SvgBills';
import CardSection from '../../components/Card/CardSection';
import Card from '../../components/Card/Card';
import Amount from '../../components/Amount/Amount';
import CardText from '../../components/Card/CardText';
import CardCollapse from '../../components/Card/CardCollapse';
import WalletCarrousel from '../MyWallet/WalletCarrousel';
import SvgCash from '../MyWallet/SvgCash';

const totalize = (list) =>
  list.reduce((prevTotal, item) => {
    return prevTotal + item.amount * item.quantity;
  }, 0);

const withQuantity = (list) => list.filter((item) => item.quantity > 0);

export default function MySavings() {
  const { totalMoneySavings, initialBillsMoneySavings, initialCoinsMoneySavings } = useContext(AddRemoveContext);
  const bills = withQuantity(initialBillsMoneySavings);
  const coins = withQuantity(initialCoinsMoneySavings);
  const totalBills = totalize(bills);
  const totalCoins = totalize(coins);
  const flexrow = { flex: 1, flexDirection: 'row', alignItems: 'center' };
  const svgicon = { width: 58, aspectRatio: 1 / 1, marginRight: 12 };
  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.cardGroup}>
        <View style={styles.container}>
          <Card containerStyle={{ flex: 1 }}>
            <CardSection>
              <View style={flexrow}>
                <SvgWallet style={svgicon} />
                <CardText>total ahorros</CardText>
              </View>
              <Amount>{totalMoneySavings}</Amount>
            </CardSection>
          </Card>
        </View>
        <View style={[styles.container, { marginTop: -5 }]}>
          <Card expandable>
            <CardSection>
              <View style={flexrow}>
                <SvgCash style={svgicon} />
                <CardText>Billetes</CardText>
              </View>
              <Amount>{totalBills}</Amount>
            </CardSection>
            <CardCollapse>
              <View style={{ backgroundColor: '#fff' }}>
                <WalletCarrousel moneyType="billetes" dataCarrousel={bills} />
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
              <Amount>{totalCoins}</Amount>
            </CardSection>
            <CardCollapse>
              <View style={{ backgroundColor: '#fff' }}>
                <WalletCarrousel moneyType="monedas" dataCarrousel={coins} />
              </View>
            </CardCollapse>
          </Card>
        </View>
      </ScrollView>
    </Layout>
  );
}
