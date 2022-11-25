import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import AddRemoveMoneyItem from './AddRemoveMoneyItem';

const AddRemoveMoney = ({moneyArray, setCurrentMoney, setTotal}) => {
  const [moneyMap, setMoneyMap] = useState({});
  const moneyDict = moneyArray.reduce((dict, {image, quantity}) => {
    dict[image] = quantity;
    return dict;
  }, {});

  useEffect(() => {
    setMoneyMap(moneyDict);
  }, [moneyArray]);

  const handleAdd = useCallback((key, amount) => {
    setMoneyMap((prevMoney) => ({...prevMoney, [key]: prevMoney[key] + 1}));
    setCurrentMoney((prevMoney) =>
      prevMoney.map((item) => (item.image === key ? {...item, quantity: item.quantity + 1} : item)),
    );
    setTotal((prevTotal) => prevTotal + amount);
  }, []);

  const handleSub = useCallback((key, amount) => {
    setMoneyMap((prevMoney) => ({...prevMoney, [key]: prevMoney[key] - 1}));
    setCurrentMoney((prevMoney) =>
      prevMoney.map((item) => (item.image === key ? {...item, quantity: item.quantity - 1} : item)),
    );
    setTotal((prevTotal) => prevTotal - amount);
  }, []);

  return (
    <View>
      <ScrollView contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 10}}>
        {moneyArray.map((item) => {
          return (
            <AddRemoveMoneyItem
              key={`name: ${item.image} - amount: ${item.amount} - ${item.id}`}
              onAdd={handleAdd}
              onSub={handleSub}
              quantity={moneyMap[item.image]}
              image={item.image}
              amount={item.amount}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AddRemoveMoney;
