import React, { useState, useEffect, useContext } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import InputText from '../../../components/InputText';
import Layout from '../../../components/Layout';
import { BalanceSchema } from '../../../validations/FormSchemas';
import SingleButton from '../../../components/SingleButton';
import { successNotification } from '../../../components/ToastNotification/successNotification';
import { deleteMoneyWallet, getDineroWallet } from '../../../dataAccess/Wallet';
import { AddRemoveContext } from '../../AddRemove/AddRemoveContext';

import { styles } from './styles';
import { colors, SCREEN_NAME } from '../../../constants';
import { formatNum } from '../../../utils/functions/formatNum';

const WalletBuy = () => {
  const [valueBuy, setValueBuy] = useState();
  const [optionBill, setOptionBill] = useState('');
  const [optionCoin, setOptionCoin] = useState('');
  const [optPay, setOptPay] = useState();
  const [hasError, setHasError] = useState();
  const [moneyDB, setMoneyDB] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const { setTotalMoneyWallet, totalMoneyWallet } =
    useContext(AddRemoveContext);

  const schema = BalanceSchema(totalMoneyWallet);
  const methods = useForm({
    defaultValues: { amount: '' },
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset } = methods;

  const tomarDinero = async () => {
    const res = await getDineroWallet();

    let dineroBillDB = res
      .filter((item) => item.isCoins === 0)
      .sort(function (a, b) {
        return b.id - a.id;
      });
    let dineroCoinDB = res
      .filter((item) => item.isCoins === 1)
      .sort(function (a, b) {
        return b.amount - a.amount;
      });

    let dineroDB = [...dineroBillDB, ...dineroCoinDB];
    // console.log('MONEDAS DISPONIBLES:', dineroCoinDB);
    // console.log('BILLETES DISPONIBLES:', dineroBillDB);
    setMoneyDB(dineroDB);
  };

  useEffect(() => {
    // Obtiene y ordena el dinero de la billetera
    tomarDinero();
  }, [isLoading]);

  let optionPay = [];
  let optionsBills = [];
  let optionsCoins = [];
  let quantityMoney = 0;

  const onSubmit = (data) => {
    // console.log('DINERO TOTAL AL INCIO >>>', moneyDB);
    setOptionBill('');
    setOptionCoin('');
    // data trae los datos del formulario
    let money = data.amount;

    for (let bill of moneyDB) {
      if (money > 0) {
        let div = Math.floor(money / bill.amount);

        if (div > bill.quantity) {
          quantityMoney = bill.quantity;
        } else {
          quantityMoney = div;
        }

        optionPay.push({
          money_id: bill.id,
          amount: bill.amount,
          quantity: quantityMoney,
          image: bill.image,
          user_id: bill.userId,
          isCoins: bill.isCoins,
        });

        money = money - bill.amount * quantityMoney;
      }
    }

    setOptPay(optionPay);
    // console.log('OPCION DE PAGO >>>>', optionPay);

    if (money > 0) {
      setHasError(
        `EL DINERO TE ALCANZA PERO NO TENES PARA PAGAR JUSTO, PEDI AYUDA PARA CALCULAR EL VUELTO`,
      );
    } else {
      for (let e of optionPay) {
        if (e.quantity > 0 && e.amount >= 10 && e.isCoins === 0) {
          optionsBills.push(
            e.quantity + ' BILLETE/S DE ' + formatNum(e.amount),
          );
          setHasError(false);
          setOptionBill(optionsBills);
        } else if (e.quantity > 0 && e.amount <= 10 && e.isCoins === 1) {
          setHasError(false);
          optionsCoins.push(e.quantity + ' MONEDA/S DE ' + formatNum(e.amount));
          setOptionCoin(optionsCoins);
        }
      }
    }
    setValueBuy(data.amount);
    reset();
  };

  const handleContinue = async () => {
    setValueBuy('');
    setOptionBill('');
    setOptionCoin('');
    setIsLoading(true);
    try {
      for (let opt of optPay) {
        if (opt.quantity > 0) {
          await deleteMoneyWallet(opt.user_id, opt.money_id, opt.quantity);
          setTotalMoneyWallet(totalMoneyWallet - opt.amount * opt.quantity);
        }
      }
      successNotification();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleManualPay = () => {
    navigation.navigate(SCREEN_NAME.WALLET_MANUAL_PAYMENT, {
      purchaseValue: valueBuy,
    });
  };

  return (
    <Layout>
      <ScrollView>
        <FormProvider {...methods}>
          <Text style={styles.amountAvaible}>
            TU DINERO DISPONIBLE:{' '}
            {totalMoneyWallet > 0 ? formatNum(totalMoneyWallet) : `$0`}
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
            <Text style={styles.valueBuy}>
              VALOR DE LA COMPRA: {formatNum(valueBuy)}
            </Text>
            <Text style={styles.optBuy}>FORMA DE PAGO SUGERIDA </Text>
            {!hasError ? (
              <>
                <View style={styles.optBuyContainer}>
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
                <View style={styles.buttonsContainer}>
                  <SingleButton
                    icon="magic"
                    sizeIcon={22}
                    label="CONTINUAR"
                    isLoading={isLoading}
                    disabled={isLoading}
                    onPress={handleContinue}
                  />
                  <SingleButton
                    icon="magic"
                    sizeIcon={22}
                    label="ELEGILOS"
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

export default WalletBuy;
