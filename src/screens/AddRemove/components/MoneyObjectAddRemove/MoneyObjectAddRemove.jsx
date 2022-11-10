import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import ItemMoney from '../ItemMoney';
import { colors } from '../../../../constants';

export const MoneyObjectAddRemove = ({ comprar = false, ...elem }) => {
  const [restante, setRestante] = useState(elem.quantity);
  const [total, setTotal] = useState(comprar ? 0 : elem.quantity);

  const add = () => {
    setTotal(total + 1);
    setRestante(restante - 1);
  };
  const sub = () => {
    setTotal(total - 1);
    setRestante(restante + 1);
  };

  const BUTTON_FONT_SIZE = 40;

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 5,        
      }}>
      <View style={{ marginRight: 15 }}>
        <ItemMoney {...elem} />
        {comprar ? <Text>{`TENES ${restante} EN LA BILLETERA`}</Text> : null}
      </View>
      <View>        
        <View
          style={{
            flex: 1,
            flexDirection: 'row',            
            alignItems: 'center'
          }}>
          {/**
           * si comprar es true, logica de comprar, sino logica de addremove
           *
           * ejemplo
           *
           * disabled={comprar? logicaComprar : elem.quantity === 0}
           */}
          <TouchableOpacity
            style={{ marginRight: 0 }}
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
                    ? colors.softCyan
                    : colors.skyBlue
                  : elem.quantity === 0
                  ? colors.softCyan
                  : colors.skyBlue
              }
            />
          </TouchableOpacity>

          <Text
            style={{              
              fontSize: BUTTON_FONT_SIZE,
              paddingHorizontal: 10
            }}>
            {total}
          </Text>
          {/**
           * si comprar es true, logica de comprar, sino logica de addremove
           *
           * ejemplo
           *
           * disabled={comprar? logicaComprar : false}
           */}
          <TouchableOpacity
            disabled={
              comprar ? restante === 0 || elem.totalMoneyWallet <= 0 : false
            }
            onPress={() => {
              add();
              elem.handleAdd();
            }}>
            <AntDesign
              name="pluscircle"
              size={BUTTON_FONT_SIZE}
              color={
                comprar
                  ? restante === 0 || elem.totalMoneyWallet <= 0
                    ? colors.skyBlue
                    : colors.skyBlue
                  : colors.skyBlue
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MoneyObjectAddRemove;
