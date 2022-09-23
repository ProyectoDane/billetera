import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import MoneyObjectAddRemove from '../MoneyObjectAddRemove/MoneyObjectAddRemove';

const AddRemoveMoney = ({
  initialMoney,
  actualMoney,
  setActualMoney,
  actualMoneyWallet, //number: total dinero en la instancia
  setActualMoneyWallet, //number: total dinero en la BD
  totalMoneyWallet,
}) => {
  useEffect(() => {
    if (totalMoneyWallet !== actualMoneyWallet) {
      setActualMoneyWallet(totalMoneyWallet);
    }
    setActualMoney(JSON.parse(JSON.stringify(initialMoney)));
  }, []);

  const handleAdd = (elem, index) => {
    actualMoney[index].quantity = actualMoney[index].quantity + 1;
    setActualMoneyWallet(actualMoneyWallet + actualMoney[index].amount);
    setActualMoney(actualMoney);
  };

  const handleSub = (elem, index) => {
    actualMoney[index].quantity = actualMoney[index].quantity - 1;
    setActualMoneyWallet(actualMoneyWallet - actualMoney[index].amount);
    setActualMoney(actualMoney);
  };

  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 5,
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

export default AddRemoveMoney;
