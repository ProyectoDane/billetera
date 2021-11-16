import React, { useContext, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import ItemMoney from '../ItemMoney';
import SingleButton from '../../../../components/SingleButton';
import { AddRemoveContext } from '../../AddRemoveContext';
import {
  deleteMoneyWallet,
  insertMoneyToWallet,
} from '../../../../dataAccess/Wallet';
import { SCREEN_NAME } from '../../../../constants';
import { formatNum } from '../../../../utils/functions/formatNum';
import { toastNotification } from '../../../../utils/functions/toastNotifcation';

const MoneyObject = (elem) => {
  const [total, setTotal] = useState(elem.quantity);

  const add = () => setTotal(total + 1);
  const sub = () => setTotal(total - 1);

  const BUTTON_FONT_SIZE = 40;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 3,
      }}>
      <View style={{ marginRight: 15 }}>
        <ItemMoney {...elem} />
      </View>

      <TouchableOpacity
        // style={{flex: 2, justifyContent: 'center', flexDirection: 'column', backgroundColor: 'blue'}}
        disabled={elem.quantity === 0}
        onPress={() => {
          sub();
          elem.handleSub();
        }}>
        <AntDesign
          name="minuscircle"
          size={BUTTON_FONT_SIZE}
          color={elem.quantity === 0 ? 'grey' : 'red'}
        />
      </TouchableOpacity>
      <Text
        style={{
          textAlign: 'center',
          fontSize: BUTTON_FONT_SIZE,
          paddingHorizontal: 5,
          flex: 1,
        }}>
        {total}
      </Text>
      <TouchableOpacity
        onPress={() => {
          add();
          elem.handleAdd();
        }}>
        <AntDesign name="pluscircle" size={BUTTON_FONT_SIZE} color="green" />
      </TouchableOpacity>
    </View>
  );
};

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
            <MoneyObject
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
