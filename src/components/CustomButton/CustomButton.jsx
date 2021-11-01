import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './styles';
import { colors, SCREEN_NAME } from '../../constants/index';

const CustomButton = ({
  icon,
  sizeIcon,
  colorIcon = 'white',
  label,
  color = 'primary',
  amount,
  onPress,
  from
}) => {

  const navigation = useNavigation();
  const buttonColor = {
    backgroundColor: colors[color],
  };

  return (
    <TouchableOpacity onPress={onPress} style={[buttonColor, styles.button]}>
      <View style={styles.iconTextGroup}>
        <View style={styles.text}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.amount}>${amount}</Text>
        </View>
        <View style={styles.icon}>
          <FontAwesome5 name={icon} size={sizeIcon} color={colors[colorIcon]} />
        </View>
      </View>
      <View style={styles.btnGroup}>
        <TouchableOpacity
          style={styles.modifyBtn}
          onPress={() => navigation.navigate(SCREEN_NAME.ADD_REMOVE, {from: from})}>
          <Text style={styles.btnText}>AGREGAR / QUITAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyBtn}
          onPress={() => navigation.navigate(SCREEN_NAME.BUY)}>
          <Text style={styles.btnText}>COMPRAR</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
