import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../../../constants';
import { styles } from './styles';

const CalcBtn = ({
  arrowBackIcon,
  style,
  styleText,
  button,
  onPress,
  isNumber,
}) => {
  return (
    <TouchableOpacity
      key={button}
      style={{
          ...styles.button
          , ...(!isNumber ? {...styles.operationButton} : {})
          , ...style
      }}
      onPress={onPress}>
      {arrowBackIcon ? (
        <Ionicons name="arrow-back-outline" size={30} color={colors.darkGray} />
      ) : (
        <Text style={{ ...styles.textButton, ...styleText }}>{button}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CalcBtn;
