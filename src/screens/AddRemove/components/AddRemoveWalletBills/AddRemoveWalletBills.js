import React, { useState, useContext, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import ItemMoney from '../ItemMoney';
import SingleButton from "../../../../components/SingleButton";
import { AddRemoveContext } from '../../AddRemoveContext';
import {
  insertMoneyToWallet,
  deleteMoneyWallet,
} from '../../../../dataAccess/Wallet';
import { SCREEN_NAME } from '../../../../constants';
import { formatNum } from '../../../../utils/functions/formatNum';
import { toastNotification } from '../../../../utils/functions/toastNotifcation';

const MoneyObject = (elem) => {
  const [total, setTotal] = useState(elem.quantity);

  const add = () => setTotal(total + 1);
  const sub = () => setTotal(total - 1);

  return (
    <View>
      <ItemMoney {...elem} />
      <TouchableOpacity
        disabled={elem.quantity === 0}
        onPress={() => {
          sub();
          elem.handleSub();
        }}>
        <AntDesign
          name="minuscircle"
          size={20}
          color={elem.quantity === 0 ? 'grey' : 'red'}
        />
      </TouchableOpacity>
      <Text>{total}</Text>
      <TouchableOpacity
        onPress={() => {
          add();
          elem.handleAdd();
        }}>
        <AntDesign name="pluscircle" size={20} color="green" />
      </TouchableOpacity>
    </View>
  );
};

const AddRemoveWalletBills = ({navigation}) => {
  const [isLoading,setIsLoading] = useState(false)
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

  useEffect(() => {
    if (totalMoneyWallet !== actualMoneyWallet) {
      setActualMoneyWallet(totalMoneyWallet);
    }
    setActualBills(JSON.parse(JSON.stringify(initialBillsMoneyWallet)));
  }, []);

  const handleAdd = (elem, index) => {
    let newBills = actualBills;
    newBills[index].quantity = newBills[index].quantity + 1;
    setActualMoneyWallet(actualMoneyWallet + newBills[index].amount);
    setActualBills(newBills);
  };

  const handleSub = (elem, index) => {
    let newBills = actualBills;
    newBills[index].quantity = newBills[index].quantity - 1;
    setActualMoneyWallet(actualMoneyWallet - newBills[index].amount);
    setActualBills(newBills);
  };

  const handleSave = async () => {
    setIsLoading(true)
    let addMoney = [];
    let subMoney = [];
    let moneyLength = actualBills.length;

    for (let i = 0; moneyLength > i; i++) {
      let initialValue = initialBillsMoneyWallet[i].quantity;
      let actualValue = actualBills[i].quantity;

      if (initialValue > actualValue) {
        subMoney.push({
          money_id: actualBills[i].id,
          quantity: initialValue - actualValue,
        });
      }
      if (actualValue > initialValue) {
        addMoney.push({
          money_id: actualBills[i].id,
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
    setInitialBillsMoneyWallet(actualBills);
    setActualBills(actualBills);
    setActualCoins(actualCoins);
    toastNotification(
      'SE ACTUALIZO EL DINERO CORRECTAMENTE!',
      'success',
      'success',
    );
    navigation.navigate(SCREEN_NAME.HOME)
  };

  return (
    <View style={{ marginBottom: 60 }}>
      <View>
        <Text>Total {formatNum(actualMoneyWallet)}</Text>
      </View>

      <ScrollView>
        {actualBills.map((elem, index) => {
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
      <View>
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