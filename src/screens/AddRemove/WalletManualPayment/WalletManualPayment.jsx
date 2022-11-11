import React, {useContext, useState} from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';

import SingleButton from '../../../components/SingleButton';
import {colors, SCREEN_NAME} from '../../../constants';
import {formatNum} from '../../../utils/functions/formatNum';
import getMoney from '../../../utils/functions/loadMoneyToContext';
import {toastNotification} from '../../../utils/functions/toastNotifcation';
import {AddRemoveContext} from '../AddRemoveContext';
import {ManualPaymentContext} from '../ManualPaymentContext';
import {innerSaveManualPayment} from '../utils';
import WalletManualPaymentBills
  from './WalletManualPaymentBills/WalletManualPaymentBills';
import {FontAwesome5} from "@expo/vector-icons";
import { styles as commonStyles } from '../commonAddRemoveStyles';
import {styles as myWishesStyles} from "../../MyWishes/styles";
import {shadow} from "../../../constants/styles";
import { default as cardStyles} from "../../../components/Card/styles";
import {styles as itemWishStyles} from "../../MyWishes/components/ItemWish/styles";
import {styles as WishesStyles} from "../../WishesHome/styles";

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

  const [totalFreeze] = useState(() => totalPaymentWallet);

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

    await innerSaveManualPayment( context.currentUser.id,
      initialCoinsMoneyWallet,
      actualCoins,
      initialBillsMoneyWallet,
      actualBills,
    );
    await getMoney(context);

    if (totalPaymentWallet === 0) {
      toastNotification(
        'SE REALIZO EL PAGO CORRECTAMENTE!',
        'success',
        'success',
      );
    } else {
      toastNotification(
        `ACORDATE DE CARGAR TU VUELTO DE ${formatNum(
          Math.abs(totalPaymentWallet),
        )} EN LA BILLETERA !`,
        'info',
        'info',
      );
    }
    navigation.navigate(SCREEN_NAME.HOME);
  };

  const getTabBarIcon = (props) => {
    const { route } = props;
    if (route.key === 'first') {
      return <FontAwesome5 name="money-bill-wave" size={20} color={colors.primary} />;
    } else {
      return <FontAwesome5 name="coins" size={20} color={colors.primary} />;
    }
  };



  return (
    <View style={{ flex: 1 }}>
      <View
          style={{
            ...cardStyles.card,
            margin: 10,
            width: "auto",
            flex: 1,
            flexBasis: 60,
            paddingVertical: 10,
            // flexShrink: 1,
            flexGrow: 0,
            ...shadow,
          }}>
        <View style={{...itemWishStyles.itemTextRow}}>
          <Text style={{...itemWishStyles.itemLabel}}>TOTAL</Text>
          <Text style={{...itemWishStyles.valueItem}}>{formatNum(totalFreeze)}</Text>
        </View>
        {totalPaymentWallet > 0 ? (
          <View style={{...itemWishStyles.itemTextRow}}>
            <Text style={{...itemWishStyles.itemLabel}}>TE FALTA PAGAR</Text>
            <Text style={{...itemWishStyles.valueItem}}>{formatNum(totalPaymentWallet)}</Text>
          </View>
        ) : (
        totalPaymentWallet === 0 ? (
          <View style={{...itemWishStyles.itemTextRow}}>
            <Text style={{...itemWishStyles.itemLabel}}>PAGASTE JUSTO</Text>
          </View>
        ) : (
            <View style={{...itemWishStyles.itemTextRow}}>
              <Text style={{...itemWishStyles.itemLabel}}>TU VUELTO ES </Text>
              <Text style={{...itemWishStyles.valueItem,
                ...itemWishStyles.valueItemSpecial}}>{formatNum(Math.abs(totalPaymentWallet))}</Text>
            </View>
        )
        ) }
      </View>

      <View style={{...cardStyles.card, ...shadow, flex: 15, margin: 10, width: "auto", flexGrow: 1,}}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => (
              <TabBar
                  {...props}
                  indicatorStyle={commonStyles.indicatorStyle}
                  style={{ backgroundColor: colors.white}}
                  renderIcon={(props) => getTabBarIcon(props)}
                  tabStyle={commonStyles.tabStyle}
                  labelStyle={commonStyles.tabLabel}
              />)}

        />
      </View>
      <View
          style={{
            ...myWishesStyles.bottomButtonContainer,
            paddingVertical: 0,
          }}>
        <SingleButton
          icon="money-bill-wave"
          sizeIcon={22}
          label="CONFIRMAR"
          isLoading={isLoading}
          disabled={
            isLoading || (totalPaymentWallet !== 0 && totalPaymentWallet > 0)
          }
          onPress={handleSave}
          style={{
            width: "100%",
            backgroundColor:
              totalPaymentWallet !== 0 && totalPaymentWallet > 0
                ? colors.disable
                : colors.primary,
          }}
        />

      </View>
    </View>
  );
}
