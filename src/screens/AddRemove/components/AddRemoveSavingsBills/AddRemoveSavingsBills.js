import React, { useState, useContext, useEffect } from 'react';
import { Text, View, ScrollView, Button, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import ItemMoney from '../ItemMoney';
import { AddRemoveContext } from '../../AddRemoveContext';
import {
  insertMoneyToSavings,
  deleteMoneySavings,
} from '../../../../dataAccess/Savings';

const MoneyObject = (elem) => {
  const [total, setTotal] = useState(elem.quantity);

  const add = () => setTotal(total + 1);
  const sub = () => setTotal(total - 1);

  return (
    <View styles={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
      <Text>{total + ' - dj'} </Text>
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

const AddRemoveSavingsBills = () => {
  const {
    actualBillsSavings,
    setActualBillsSavings,
    setActualCoinsSavings,
    actualCoinsSavings,
    totalMoneySavings,
    setTotalMoneySavings,
    actualMoneySavings,
    setActualMoneySavings,
    initialBillsMoneySavings,
    setInitialBillsMoneySavings,
  } = useContext(AddRemoveContext);

  useEffect(() => {
    if (totalMoneySavings !== actualMoneySavings) {
      setActualMoneySavings(totalMoneySavings);
    }
    setActualBillsSavings(JSON.parse(JSON.stringify(initialBillsMoneySavings)));
  }, []);

  const handleAdd = (elem, index) => {
    let newBills = actualBillsSavings;
    newBills[index].quantity = newBills[index].quantity + 1;
    setActualMoneySavings(actualMoneySavings + newBills[index].amount);
    setActualBillsSavings(newBills);
  };

  const handleSub = (elem, index) => {
    let newBills = actualBillsSavings;
    newBills[index].quantity = newBills[index].quantity - 1;
    setActualMoneySavings(actualMoneySavings - newBills[index].amount);
    setActualBillsSavings(newBills);
  };

  const handleSave = async () => {
    let addMoney = [];
    let subMoney = [];
    let moneyLength = actualBillsSavings.length;

    for (let i = 0; moneyLength > i; i++) {
      let initialValue = initialBillsMoneySavings[i].quantity;
      let actualValue = actualBillsSavings[i].quantity;

      if (initialValue > actualValue) {
        subMoney.push({
          money_id: actualBillsSavings[i].id,
          quantity: initialValue - actualValue,
        });
      }
      if (actualValue > initialValue) {
        addMoney.push({
          money_id: actualBillsSavings[i].id,
          quantity: actualValue - initialValue,
        });
      }
    }

    if (addMoney.length) {
      for (let property in addMoney) {
        const { money_id, quantity } = addMoney[property];
        await insertMoneyToSavings(1, money_id, quantity);
      }
    }

    if (subMoney.length) {
      for (let property in addMoney) {
        const { money_id, quantity } = addMoney[property];
        await deleteMoneySavings(1, money_id, quantity);
      }
    }

    setActualMoneySavings(actualMoneySavings);
    setTotalMoneySavings(actualMoneySavings);
    setInitialBillsMoneySavings(actualBillsSavings);
    setActualBillsSavings(actualBillsSavings);
    setActualCoinsSavings(actualCoinsSavings);
  };

  return (
    <View style={{ marginBottom: 60 }}>
      <View>
        <Text>TOTAL ${actualMoneySavings}</Text>
        <Button title="Guardar" onPress={() => handleSave()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}>
        {actualBillsSavings.map((elem, index) => {
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
    </View>
  );
};

export default AddRemoveSavingsBills;
