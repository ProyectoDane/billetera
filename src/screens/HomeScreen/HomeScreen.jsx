import React, { useContext, useEffect } from 'react';
import { Text, View, TouchableWithoutFeedback as TouchableWithNativeFeedback } from 'react-native';

import { AddRemoveContext } from '../AddRemove/AddRemoveContext';
import CustomButton from '../../components/CustomButton';
import Layout from '../../components/Layout';

import { colors, SCREEN_NAME } from '../../constants';
import { styles } from './styles';
import getMoney from '../../utils/functions/loadMoneyToContext';
import { surveyDone } from '../../dataAccess/User';
import { CommonActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import SvgCalculator from './SvgCalculator';
import SvgWishes from './SvgWishes';
import SvgInformation from './SvgInformation';
import SvgHome from './SvgHome';
import SvgHome2 from './SvgHome2';
import SvgWallet from './SvgWallet';
import SvgPiggyBank from './SvgPiggyBank';

const HomeScreen = ({ navigation }) => {
  const { totalMoneyWallet, totalMoneySavings, currentUser } = useContext(AddRemoveContext);
  const context = useContext(AddRemoveContext);

  useEffect(() => {
    navigation.dispatch((state) => {
      // Remove the home route from the stack
      const routes = state.routes.filter((r) => r.name !== 'LoadingScreen');

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  });

  useEffect(() => {
    const isDone = async () => {
      const done = await surveyDone();
      if (!done) {
        setTimeout(() => {
          navigation.navigate(SCREEN_NAME.INFORMATION_NAV, { screen: SCREEN_NAME.SURVEY, firstTime: true });
        }, 50);
      }
    };

    isDone();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getMoney(context);
    });
    return unsubscribe;
  }, [navigation, currentUser]);

  useEffect(() => {
    let name = currentUser.name;
    if (name)
      navigation.setOptions({
        headerTitle: () => (
          <Text style={{ textTransform: 'uppercase', color: colors.newBlack }}>
            HOLA, <Text style={{ fontWeight: 'bold' }}>{name}</Text>
          </Text>
        ),
      });
    else navigation.setOptions({ headerTitle: 'INICIO', headerTitleStyle: { fontSize: 14, color: colors.newBlack } });
  }, [currentUser]);

  const hasPurchase = true;
  const marginTop = { marginTop: hasPurchase ? '12%' : '6%' };
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
                  <Text style={styles.cardTitle}>¿Cómopago?</Text>
                  <Text style={[styles.cardSubtitle, marginTop]}>
                    UNA MANERA SENCILLA DE <Text style={{ fontWeight: 'bold' }}>ORGANIZAR TUS GASTOS</Text>
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
                <View style={{ alignItems: 'center', width: '100%' }}>
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
      <View style={styles.buttonGroup}>
        <View style={styles.button}>
          <CustomButton
            label="MI BILLETERA"
            amount={totalMoneyWallet}
            Icon={<SvgWallet style={{ height: 58, aspectRatio: 1 / 1 }} />}
            onPress={() => navigation.navigate(SCREEN_NAME.MY_WALLET)}
            from="wallet"
            isWallet
          />
        </View>
        <View style={[styles.button, { marginTop: -5 }]}>
          <CustomButton
            label="MIS AHORROS"
            amount={totalMoneySavings}
            Icon={<SvgPiggyBank style={{ width: 58, aspectRatio: 1 / 1 }} />}
            onPress={() => navigation.navigate(SCREEN_NAME.MY_SAVINGS)}
            from="savings"
          />
        </View>
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
