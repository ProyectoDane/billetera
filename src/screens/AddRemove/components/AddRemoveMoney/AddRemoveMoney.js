import React, {useEffect, useState} from 'react';
import { ScrollView, View } from 'react-native';
import MoneyObjectAddRemove from '../MoneyObjectAddRemove/MoneyObjectAddRemove';

const AddRemoveMoney = ({
  initialMoney,
  actualMoney,
  setActualMoney,
  actualMoneyWallet, //number: total dinero en la instancia
  setActualMoneyWallet, //number: total dinero en la BD
  totalMoneyWallet,
  isBuyFlow,
}) => {
  const [money, setMoney] = useState([]);

  useEffect(() => {
    if (totalMoneyWallet !== actualMoneyWallet) {
      setActualMoneyWallet(totalMoneyWallet);
    }
    if (isBuyFlow) {
      //solo nos quedamos con los elementos que tenemos en la billetera/ahorros
      setActualMoney(
          JSON.parse(
              JSON.stringify(initialMoney.filter((elem) => elem.quantity > 0)),
          ),
      );
    } else {
      //todos los billetes posibles
      setActualMoney(JSON.parse(JSON.stringify(initialMoney)));
    }

    setMoney(
        JSON.parse(
            JSON.stringify(initialMoney.filter((elem) => elem.quantity > 0)),
        ),
    );
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
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}>
        { (isBuyFlow? money : actualMoney).map((elem, index) => {
          return (
            <MoneyObjectAddRemove
              key={`name: ${elem.image} - amount: ${elem.amount} - ${elem.id}`}
              handleAdd={() => isBuyFlow ? handleSub(elem, index) : handleAdd(elem, index)}
              handleSub={() => isBuyFlow ? handleAdd(elem, index) : handleSub(elem, index)}
              comprar={isBuyFlow}
              {...elem}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AddRemoveMoney;
