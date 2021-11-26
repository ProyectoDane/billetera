import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import MoneyObjectAddRemoveSavings from '../../components/MoneyObjectAddRemoveSavings/MoneyObjectAddRemoveSavings';

const SavingsManualPaymentBills = ({
  initialMoney,
  actualMoney,
  setActualMoney,
  actualMoneySavings,
  setActualMoneySavings,
  totalMoneySavings,
}) => {
  const [money, setMoney] = useState([]);

  useEffect(() => {
    if (totalMoneySavings !== actualMoneySavings) {
      setActualMoneySavings(totalMoneySavings);
    }
    setActualMoney(
      JSON.parse(
        JSON.stringify(initialMoney.filter((elem) => elem.quantity > 0)),
      ),
    );
    setMoney(
      JSON.parse(
        JSON.stringify(initialMoney.filter((elem) => elem.quantity > 0)),
      ),
    );
  }, []);

  const handleSub = (elem, index) => {
    actualMoney[index].quantity = actualMoney[index].quantity + 1;
    setActualMoneySavings(actualMoneySavings + actualMoney[index].amount);
    setActualMoney(actualMoney);
  };

  const handleAdd = (elem, index) => {
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
        {money.map((elem, index) => {
          return (
            <MoneyObjectAddRemoveSavings
              key={`ManualPayment ${index} - amount: ${elem.amount}`}
              handleAdd={() => handleAdd(elem, index)}
              handleSub={() => handleSub(elem, index)}
              totalMoneySavings={totalMoneySavings}
              comprar={true}
              {...elem}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SavingsManualPaymentBills;
