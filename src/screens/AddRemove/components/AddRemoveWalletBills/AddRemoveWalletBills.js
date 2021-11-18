import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import SingleButton from '../../../../components/SingleButton';
import { AddRemoveContext } from '../../AddRemoveContext';
import {
  deleteMoneyWallet,
  insertMoneyToWallet,
} from '../../../../dataAccess/Wallet';
import { SCREEN_NAME } from '../../../../constants';
import { formatNum } from '../../../../utils/functions/formatNum';
import { toastNotification } from '../../../../utils/functions/toastNotifcation';
import MoneyObjectAddRemove from '../MoneyObjectAddRemove/MoneyObjectAddRemove';

const AddRemoveWalletBills = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    actualBills,
    setActualBills,
    actualCoins,
    setActualCoins,
    totalMoneyWallet,
    setTotalMoneyWallet,
    actualMoneyWallet,
    setActualMoneyWallet,
    initialBillsMoneyWallet,
    setInitialBillsMoneyWallet,
  } = useContext(AddRemoveContext);

  const [bills, setBills] = useState(actualBills);

  useEffect(() => {
    if (totalMoneyWallet !== actualMoneyWallet) {
      setActualMoneyWallet(totalMoneyWallet);
    }
    setActualBills(JSON.parse(JSON.stringify(initialBillsMoneyWallet)));
    setBills(JSON.parse(JSON.stringify(initialBillsMoneyWallet)));
  }, []);

  const handleAdd = (elem, index) => {
    let newBills = bills;
    newBills[index].quantity = newBills[index].quantity + 1;
    setActualMoneyWallet(actualMoneyWallet + newBills[index].amount);
    setBills(newBills);
  };

  const handleSub = (elem, index) => {
    let newBills = bills;
    newBills[index].quantity = newBills[index].quantity - 1;
    setActualMoneyWallet(actualMoneyWallet - newBills[index].amount);
    setBills(newBills);
  };

  const handleSave = async () => {
    setIsLoading(true);
    let addMoney = [];
    let subMoney = [];
    let moneyLength = bills.length;

    for (let i = 0; moneyLength > i; i++) {
      let initialValue = initialBillsMoneyWallet[i].quantity;
      let actualValue = bills[i].quantity;

      if (initialValue > actualValue) {
        subMoney.push({
          money_id: bills[i].id,
          quantity: initialValue - actualValue,
        });
      }
      if (actualValue > initialValue) {
        addMoney.push({
          money_id: bills[i].id,
          quantity: actualValue - initialValue,
        });
      }
    }

    if (addMoney.length) {
      for (let property in addMoney) {
        const { money_id, quantity } = addMoney[property];
        await insertMoneyToWallet(1, money_id, quantity);
      }
    }

    if (subMoney.length) {
      for (let property in subMoney) {
        const { money_id, quantity } = subMoney[property];
        await deleteMoneyWallet(1, money_id, quantity);
      }
    }

    setActualMoneyWallet(actualMoneyWallet);
    setTotalMoneyWallet(actualMoneyWallet);
    setInitialBillsMoneyWallet(bills);
    setBills(bills);
    setActualBills(bills);
    setActualCoins(actualCoins);
    toastNotification(
      'SE ACTUALIZO EL DINERO CORRECTAMENTE!',
      'success',
      'success',
    );
    navigation.navigate(SCREEN_NAME.HOME);
  };

  return (
    <View
      style={{
        marginBottom: 90,
      }}>
      <View style={{ backgroundColor: '#BBB' }}>
        <Text style={{ fontSize: 30, textAlign: 'center' }}>
          Total {formatNum(actualMoneyWallet)}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}>
        {bills.map((elem, index) => {
          return (
            <MoneyObjectAddRemove
              key={`name: ${elem.image} - amount: ${elem.amount}`}
              handleAdd={() => handleAdd(elem, index)}
              handleSub={() => handleSub(elem, index)}
              {...elem}
            />
          );
        })}
      </ScrollView>
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
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
});

export default AddRemoveWalletBills;
