import React from 'react';
import { Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { styles } from './WalletBalanceStyles';
import { colors } from '../../constants';

export default function WalletBalance({ total, isWallet = true }) {
  return (
    <View style={styles.banner}>
      <FontAwesome5
        name={isWallet ? 'wallet' : 'piggy-bank'}
        size={60}
        color={colors.white}
      />
      <Text style={styles.balance}> {total}</Text>
    </View>
  );
}
