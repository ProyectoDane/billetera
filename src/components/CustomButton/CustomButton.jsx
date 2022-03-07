import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesome5} from '@expo/vector-icons';

import styles from './styles';
import {colors, SCREEN_NAME} from '../../constants/index';
import {formatNum} from '../../utils/functions/formatNum';

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
  const container = {
    backgroundColor: colors[color],
   // flex: 0, flexDirection: "column",
  };

  return (
      <View style={[container, styles.button]}>
        <View style={{
          ...styles.iconTextGroup,
          flex: 2,
        }}>
          <TouchableOpacity onPress={onPress}>
            <View style={{
              ...styles.text,
              borderWidth: 0,
              borderRadius: 5,
              padding: 5,
              borderColor: "white",

            }}>
              <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center", ...styles.shadow2
                  }}>
                <FontAwesome5 name={icon} size={styles.label.fontSize}
                              color={colors[colorIcon]}/><Text
                  style={{...styles.label, marginLeft: 10}}>{label}</Text>
              </View>
              <View style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center"
              }}>
                <Text style={{...styles.amount, ...styles.shadow2}}>{formatNum(amount)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{
          ...styles.btnGroup,
          flex: 1,
          flexDirection: "row",
            justifyContent: "space-between"

        }}>
          <TouchableOpacity
              style={{...styles.modifyBtn}}
              onPress={() =>
                  navigation.navigate(
                      from === 'wallet'
                          ? SCREEN_NAME.ADD_REMOVE
                          : SCREEN_NAME.ADD_REMOVE_SAVINGS,
                      {from: from},
                  )
              }>
            <Text style={styles.btnText}>AGREGAR/QUITAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.buyBtn}
              onPress={() =>
                  isWallet
                      ? navigation.navigate(SCREEN_NAME.WALLET_BUY, {isWallet: true})
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
