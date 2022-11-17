import React, { useContext, useEffect } from 'react';
import { Text, View, TouchableWithoutFeedback as TouchableWithNativeFeedback, TouchableOpacity } from 'react-native';

import { AddRemoveContext } from '../AddRemove/AddRemoveContext';
import Layout from '../../components/Layout';

import {colors, NAVIGATION_TITLE, SCREEN_NAME, TABS_NAME} from '../../constants';
import { styles } from './styles';
import {surveyDone, tourDone} from '../../dataAccess/User';
import { LinearGradient } from 'expo-linear-gradient';
import SvgCalculator from './SvgCalculator';
import SvgWishes from './SvgWishes';
import SvgInformation from './SvgInformation';
import SvgHome from './SvgHome';
import SvgHome2 from './SvgHome2';
import SvgWallet from './SvgWallet';
import SvgPiggyBank from './SvgPiggyBank';

import Card from '../../components/Card/Card';
import CardSection from '../../components/Card/CardSection';
import CardText from '../../components/Card/CardText';
import Amount from '../../components/Amount/Amount';
import CardActions from '../../components/Card/CardActions';
import CardContent from '../../components/Card/CardContent';
import {appNavigationScreenOptions} from "../../constants/navigation";

const HomeScreen = ({ navigation }) => {
  const { totalMoneyWallet, totalMoneySavings, currentUser, hasPurchase } = useContext(AddRemoveContext);

  useEffect(() => {
    const isDone = async () => {
        const [isSurveyDone, isTourDone] = await Promise.all([surveyDone(currentUser.id), tourDone(currentUser.id)]);

        if (!isTourDone) {
            navigation.navigate(SCREEN_NAME.INFORMATION_NAV, {screen: SCREEN_NAME.ONBOARDING_NAV });
        } else if (!isSurveyDone) {
            setTimeout(() => {
                navigation.navigate(SCREEN_NAME.INFORMATION_NAV, {screen: SCREEN_NAME.SURVEY, firstTime: true});
            }, 50);
        }
    };

    isDone();
  }, [currentUser.id]);

  useEffect(() => {
    let name = currentUser.name;
    if (name)
      navigation.setOptions({
        headerTitle: () => (
          <Text style={{ textTransform: 'uppercase'}}>
            HOLA, <Text style={{ fontWeight: 'bold' }}>{name}</Text>
          </Text>
        ),
      });
    else navigation.setOptions({...appNavigationScreenOptions, headerTitle: 'INICIO'});
  }, [currentUser]);

  const marginTop = { marginTop: hasPurchase ? '12%' : '6%' };
  const flexrow = { flex: 1, flexDirection: 'row', alignItems: 'center' };

  return (
    <Layout hideTextFooter>
      <View style={{ overflow: 'hidden' }}>
        <View style={styles.headerContainer}>
          <LinearGradient
            style={{ marginTop: 0, width: '96%', borderRadius: 10, height: 140 }}
            colors={['rgba(0, 63, 186, 0.2)', 'rgba(0, 63, 186, 0.06)']}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 0.6, marginRight: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.headerTitle}>¿COMO PAGO?</Text>
                  <Text style={[styles.headerSubtitle, marginTop]}>
                    UNA MANERA FÁCIL DE <Text style={{ fontWeight: 'bold' }}>APRENDER A USAR TU DINERO</Text>
                  </Text>
                </View>
              </View>
              {hasPurchase ? <HomeHappyImg /> : <HomeInitImg />}
            </View>
          </LinearGradient>
          <View
            style={{
              width: '100%',
              marginTop: '7%',
              marginBottom: '7%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableWithNativeFeedback onPress={() => navigation.navigate(SCREEN_NAME.CALCULATOR_NAV)}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <SvgCalculator />
                <Text style={{ fontSize: 10, marginTop: 10 }}>CALCULADORA</Text>
              </View>
            </TouchableWithNativeFeedback>
            <View
              style={{
                flex: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderColor: colors.newBlack,
                alignItems: 'center',
                width: '33%',
              }}>
              <TouchableWithNativeFeedback onPress={() => navigation.navigate(SCREEN_NAME.WISHES_NAV)}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <SvgWishes />
                  <Text style={{ fontSize: 10, marginTop: 10 }}>DESEOS</Text>
                </View>
              </TouchableWithNativeFeedback>
            </View>
            <TouchableWithNativeFeedback onPress={() => navigation.navigate(SCREEN_NAME.INFORMATION_NAV)}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <SvgInformation />
                <Text style={{ fontSize: 10, marginTop: 10 }}>INFORMACIÓN</Text>
              </View>
            </TouchableWithNativeFeedback>
          </View>
        </View>
      </View>
      <View style={styles.cardGroup}>
        <Card style={{ flex: 1 }}>
          <CardSection onPress={() => navigation.navigate(SCREEN_NAME.MY_WALLET)}>
            <View style={flexrow}>
              <SvgWallet style={{ height: 58, aspectRatio: 1 / 1, marginRight: 12 }} />
              <CardText>Mi Billetera</CardText>
            </View>
            <Amount>{totalMoneyWallet}</Amount>
          </CardSection>
          <CardActions>
            <TouchableOpacity
              style={styles.modifyBtn}
              onPress={() => navigation.navigate(SCREEN_NAME.ADD_REMOVE, { from: 'wallet' })}>
              <Text style={styles.btnText}>AGREGAR/QUITAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buyBtn}
              onPress={() => navigation.navigate(SCREEN_NAME.WALLET_BUY, { isWallet: true })}>
              <Text style={styles.btnText}>COMPRAR</Text>
            </TouchableOpacity>
          </CardActions>
        </Card>
        <Card>
          <CardContent>
            <CardSection onPress={() => navigation.navigate(SCREEN_NAME.MY_SAVINGS)}>
              <View style={flexrow}>
                <SvgPiggyBank style={{ width: 58, aspectRatio: 1 / 1, marginRight: 12 }} />
                <CardText>Mis Ahorros</CardText>
              </View>
              <Amount>{totalMoneySavings}</Amount>
            </CardSection>
            <CardActions>
              <TouchableOpacity
                style={styles.modifyBtn}
                onPress={() => navigation.navigate(SCREEN_NAME.ADD_REMOVE_SAVINGS, { from: 'savings' })}>
                <Text style={styles.btnText}>AGREGAR/QUITAR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buyBtn}
                onPress={() => navigation.navigate(SCREEN_NAME.SAVINGS_BUY, { isWallet: false })}>
                <Text style={styles.btnText}>COMPRAR</Text>
              </TouchableOpacity>
            </CardActions>
          </CardContent>
        </Card>
      </View>
    </Layout>
  );
};

export default HomeScreen;

export const HomeHappyImg = () => {
  return (
    <View
      style={{
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <SvgHome2 height={120} width={120} />
    </View>
  );
};

export const HomeInitImg = () => {
  return (
    <View
      style={{
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        paddingRight: 10,
        marginTop: -20,
      }}>
      <SvgHome width="200%" style={{ aspectRatio: 1 / 1 }} />
    </View>
  );
};
