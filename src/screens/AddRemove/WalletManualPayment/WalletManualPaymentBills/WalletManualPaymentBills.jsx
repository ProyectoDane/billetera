import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import MoneyObjectAddRemove from '../../components/MoneyObjectAddRemove/MoneyObjectAddRemove';
// import MoneyObjectPayment from '../../components/MoneyObjectPayment/MoneyObjectPayment';

const WalletManualPaymentBills = ({
  initialMoney,
  actualMoney,
  setActualMoney,
  actualMoneyWallet,
  setActualMoneyWallet,
  totalMoneyWallet,
}) => {
  const [money, setMoney] = useState([]);

  useEffect(() => {
    if (totalMoneyWallet !== actualMoneyWallet) {
      setActualMoneyWallet(totalMoneyWallet);
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
    setActualMoneyWallet(actualMoneyWallet + actualMoney[index].amount);
    setActualMoney(actualMoney);
  };

  const handleAdd = (elem, index) => {
    actualMoney[index].quantity = actualMoney[index].quantity - 1;
    setActualMoneyWallet(actualMoneyWallet - actualMoney[index].amount);
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
            <MoneyObjectAddRemove
              key={`ManualPayment ${index} - amount: ${elem.amount}`}
              handleAdd={() => handleAdd(elem, index)}
              handleSub={() => handleSub(elem, index)}
              totalMoneyWallet={totalMoneyWallet}
              comprar={true}
              {...elem}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default WalletManualPaymentBills;
