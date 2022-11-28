import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import AddRemoveMoneyItem from './AddRemoveMoneyItem';

const AddRemoveMoney = ({money, setActual, setTotal, isPayment = false}) => {
  const [moneyMap, setMoneyMap] = useState({});
  const moneyItems = isPayment ? money.filter((i) => i.quantity > 0) : money;
  const moneyDict = money.reduce((dict, {image, quantity}) => {
    dict[image] = isPayment ? 0 : quantity;
    return dict;
  }, {});

  useEffect(() => {
    setMoneyMap(moneyDict);
  }, [money]);

  const handleAdd = useCallback((key, amount) => {
    setMoneyMap((prevMoney) => ({...prevMoney, [key]: prevMoney[key] + 1}));
    setActual((prevMoney) =>
      prevMoney.map((item) => (item.image === key ? {...item, quantity: item.quantity + (isPayment ? -1 : 1)} : item)),
    );
    setTotal((prevTotal) => prevTotal + (isPayment ? -amount : amount));
  }, []);

  const handleSub = useCallback((key, amount) => {
    setMoneyMap((prevMoney) => ({...prevMoney, [key]: prevMoney[key] - 1}));
    setActual((prevMoney) =>
      prevMoney.map((item) => (item.image === key ? {...item, quantity: item.quantity + (isPayment ? 1 : -1)} : item)),
    );
    setTotal((prevTotal) => prevTotal + (isPayment ? amount : -amount));
  }, []);

  return (
    <View>
      <ScrollView contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 10}}>
        {moneyItems.map((item) => {
          return (
            <AddRemoveMoneyItem
              key={`name: ${item.image} - amount: ${item.amount} - ${item.id}`}
              onAdd={handleAdd}
              onSub={handleSub}
              quantity={moneyMap[item.image]}
              image={item.image}
              amount={item.amount}
              isPayment={isPayment}
              remaining={item.quantity - moneyMap[item.image]}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AddRemoveMoney;
