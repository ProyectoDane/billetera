import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { SCREEN_NAME } from '../../constants/index';
import { formatNum } from '../../utils/functions/formatNum';
import SvgChevron from './SvgChevron';

const CustomButton = ({ Icon, label, amount, onPress, isWallet, from }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <View style={styles.cardContent}>
        <TouchableOpacity onPress={onPress}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              width: '98%',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              {Icon}
              <Text style={{ ...styles.label, marginLeft: 12 }}>{label}</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ ...styles.amount, ...styles.shadow2 }}>{formatNum(amount)}</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
                right: 5,
                width: '5%',
                // height: 15,
              }}>
              <SvgChevron style={{ aspectRatio: 1 / 1 }} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{ ...styles.modifyBtn }}
          onPress={() =>
            navigation.navigate(from === 'wallet' ? SCREEN_NAME.ADD_REMOVE : SCREEN_NAME.ADD_REMOVE_SAVINGS, {
              from: from,
            })
          }>
          <Text style={styles.btnText}>AGREGAR/QUITAR</Text>
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
