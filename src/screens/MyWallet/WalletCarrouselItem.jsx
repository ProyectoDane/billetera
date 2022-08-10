import React, { Fragment } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './WalletCarrouselItemStyles';
import { colors } from '../../constants';
import ItemMoney from '../AddRemove/components/ItemMoney';
import { formatAmount } from '../../utils/functions/formatNum';

export default function WalletCarrouselItem({ itemInfo, nextStep, prevStep, oneStep }) {
  const { image, quantity, amount } = itemInfo;
  const total = amount * quantity;
  return (
    <Fragment>
      <View style={styles.wrapperMoney}>
        {oneStep ? null : (
          <TouchableOpacity onPress={prevStep}>
            <Ionicons name="chevron-back-circle" size={34} color={colors.blueText} />
          </TouchableOpacity>
        )}
        <ItemMoney image={image} style={{ width: 200, aspectRatio: 2.4 / 1 }} />
        {oneStep ? null : (
          <TouchableOpacity onPress={nextStep}>
            <Ionicons style={styles.horizontalReverse} name="chevron-back-circle" size={34} color={colors.blueText} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.wrapperValues}>
        <View style={[styles.columnText, { width: 52 }]}>
          <Text style={styles.value}>VALOR</Text>
          <Text style={{ lineHeight: 24, fontWeight: 'bold' }}>{formatAmount(amount, amount !== 1000)}</Text>
        </View>
        <View style={[styles.columnText, { width: 70 }]}>
          <Text style={styles.value}>CANTIDAD</Text>
          <Text style={{ lineHeight: 24, fontWeight: 'bold' }}>{quantity}</Text>
        </View>
        <View style={(styles.columnText, { width: 76 })}>
          <Text style={styles.value}>TOTAL</Text>
          <Text style={{ lineHeight: 24, fontWeight: 'bold' }}>{formatAmount(total, total < 1000)}</Text>
        </View>
      </View>
    </Fragment>
  );
}
