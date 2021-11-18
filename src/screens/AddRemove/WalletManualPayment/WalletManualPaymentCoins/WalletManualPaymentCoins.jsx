import React, { useContext, useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';

import SingleButton from '../../../../components/SingleButton';
import { colors, SCREEN_NAME } from '../../../../constants';
import { deleteMoneyWallet } from '../../../../dataAccess/Wallet';
import { formatNum } from '../../../../utils/functions/formatNum';
import { toastNotification } from '../../../../utils/functions/toastNotifcation';
import { AddRemoveContext } from '../../AddRemoveContext';
import MoneyObjectPaymentCoins from '../../components/MoneyObjectPaymentCoins';
import { ManualPaymentContext } from '../../ManualPaymentContext';

const WalletManualPaymentCoins = ({ navigation }) => {
  const { totalPaymentWallet, setTotalPaymentWallet } =
    useContext(ManualPaymentContext);

  const {
    actualCoinsMoneyWallet,
    setActualCoinsMoneyWallet,
    setActualCoins,
    actualMoneyWallet,
    setActualMoneyWallet,
    setTotalMoneyWallet,
    setInitialCoinsMoneyWallet,
  } = useContext(AddRemoveContext);

  const totalPayment = totalPaymentWallet;

  const [total, setTotal] = useState(totalPayment);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    setCoins(JSON.parse(JSON.stringify(actualCoinsMoneyWallet)));
  }, []);

  const handleSave = async () => {
    // setIsLoading(true);
    let subMoney = [];
    let moneyLength = coins.length;

    for (let i = 0; moneyLength > i; i++) {
      let initialValue = actualCoinsMoneyWallet[i].quantity;
      let actualValue = coins[i].quantity;

      if (initialValue > actualValue) {
        subMoney.push({
          money_id: coins[i].id,
          quantity: initialValue - actualValue,
        });
      }
    }

    if (subMoney.length) {
      for (let property in subMoney) {
        const { money_id, quantity } = subMoney[property];
        await deleteMoneyWallet(1, money_id, quantity);
      }
    }

    setActualMoneyWallet(actualMoneyWallet - totalPayment);
    setTotalMoneyWallet(actualMoneyWallet - totalPayment);
    setActualCoinsMoneyWallet(coins);
    setActualCoins(coins);
    setInitialCoinsMoneyWallet(coins);
    // setActualCoins(actualCoins);
    toastNotification('SE PAGÓ CORRECTAMENTE!', 'success', 'success');
    navigation.navigate(SCREEN_NAME.HOME);
  };

  return (
    <View
      style={{
        marginBottom: 90,
      }}>
      <View style={{ backgroundColor: '#BBB' }}>
        <Text style={{ fontSize: 30, textAlign: 'center' }}>
          Total {formatNum(total)}
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}>
        {actualCoinsMoneyWallet.map((elem, index) => {
          if (elem.quantity > 0 && elem.amount <= totalPayment) {
            return (
              <MoneyObjectPaymentCoins
                key={`name: ${elem.image} - amount: ${elem.amount}`}
                setCoins={setCoins}
                index={index}
                total={total}
                coins={coins}
                setTotal={setTotal}
                {...elem}
              />
            );
          }
          return null;
        })}
      </ScrollView>
      <View style={{ paddingVertical: 5 }}>
        <SingleButton
          icon="money-bill-wave"
          sizeIcon={22}
          label="PAGAR"
          // isLoading={isLoading}
          // disabled={isLoading}
          onPress={handleSave}
          style={{
            backgroundColor: total !== 0 ? colors.disable : colors.secondary,
            marginTop: 0,
          }}
        />
      </View>
    </View>
  );
};

export default WalletManualPaymentCoins;
