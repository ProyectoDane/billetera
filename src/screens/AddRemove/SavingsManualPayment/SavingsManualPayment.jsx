import React, { useContext, useState } from 'react';
import { Text, View, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView } from 'react-native-tab-view';

import SingleButton from '../../../components/SingleButton';
import { colors, SCREEN_NAME } from '../../../constants';
import { formatNum } from '../../../utils/functions/formatNum';
import getMoney from '../../../utils/functions/loadMoneyToContext';
import { toastNotification } from '../../../utils/functions/toastNotifcation';
import { AddRemoveContext } from '../AddRemoveContext';
import { ManualPaymentContext } from '../ManualPaymentContext';
import { innerSaveManualPaymentSavings } from '../utils';
import SavingsManualPaymentBills from './SavingsManualPaymentBills/SavingsManualPaymentBills';

export default function SavingsManualPayment({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    actualBillsSavings,
    setActualBillsSavings,
    actualCoinsSavings,
    setActualCoinsSavings,
    initialBillsMoneySavings,
    initialCoinsMoneySavings,
  } = useContext(AddRemoveContext);

  const { totalPaymentSavings, setTotalPaymentSavings } =
    useContext(ManualPaymentContext);

  const [totalFreeze] = useState(() => totalPaymentSavings);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return (
          <SavingsManualPaymentBills
            initialMoney={initialBillsMoneySavings}
            actualMoney={actualBillsSavings}
            setActualMoney={setActualBillsSavings}
            actualMoneySavings={totalPaymentSavings}
            setActualMoneySavings={setTotalPaymentSavings}
            totalMoneySavings={totalPaymentSavings}
          />
        );
      case 'second':
        return (
          <SavingsManualPaymentBills
            initialMoney={initialCoinsMoneySavings}
            actualMoney={actualCoinsSavings}
            setActualMoney={setActualCoinsSavings}
            actualMoneySavings={totalPaymentSavings}
            setActualMoneySavings={setTotalPaymentSavings}
            totalMoneySavings={totalPaymentSavings}
          />
        );

      default:
        return null;
    }
  };

  const context = useContext(AddRemoveContext);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'BILLETES' },
    { key: 'second', title: 'MONEDAS' },
  ]);

  const handleSave = async () => {
    setIsLoading(true);

    await innerSaveManualPaymentSavings(
      initialCoinsMoneySavings,
      actualCoinsSavings,
      initialBillsMoneySavings,
      actualBillsSavings,
    );
    await getMoney(context);

    if (totalPaymentSavings === 0) {
      toastNotification(
        'SE REALIZO EL PAGO CORRECTAMENTE!',
        'success',
        'success',
      );
    } else {
      toastNotification(
        `ACORDATE DE CARGAR TU VUELTO DE ${formatNum(
          Math.abs(totalPaymentSavings),
        )} EN TUS AHORROS !`,
        'info',
        'info',
      );
    }
    navigation.navigate(SCREEN_NAME.HOME);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#BBB' }}>
        <Text style={{ fontSize: 30, textAlign: 'center' }}>
          TOTAL {formatNum(totalFreeze)}
        </Text>
      </View>
      <View style={{ backgroundColor: '#BBB' }}>
        <Text style={{ fontSize: 30, textAlign: 'center' }}>
          {totalPaymentSavings > 0
            ? `TE FALTA PAGAR ${formatNum(totalPaymentSavings)}`
            : totalPaymentSavings === 0
            ? `PAGASTE JUSTO`
            : `TU VUELTO ES ${formatNum(Math.abs(totalPaymentSavings))}`}
        </Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      <View style={{ paddingVertical: 5 }}>
        <SingleButton
          icon="money-bill-wave"
          sizeIcon={22}
          label="CONFIRMAR"
          isLoading={isLoading}
          disabled={
            isLoading || (totalPaymentSavings !== 0 && totalPaymentSavings > 0)
          }
          onPress={handleSave}
          style={{
            marginTop: 0,
            backgroundColor:
              totalPaymentSavings !== 0 && totalPaymentSavings > 0
                ? colors.disable
                : colors.secondary,
          }}
        />
      </View>
    </View>
  );
}
