import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

import ItemMoney from '../ItemMoney';

export const MoneyObjectAddRemove = (elem) => {
  const [total, setTotal] = useState(elem.quantity);

  const add = () => setTotal(total + 1);
  const sub = () => setTotal(total - 1);

  const BUTTON_FONT_SIZE = 40;

  return (
      <View
          style={{
              flex: 1,
              justifyContent: 'space-around',
              flexDirection: 'row',
              paddingVertical: 5,
          }}>
          <View style={{marginRight: 15}}>
              <ItemMoney {...elem} />
          </View>
          <View>
              <View>
                  <Text
                      style={{
                          textAlign: 'center',
                          fontSize: BUTTON_FONT_SIZE,
                          paddingHorizontal: 5,
                          flex: 1,
                      }}>
                      {total}
                  </Text>

              </View>
              <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
              }}>

                  <TouchableOpacity
                      style={{marginRight: 10}}
                      disabled={elem.quantity === 0}
                      onPress={() => {
                          sub();
                          elem.handleSub();
                      }}>
                      <AntDesign
                          name="minuscircle"
                          size={BUTTON_FONT_SIZE}
                          color={elem.quantity === 0 ? 'grey' : 'red'}
                      />
                  </TouchableOpacity>

                  <TouchableOpacity
                      onPress={() => {
                          add();
                          elem.handleAdd();
                      }}>
                      <AntDesign name="pluscircle" size={BUTTON_FONT_SIZE}
                                 color="green"/>
                  </TouchableOpacity>
              </View>
          </View>
      </View>
  );
};

export default MoneyObjectAddRemove;
