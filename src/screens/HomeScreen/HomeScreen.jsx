import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';

import { AddRemoveContext } from '../AddRemove/AddRemoveContext';
import CustomButton from '../../components/CustomButton';
import Layout from '../../components/Layout';

import { SCREEN_NAME, TABS_NAME } from '../../constants';
import { styles } from './styles';
import getMoney from '../../utils/functions/loadMoneyToContext';
import { surveyDone } from '../../dataAccess/User';
import {CommonActions} from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const { totalMoneyWallet, totalMoneySavings, currentUser } = useContext(AddRemoveContext);
  const context = useContext(AddRemoveContext);

  useEffect( ()=> {
    navigation.dispatch(state => {
      // Remove the home route from the stack
      const routes = state.routes.filter(r => r.name !== 'LoadingScreen');

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  })

  useEffect(() => {
    const isDone = async () => {
      const done = await surveyDone();
      if (!done) {
        navigation.navigate(TABS_NAME.INFORMATION);
        setTimeout(() => {
          navigation.navigate(SCREEN_NAME.SURVEY, { firstTime: true });
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
    navigation.setOptions({tabBarVisible: false});
    let name = currentUser.name;
    if (name)
      navigation.setOptions({ headerTitle: "HOLA '" + name +"'" });
    else
      navigation.setOptions({ headerTitle: "INICIO" });
  }, [currentUser]);

  return (
    <Layout hideTextFooter>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>¿Cómopago?</Text>
        <Text style={styles.titleText1}>Tu billetera virtual</Text>
      </View>
      <View style={styles.buttonGroup}>
        <View style={styles.buttonGroupBg}>
          <View style={styles.button}>
            <CustomButton
              label="MI BILLETERA"
              amount={totalMoneyWallet}
              icon="wallet"
              sizeIcon={90}
              onPress={() => navigation.navigate(SCREEN_NAME.MY_WALLET)}
              from="wallet"
              color="miBilletera"
              isWallet
            />
          </View>
        </View>
        <View style={styles.button}>
          <CustomButton
            label="MIS AHORROS"
            amount={totalMoneySavings}
            icon="piggy-bank"
            sizeIcon={90}
            onPress={() => navigation.navigate(SCREEN_NAME.MY_SAVINGS)}
            from="savings"
            color="misAhorros"
          />
        </View>
      </View>
    </Layout>
  );
};

export default HomeScreen;
