import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { colors } from '../../../constants';
import styles from './styles';

const Button = ({ title, icon, mode = 'contained', onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View
        style={[
          styles.viewContainer,
          {
            backgroundColor: mode === 'contained' ? colors.skyBlue : colors.white,
            borderColor: mode === 'outlined' ? colors.skyBlue : undefined,
            borderWidth: mode === 'outlined' ? 2 : 0,
          },
        ]}>
        <Text style={[styles.text, { color: mode === 'contained' ? colors.white : colors.skyBlue }]}>{title}</Text>
        {icon && (
          <FontAwesome5
            style={styles.icon}
            name={icon}
            size={23}
            color={mode === 'contained' ? colors.white : colors.skyBlue}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
