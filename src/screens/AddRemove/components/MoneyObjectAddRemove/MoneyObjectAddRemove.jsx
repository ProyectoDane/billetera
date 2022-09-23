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

  const BUTTON_FONT_SIZE = 24;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingVertical: 5,
      }}>
      <View>
        <ItemMoney {...elem} />
        {comprar ? <Text>{`TENES ${restante} EN LA BILLETERA`}</Text> : null}
      </View>
      <View style={{ width: '35%', marginLeft: 8 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          {/**
           * si comprar es true, logica de comprar, sino logica de addremove
           *
           * ejemplo
           *
           * disabled={comprar? logicaComprar : elem.quantity === 0}
           */}
          <TouchableOpacity
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
                    ? `${colors.primary}60`
                    : colors.primary
                  : elem.quantity === 0
                  ? `${colors.primary}60`
                  : colors.primary
              }
            />
          </TouchableOpacity>

          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '600',
                width: 45,
              }}>
              {`${total}`.padStart(2, '00')}
            </Text>
          </View>

          {/**
           * si comprar es true, logica de comprar, sino logica de addremove
           *
           * ejemplo
           *
           * disabled={comprar? logicaComprar : false}
           */}
          <TouchableOpacity
            disabled={comprar ? restante === 0 || elem.totalMoneyWallet <= 0 : false}
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
                    ? `${colors.primary}60`
                    : colors.primary
                  : colors.primary
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MoneyObjectAddRemove;
