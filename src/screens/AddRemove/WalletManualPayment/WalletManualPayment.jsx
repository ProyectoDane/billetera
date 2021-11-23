import React, { useContext, useState } from 'react';
import { Text, View, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView } from 'react-native-tab-view';

import SingleButton from '../../../components/SingleButton';
import { SCREEN_NAME } from '../../../constants';
import { formatNum } from '../../../utils/functions/formatNum';
import getMoney from '../../../utils/functions/loadMoneyToContext';
import { toastNotification } from '../../../utils/functions/toastNotifcation';
import { AddRemoveContext } from '../AddRemoveContext';
import { ManualPaymentContext } from '../ManualPaymentContext';
import { innerSaveAddRemove } from '../utils';
import WalletManualPaymentBills from './WalletManualPaymentBills/WalletManualPaymentBills';

export default function WalletManualPayment({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    actualBills,
    setActualBills,
    actualCoins,
    setActualCoins,
    initialBillsMoneyWallet,
    initialCoinsMoneyWallet,
  } = useContext(AddRemoveContext);

  const { totalPaymentWallet, setTotalPaymentWallet } =
    useContext(ManualPaymentContext);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return (
          <WalletManualPaymentBills
            initialMoney={initialBillsMoneyWallet}
            actualMoney={actualBills}
            setActualMoney={setActualBills}
            actualMoneyWallet={totalPaymentWallet}
            setActualMoneyWallet={setTotalPaymentWallet}
            totalMoneyWallet={totalPaymentWallet}
          />
        );
      case 'second':
        return (
          <WalletManualPaymentBills
            initialMoney={initialCoinsMoneyWallet}
            actualMoney={actualCoins}
            setActualMoney={setActualCoins}
            actualMoneyWallet={totalPaymentWallet}
            setActualMoneyWallet={setTotalPaymentWallet}
            totalMoneyWallet={totalPaymentWallet}
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

    await innerSaveAddRemove(
      initialCoinsMoneyWallet,
      actualCoins,
      initialBillsMoneyWallet,
      actualBills,
    );
    await getMoney(context);
    toastNotification(
      'SE ACTUALIZO EL DINERO CORRECTAMENTE!',
      'success',
      'success',
    );
    navigation.navigate(SCREEN_NAME.HOME);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#BBB' }}>
        <Text style={{ fontSize: 30, textAlign: 'center' }}>
          Total {formatNum(totalPaymentWallet)}
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
          disabled={isLoading}
          onPress={handleSave}
          style={styles.container}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
});
