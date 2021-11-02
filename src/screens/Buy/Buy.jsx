import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import InputText from '../../components/InputText';
import Layout from '../../components/Layout';
import { BalanceSchema } from '../../validations/FormSchemas';
import SingleButton from '../../components/SingleButton';
import { wallet, mySavings } from '../../mockData/wallet';

import { styles } from './styles';
import { colors, SCREEN_NAME } from '../../constants';

const Buy = ({ route }) => {
  const [valueBuy, setValueBuy] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [optionBill, setOptionBill] = useState('');
  const [optionCoin, setOptionCoin] = useState('');
  const [hasError, setHasError] = useState();

  const { isWallet } = route.params;
  const navigation = useNavigation();

  const schema = BalanceSchema(totalAmount);
  const methods = useForm({
    defaultValues: { amount: '' },
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset } = methods;

  // // ALGORITMO NUEVO!!!

  // Total de money en la billetera
  const calcTotal = (array) => {
    setTotalAmount(
      array
        .map((item) => item.value * item.quantity)
        .reduce((a, b) => a + b, 0),
    );
  };

  useEffect(() => {
    isWallet ? calcTotal(wallet) : calcTotal(mySavings);
  }, []);

  let optionPay = [];
  let optionsBills = [];
  let optionsCoins = [];
  let money = 0;
  let div = 0;
  let quantyBill = 0;

  const onSubmit = (data) => {
    money = data.amount;
    if (isWallet) {
      for (let bill of wallet) {
        if (money > 0) {
          div = Math.floor(money / bill.value);

          if (div > bill.quantity) {
            quantyBill = bill.quantity;
          } else {
            quantyBill = div;
          }
          optionPay.push({
            value: bill.value,
            quantity: quantyBill,
          });
          money = money - bill.value * quantyBill;
        }
      }
    } else {
      for (let bill of mySavings) {
        if (money > 0) {
          div = Math.floor(money / bill.value);

          if (div > bill.quantity) {
            quantyBill = bill.quantity;
          } else {
            quantyBill = div;
          }
          optionPay.push({
            value: bill.value,
            quantity: quantyBill,
          });
          money = money - bill.value * quantyBill;
        }
      }
    }
    console.log('OPCION DE PAGO', optionPay);

    if (money > 0) {
      setHasError(
        `LO SIENTO! TE FALTAN $${money} PARA PAGAR JUSTO. PEDI AYUDA!`,
      );
    } else {
      for (let e of optionPay) {
        if (e.quantity > 0 && e.value >= 10) {
          optionsBills.push(e.quantity + ' BILLETE/S DE $' + e.value);
          setHasError(false);
          setOptionBill(optionsBills);
        } else if (e.quantity > 0 && e.value < 10) {
          setHasError(false);
          optionsCoins.push(e.quantity + ' MONEDA/S DE $' + e.value);
          setOptionCoin(optionsCoins);
        }
      }
    }

    console.log('optionsCoins', optionsCoins);
    console.log('optionsBill', optionsBills);

    setValueBuy(data.amount);
    reset();
  };

  const handleContinue = () => {
    console.log('continuar');
  };
  const handleManualPay = () => {
    navigation.navigate(SCREEN_NAME.ADD_REMOVE);
  };

  return (
    <Layout>
      <ScrollView>
        <FormProvider {...methods}>
          <Text style={styles.amountAvaible}>
            TU DINERO DISPONIBLE: ${totalAmount}
          </Text>
          <View style={styles.form}>
            <InputText
              name="amount"
              label="IMPORTE DEL PRODUCTO A COMPRAR"
              placeholder="INGRESE EL VALOR DE LA COMPRA"
              keyboardType="numeric"
              required
            />
          </View>
          <SingleButton
            icon="magic"
            sizeIcon={22}
            label="CALCULAR"
            onPress={handleSubmit(onSubmit)}
          />
        </FormProvider>
        {valueBuy ? (
          <View>
            <Text style={styles.valueBuy}>VALOR DE LA COMPRA: ${valueBuy}</Text>
            <Text style={styles.optBuy}>FORMA DE PAGO SUGERIDA </Text>
            {!hasError ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  {optionBill ? (
                    <View>
                      <FontAwesome5
                        name="money-bill-alt"
                        size={40}
                        color={colors.black}
                        style={styles.icon}
                      />
                      {optionBill.map((item, index) => (
                        <Text key={index} style={styles.text}>
                          {item}
                        </Text>
                      ))}
                    </View>
                  ) : null}
                  {optionCoin ? (
                    <View>
                      <FontAwesome5
                        name="coins"
                        size={40}
                        color={colors.black}
                        style={styles.icon}
                      />
                      {optionCoin.map((item, index) => (
                        <Text key={index} style={styles.text}>
                          {item}
                        </Text>
                      ))}
                    </View>
                  ) : null}
                </View>
                <View
                  style={{
                    flex: 1,
                    paddingTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <SingleButton
                    icon="magic"
                    sizeIcon={22}
                    label="CONTINUAR"
                    onPress={handleContinue}
                  />
                  <SingleButton
                    icon="magic"
                    sizeIcon={22}
                    label="PAGO MANUAL"
                    onPress={handleManualPay}
                  />
                </View>
              </>
            ) : (
              <Text style={styles.error}>{hasError}</Text>
            )}
          </View>
        ) : null}
      </ScrollView>
    </Layout>
  );
};

export default Buy;
