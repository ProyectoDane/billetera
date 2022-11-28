import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

import {colors} from '../../../constants';
import ItemMoney from '../components/ItemMoney';

const BUTTON_FONT_SIZE = 25;
const QUANTITY_FONT_SIZE = 20;

export const AddRemoveMoneyItem = React.memo(
  ({quantity, onSub, onAdd, image, amount, isPayment = false, remaining = null}) => {
    const handleAdd = () => onAdd(image, amount);
    const handleSub = () => onSub(image, amount);
    const disabledAdd = isPayment && remaining <= 0;
    const disabledSub = quantity === 0;
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 5}}>
        <View style={{marginRight: 15, flex: 6}}>
          <ItemMoney image={image} style={{width: 'auto'}} />
          {isPayment && (
            <Text
              style={{color: remaining === 0 ? colors.orange2 : colors.newBlack}}
            >{`TENES ${remaining} EN LA BILLETERA`}</Text>
          )}
        </View>
        <View style={{flex: 3, alignSelf: 'center'}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity style={{marginRight: 0}} disabled={disabledSub} onPress={handleSub}>
              <AntDesign
                name="minuscircle"
                size={BUTTON_FONT_SIZE}
                color={disabledSub ? colors.softCyan : colors.skyBlue}
              />
            </TouchableOpacity>
            <Text style={{fontSize: QUANTITY_FONT_SIZE, paddingHorizontal: 10, fontVariant: ['tabular-nums']}}>
              {quantity}
            </Text>
            <TouchableOpacity disabled={disabledAdd} onPress={handleAdd}>
              <AntDesign
                name="pluscircle"
                size={BUTTON_FONT_SIZE}
                color={disabledAdd ? colors.softCyan : colors.skyBlue}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  },
);

export default AddRemoveMoneyItem;
