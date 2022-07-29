import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../constants';
import { formatAmount as formatAmount } from '../../utils/functions/formatNum';

const Amount = ({ children, showDecimals = null }) => {
  let withDecimals = showDecimals !== null ? showDecimals : null;
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: colors.orange2,
        }}>
        {formatAmount(children, withDecimals, withDecimals)}
      </Text>
    </View>
  );
};

export default Amount;
