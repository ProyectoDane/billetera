import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';
import CustomButton from '../../components/CustomButton';
import Layout from '../../components/Layout';
import { SCREEN_NAME } from '../../constants';
import useCalcTotal from './hooks/useCalcTotal';

const HomeScreen = ({ navigation }) => {
  const { amountWallet, amountSavings } = useCalcTotal();

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
              amount={amountWallet}
              icon="wallet"
              sizeIcon={90}
              onPress={() => navigation.navigate(SCREEN_NAME.MY_WALLET)}
              color="miBilletera"
              isWallet
            />
          </View>
        </View>
        <View style={styles.button}>
          <CustomButton
            label="MIS AHORROS"
            amount={amountSavings}
            icon="piggy-bank"
            sizeIcon={90}
            onPress={() => navigation.navigate(SCREEN_NAME.MY_SAVINGS)}
            color="misAhorros"
          />
        </View>
      </View>
    </Layout>
  );
};

export default HomeScreen;
