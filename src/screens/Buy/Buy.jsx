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
import {
  deleteMoneyWallet,
  getDineroWallet,
  insertMoneyToWallet,
} from '../../dataAccess/Wallet';

import { styles } from './styles';
import { colors, SCREEN_NAME } from '../../constants';

const Buy = ({ route }) => {
  const [valueBuy, setValueBuy] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [optionBill, setOptionBill] = useState('');
  const [optionCoin, setOptionCoin] = useState('');
  const [optPay, setOptPay] = useState();
  const [hasError, setHasError] = useState();
  const [moneyDB, setMoneyDB] = useState();

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
  const calcTotalWallet = async () => {
    const res = await getDineroWallet(1);
    setTotalAmount(
      res.map((item) => item.amount * item.quantity).reduce((a, b) => a + b, 0),
    );
  };

  const tomarDinero = async () => {
    // ESTO SE ORDENA DESDE LA BD DIRECTAMENTE!!!! VER CON GONZA
    const res = await getDineroWallet();

    let dineroBillDB = res.filter((item) => item.isCoins === 0).reverse();
    let dineroCoinDB = res.filter((item) => item.isCoins === 1);

    let dineroDB = [...dineroBillDB, ...dineroCoinDB];
    // console.log('dinero Coin DB', dineroCoinDB);
    // console.log('dinero bill db', dineroBillDB);
    setMoneyDB(dineroDB);
  };

  const crearDinero = async () => {
    await insertMoneyToWallet(1, 3, 1);
    await insertMoneyToWallet(1, 4, 2);
    await insertMoneyToWallet(1, 5, 1);
    await insertMoneyToWallet(1, 6, 3);
    await insertMoneyToWallet(1, 11, 3);
    await insertMoneyToWallet(1, 14, 3);
    await insertMoneyToWallet(1, 15, 3);
  };

  useEffect(() => {
    // Se creo dinero manualmente para realizar pruebas
    // crearDinero();
    tomarDinero();

    calcTotalWallet();
    // isWallet ? calcTotal(moneyDB) : calcTotal(mySavings);
  }, [tomarDinero]);

  let optionPay = [];
  let optionsBills = [];
  let optionsCoins = [];
  let money = 0;
  let div = 0;
  let quantyBill = 0;

  const onSubmit = (data) => {
    console.log('MONEY DB AL INCIO >>>', moneyDB);
    setOptionBill('');
    setOptionCoin('');
    money = data.amount;
    if (isWallet) {
      for (let bill of moneyDB) {
        if (money > 0) {
          div = Math.floor(money / bill.amount);

          if (div > bill.quantity) {
            quantyBill = bill.quantity;
          } else {
            quantyBill = div;
          }

          optionPay.push({
            money_id: bill.id,
            amount: bill.amount,
            quantity: quantyBill,
            image: bill.image,
            user_id: bill.userId,
          });

          money = money - bill.amount * quantyBill;
        }
      }
    } else {
      //TODO: cambiar mySavings por el resultado de getMoneySavings
      for (let bill of moneyDB) {
        if (money > 0) {
          div = Math.floor(money / bill.amount);

          if (div > bill.quantity) {
            quantyBill = bill.quantity;
          } else {
            quantyBill = div;
          }

          optionPay.push({
            money_id: bill.id,
            amount: bill.amount,
            quantity: quantyBill,
            image: bill.image,
            user_id: bill.userId,
          });

          money = money - bill.amount * quantyBill;
        }
      }
    }
    setOptPay(optionPay);
    console.log('OPCION DE PAGO >>>>', optionPay);

    if (money > 0) {
      setHasError(
        `EL DINERO TE ALCANZA PERO NO TENES PARA PAGAR JUSTO, PEDI AYUDA PARA CALCULAR EL VUELTO`,
      );
    } else {
      for (let e of optionPay) {
        if (e.quantity > 0 && e.amount >= 10) {
          optionsBills.push(e.quantity + ' BILLETE/S DE $' + e.amount);
          setHasError(false);
          setOptionBill(optionsBills);
        } else if (e.quantity > 0 && e.amount < 10) {
          setHasError(false);
          optionsCoins.push(e.quantity + ' MONEDA/S DE $' + e.amount);
          setOptionCoin(optionsCoins);
        }
      }
    }

    // console.log('optionsCoins', optionsCoins);
    // console.log('optionsBill', optionsBills);

    setValueBuy(data.amount);
    reset();
  };

  const handleContinue = async () => {
    for (let opt of optPay) {
      if (opt.quantity > 0) {
        console.log(
          'PARAMS PARA DELETE:',
          opt.user_id,
          opt.money_id,
          opt.quantity,
        );
        const algo = await deleteMoneyWallet(
          opt.user_id,
          opt.money_id,
          opt.quantity,
        );
        console.log('ALGO>>>>>>>>>>>>>>>>', algo);
      }
    }
    console.log('Se elimino');
    tomarDinero();
    console.log('MONEY DB AL FINALIZAR BORRADO >>>', moneyDB);
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
