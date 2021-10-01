import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { colors } from '../../../constants';
import { styles } from './styles';

const CalcBtn = ({ style, styleText, button, onPress, isNumber }) => {
  return (
    <TouchableOpacity
      key={button}
      style={
        isNumber
          ? {
              ...styles.button,
              backgroundColor:
                typeof button === 'number' ? colors.white : colors.softGray,
              minWidth: '36%',
            }
          : { ...styles.button, ...style }
      }
      onPress={onPress}>
      <Text style={{ ...styles.textButton, ...styleText }}>{button}</Text>
    </TouchableOpacity>
  );
};

export default CalcBtn;
