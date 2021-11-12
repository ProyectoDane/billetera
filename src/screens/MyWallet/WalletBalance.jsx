import React from 'react';
import { Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { styles } from './WalletBalanceStyles';
import { colors } from '../../constants';

export default function WalletBalance({ total }) {
  return (
    <View style={styles.banner}>
      <FontAwesome5 name="wallet" size={60} color={colors.white} />
      <Text style={styles.balance}> {total}</Text>
    </View>
  );
}
