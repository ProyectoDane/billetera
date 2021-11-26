import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';

import { ManualPaymentContext } from '../../AddRemove/ManualPaymentContext';
import { AddRemoveContext } from '../../AddRemove/AddRemoveContext';
import { BalanceSchema } from '../../../validations/FormSchemas';
import {
  getDineroSaving,
  deleteMoneySaving,
} from '../../../dataAccess/Savings';
import InputText from '../../../components/InputText';
import Layout from '../../../components/Layout';
import SingleButton from '../../../components/SingleButton';
import { styles } from './styles';
import { SCREEN_NAME } from '../../../constants';
import { formatNum } from '../../../utils/functions/formatNum';
import { toastNotification } from '../../../utils/functions/toastNotifcation';
import pagarCon from '../../../utils/functions/calculaComoPagar';
import ItemMoney from '../../AddRemove/components/ItemMoney';

const SavingsBuy = () => {
  const [valueBuy, setValueBuy] = useState();
  const [optionBill, setOptionBill] = useState('');
  const [optPay, setOptPay] = useState();
  const [vuelto, setVuelto] = useState();
  const [cantidadPagar, setCantidadPagar] = useState();
  const [hasError, setHasError] = useState();
  const [moneyDB, setMoneyDB] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const {
    setTotalMoneySavings,
    totalMoneySavings,
    setInitialCoinsMoneySavings,
    setInitialBillsMoneySavings,
    initialCoinsMoneySavings,
    initialBillsMoneySavings,
  } = useContext(AddRemoveContext);

  const { setTotalPaymentSavings } = useContext(ManualPaymentContext);

  const schema = BalanceSchema(totalMoneySavings);
  const methods = useForm({
    defaultValues: { amount: '' },
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset } = methods;

  const tomarDinero = async () => {
    const res = await getDineroSaving();
    if (res.length > 0) {
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

      setMoneyDB(dineroDB);
    }
    return res;
  };
  useEffect(() => {
    // Obtiene y ordena el dinero de la ahorros
    tomarDinero();
  }, [isLoading]);

  let optionsBills = [];

  const onSubmit = (data) => {
    // console.log('DINERO TOTAL AL INCIO >>>', moneyDB);
    setOptionBill('');
    // data trae los datos del formulario
    let money = data.amount;

    let resultados = pagarCon(money, moneyDB);

    let resultado = resultados[0];
    let primeraOpcion = resultado.billetes;

    setOptPay(primeraOpcion);
    setVuelto(resultado.vuelto ? formatNum(resultado.vuelto) : null);
    setCantidadPagar(resultado.totales.amount);

    for (let e of primeraOpcion) {
      if (e.quantity > 0 && e.amount >= 10 && e.isCoins === 0) {
        optionsBills.push(e.quantity + ' BILLETE/S DE ' + formatNum(e.amount));
        setHasError(false);
      } else if (e.quantity > 0 && e.amount <= 10 && e.isCoins === 1) {
        setHasError(false);
        optionsBills.push(e.quantity + ' MONEDA/S DE ' + formatNum(e.amount));
      }
    }
    setOptionBill(optionsBills);
    // setOptionCoin(optionsCoins);

    setValueBuy(data.amount);
    reset();
  };

  const handleContinue = async () => {
    setValueBuy('');
    setOptionBill('');
    setIsLoading(true);
    try {
      for (let opt of optPay) {
        if (opt.quantity > 0 && opt.isCoins) {
          await deleteMoneySaving(opt.userId, opt.moneyId, opt.quantity);
          setTotalMoneySavings(totalMoneySavings - opt.amount * opt.quantity);
          const newCoins = initialCoinsMoneySavings.map((item) => {
            if (item.id === opt.moneyId) {
              item.quantity = item.quantity - opt.quantity;
              return item;
            }
            return item;
          });
          setInitialCoinsMoneySavings(newCoins);
        }
        if (opt.quantity > 0 && !opt.isCoins) {
          await deleteMoneySaving(opt.userId, opt.moneyId, opt.quantity);
          setTotalMoneySavings(totalMoneySavings - opt.amount * opt.quantity);
          const newBills = initialBillsMoneySavings.map((item) => {
            if (item.id === opt.moneyId) {
              item.quantity = item.quantity - opt.quantity;
              return item;
            }
            return item;
          });

          setInitialBillsMoneySavings(newBills);
        }
      }
      navigation.navigate(SCREEN_NAME.HOME);

      vuelto
        ? toastNotification(
            `ACORDATE DE CARGAR TU VUELTO DE ${vuelto} EN TUS AHORROS !`,
            'info',
            'info',
          )
        : toastNotification(
            'LA COMPRA SE REALIZÓ CORRECTAMENTE!',
            'success',
            'success',
          );

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleManualPay = () => {
    setTotalPaymentSavings(valueBuy);
    navigation.navigate(SCREEN_NAME.SAVINGS_MANUAL_PAYMENT);
  };

  return (
    <Layout>
      <ScrollView>
        <FormProvider {...methods}>
          <View
            style={{
              backgroundColor: 'lightgreen',
              flex: 1,
              flexWrap: 'nowrap',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <Text style={{ ...styles.amountAvaible, padding: 5, flex: 1 }}>
              TENES{' '}
              {totalMoneySavings > 0 ? formatNum(totalMoneySavings) : `$0`}
            </Text>
          </View>
          <Text style={{ flex: 1, textAlign: 'center', ...styles.text }}>
            IMPORTE DEL PRODUCTO A COMPRAR
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              ...styles.form,
              marginBottom: 10,
            }}>
            <View style={{ flex: 5 }}>
              <InputText
                name="amount"
                //label="IMPORTE DEL PRODUCTO A COMPRAR"
                placeholder="INGRESE EL VALOR DE LA COMPRA"
                keyboardType="numeric"
                required
              />
            </View>
            <View
              style={{ flex: 2, flexDirection: 'row', alignItems: 'baseline' }}>
              <SingleButton
                icon="calculator"
                sizeIcon={22}
                style={{ flex: 1, height: '100%' }}
                //label="CALCULAR"
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </FormProvider>
        {valueBuy ? (
          <View>
            {!hasError ? (
              <View style={{ padding: 10 }}>
                <View
                  style={{
                    padding: 10,
                    ...styles.optBuyContainer,
                    borderWidth: 1,
                    borderColor: 'lightgray',
                  }}>
                  <Text style={styles.valueBuy}>
                    VALOR DE LA COMPRA: {formatNum(valueBuy)}
                  </Text>
                  <Text style={styles.optBuy}>
                    FORMA DE PAGO SUGERIDA {formatNum(cantidadPagar)}{' '}
                  </Text>
                  {optionBill ? (
                    <View>
                      {optionBill.map((item, index) => (
                        <View key={index} style={styles.itemOptBuy}>
                          <Text style={{ flex: 1, ...styles.text }}>
                            {item}
                          </Text>
                          <ItemMoney
                            key={'money_' + index}
                            {...optPay[index]}
                            style={{
                              flex: 1,
                              width: null,
                              height: 40,
                              resizeMode: 'contain',
                            }}
                          />
                        </View>
                      ))}
                    </View>
                  ) : null}
                  {vuelto ? (
                    <View>
                      <Text key={vuelto} style={styles.vuelto}>
                        Tu vuelto es {vuelto}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View style={styles.buttonsContainer}>
                  <SingleButton
                    icon="magic"
                    sizeIcon={22}
                    label="USAR SUGERIDO"
                    isLoading={isLoading}
                    disabled={isLoading}
                    onPress={handleContinue}
                  />
                  <SingleButton
                    icon="hand-pointer"
                    sizeIcon={22}
                    label="ELEGIR YO"
                    onPress={handleManualPay}
                  />
                </View>
              </View>
            ) : (
              <Text style={styles.error}>{hasError}</Text>
            )}
          </View>
        ) : null}
      </ScrollView>
    </Layout>
  );
};

export default SavingsBuy;
