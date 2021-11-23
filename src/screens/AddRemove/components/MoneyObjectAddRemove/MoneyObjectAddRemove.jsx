import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import ItemMoney from '../ItemMoney';

export const MoneyObjectAddRemove = ({ comprar = false, ...elem }) => {
  const [total, setTotal] = useState(comprar ? 0 : elem.quantity);

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
      <View style={{ marginRight: 15 }}>
        <ItemMoney {...elem} />
        {/**
                PONER STOCK ACTUAL Y ACTUALIZADO DEL BILLETE


                OPCIONAL SI ES DE COMPRAR

                comprar?
                <Text>Soy un stock de prueba</Text> :
                null
            */}
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
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          {/**
           * si comprar es true, logica de comprar, sino logica de addremove
           *
           * ejemplo
           *
           * disabled={comprar? logicaComprar : elem.quantity === 0}
           */}
          <TouchableOpacity
            style={{ marginRight: 10 }}
            disabled={comprar ? total === 0 : elem.quantity === 0}
            onPress={() => {
              sub();
              elem.handleSub();
            }}>
            <AntDesign
              name="minuscircle"
              size={BUTTON_FONT_SIZE}
              color={
                comprar
                  ? total === 0
                    ? 'grey'
                    : 'red'
                  : elem.quantity === 0
                  ? 'grey'
                  : 'red'
              }
            />
          </TouchableOpacity>
          {/**
           * si comprar es true, logica de comprar, sino logica de addremove
           *
           * ejemplo
           *
           * disabled={comprar? logicaComprar : false}
           */}
          <TouchableOpacity
            onPress={() => {
              add();
              elem.handleAdd();
            }}>
            <AntDesign
              name="pluscircle"
              size={BUTTON_FONT_SIZE}
              color="green"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MoneyObjectAddRemove;
