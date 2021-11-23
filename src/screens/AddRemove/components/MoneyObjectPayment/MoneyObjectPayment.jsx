import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ItemMoney from '../ItemMoney/ItemMoney';

const MoneyObjectPayment = (elem) => {
  console.log('elem>>>>>>>>>>>', elem);
  const totalStock = elem.quantity;
  const [total, setTotal] = useState(elem.quantity);
  const { index, bills, setBills, total: total2, setTotal: setTotal2 } = elem;

  const add = () => {
    setTotal(total + 1);
    bills[index].quantity = bills[index].quantity + 1;
    setTotal2(total2 + bills[index].amount);
    setBills(bills);
  };

  const sub = () => {
    setTotal(total - 1);
    bills[index].quantity = bills[index].quantity - 1;
    setTotal2(total2 - bills[index].amount);
    setBills(bills);
  };

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
        disabled={total === 0 || total2 < elem.amount}
        onPress={() => {
          sub();
        }}>
        <AntDesign
          name="minuscircle"
          size={BUTTON_FONT_SIZE}
          color={total === 0 || total2 < elem.amount ? 'grey' : 'red'}
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
        disabled={total === totalStock}
        onPress={() => {
          add();
        }}>
        <AntDesign
          name="pluscircle"
          size={BUTTON_FONT_SIZE}
          color={total === totalStock ? 'grey' : 'green'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MoneyObjectPayment;
