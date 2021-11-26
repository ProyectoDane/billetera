import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import MoneyObjectAddRemove from '../MoneyObjectAddRemove/MoneyObjectAddRemove';

const AddRemoveWalletBills = ({
  initialMoney,
  actualMoney,
  setActualMoney,
  actualMoneySavings,
  setActualMoneySavings,
  totalMoneySavings,
}) => {
  useEffect(() => {
    if (totalMoneySavings !== actualMoneySavings) {
      setActualMoneySavings(totalMoneySavings);
    }
    setActualMoney(JSON.parse(JSON.stringify(initialMoney)));
  }, []);

  const handleAdd = (elem, index) => {
    actualMoney[index].quantity = actualMoney[index].quantity + 1;
    setActualMoneySavings(actualMoneySavings + actualMoney[index].amount);
    setActualMoney(actualMoney);
  };

  const handleSub = (elem, index) => {
    actualMoney[index].quantity = actualMoney[index].quantity - 1;
    setActualMoneySavings(actualMoneySavings - actualMoney[index].amount);
    setActualMoney(actualMoney);
  };

  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}>
        {actualMoney.map((elem, index) => {
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
    </View>
  );
};

export default AddRemoveWalletBills;
