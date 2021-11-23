import * as React from 'react';
import { useContext, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { TabView } from 'react-native-tab-view';
import AddRemoveWalletBills from '../AddRemoveWalletBills';
import { formatNum } from '../../../../utils/functions/formatNum';
import { AddRemoveContext } from '../../AddRemoveContext';
import SingleButton from '../../../../components/SingleButton';
import { innerSaveAddRemove } from '../../utils';
import getMoney from '../../../../utils/functions/loadMoneyToContext';
import { toastNotification } from '../../../../utils/functions/toastNotifcation';
import { SCREEN_NAME } from '../../../../constants';

export default function AddRemoveWallet({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    actualBills,
    setActualBills,
    actualCoins,
    setActualCoins,
    totalMoneyWallet,
    actualMoneyWallet,
    setActualMoneyWallet,
    initialBillsMoneyWallet,
    initialCoinsMoneyWallet,
  } = useContext(AddRemoveContext);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return (
          <AddRemoveWalletBills
            initialMoney={initialBillsMoneyWallet}
            actualMoney={actualBills}
            setActualMoney={setActualBills}
            actualMoneyWallet={actualMoneyWallet}
            setActualMoneyWallet={setActualMoneyWallet}
            totalMoneyWallet={totalMoneyWallet}
          />
        );
      case 'second':
        return (
          <AddRemoveWalletBills
            initialMoney={initialCoinsMoneyWallet}
            actualMoney={actualCoins}
            setActualMoney={setActualCoins}
            actualMoneyWallet={actualMoneyWallet}
            setActualMoneyWallet={setActualMoneyWallet}
            totalMoneyWallet={totalMoneyWallet}
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
          Total {formatNum(actualMoneyWallet)}
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
          label="GUARDAR"
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
