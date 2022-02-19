import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './styles';
import { colors, SCREEN_NAME } from '../../constants/index';
import { formatNum } from '../../utils/functions/formatNum';

const CustomButton = ({
  icon,
  sizeIcon,
  colorIcon = colors.white,
  label,
  color = colors.primary,
  amount,
  onPress,
  isWallet,
  from,
}) => {
  const navigation = useNavigation();
  const buttonColor = {
    backgroundColor: colors[color],
  };

  return (
      <View style={[buttonColor, styles.button]}>
      <View style={styles.iconTextGroup}>
        <TouchableOpacity onPress={onPress}
                          >
        <View style={{...styles.text,
          borderWidth: 0,
          borderRadius: 5,
          paddingLeft: 5,
          marginLeft: 20,
          padding: 5,
          borderColor: "white",
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowOpacity: 0.5,
          elevation: 1,
          shadowRadius: 1 ,
          shadowOffset : { width: 4, height: 4},
        }}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.amount}>{formatNum(amount)}</Text>
        </View>
        </TouchableOpacity>
        <View style={styles.icon}>
          <FontAwesome5 name={icon} size={sizeIcon} color={colors[colorIcon]} />
        </View>
      </View>
      <View style={styles.btnGroup}>
        <TouchableOpacity
          style={styles.modifyBtn}
          onPress={() =>
            navigation.navigate(
              from === 'wallet'
                ? SCREEN_NAME.ADD_REMOVE
                : SCREEN_NAME.ADD_REMOVE_SAVINGS,
              { from: from },
            )
          }>
          <Text style={styles.btnText}>AGREGAR / QUITAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyBtn}
          onPress={() =>
            isWallet
              ? navigation.navigate(SCREEN_NAME.WALLET_BUY, { isWallet: true })
              : navigation.navigate(SCREEN_NAME.SAVINGS_BUY, {
                  isWallet: false,
                })
          }>
          <Text style={styles.btnText}>COMPRAR</Text>
        </TouchableOpacity>
      </View>
      </View>
  );
};

export default CustomButton;
