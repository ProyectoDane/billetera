import React, { Fragment } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './WalletCarrouselItemStyles';
import { colors } from '../../constants';
import ItemMoney from '../AddRemove/components/ItemMoney';
import { formatNum } from '../../utils/functions/formatNum';

export default function WalletCarrouselItem({ itemInfo, nextStep, prevStep, oneStep }) {
  const { image, quantity, amount } = itemInfo;

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
        <View style={styles.columnText}>
          <Text style={styles.value}>VALOR</Text>
          <Text style={{ lineHeight: 24, fontWeight: 'bold' }}>{formatNum(amount)}</Text>
        </View>
        <View style={styles.columnText}>
          <Text style={styles.value}>CANTIDAD</Text>
          <Text style={{ lineHeight: 24, fontWeight: 'bold' }}>{quantity}</Text>
        </View>
        <View style={styles.columnText}>
          <Text style={styles.value}>TOTAL</Text>
          <Text style={{ lineHeight: 24, fontWeight: 'bold' }}>{formatNum(quantity * amount)}</Text>
        </View>
      </View>
    </Fragment>
  );
}
