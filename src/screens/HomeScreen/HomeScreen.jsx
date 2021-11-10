import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { AddRemoveContext } from "../AddRemove/AddRemoveContext"
import { styles } from './styles';
import CustomButton from '../../components/CustomButton';
import Layout from '../../components/Layout';
import { SCREEN_NAME } from '../../constants';
import { savings } from '../../mockData/deseos';

const HomeScreen = ({ navigation }) => {
  const { totalMoneyWallet } = useContext(AddRemoveContext)


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
            />
          </View>
        </View>
        <View style={styles.button}>
          <CustomButton
            label="MIS AHORROS"
            amount={savings}
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
