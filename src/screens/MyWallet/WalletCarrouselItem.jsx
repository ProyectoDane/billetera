import React, { Fragment } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './WalletCarrouselItemStyles';
import { colors } from '../../constants';
import ItemMoney from '../AddRemove/components/ItemMoney';
import { formatNum } from '../../utils/functions/formatNum';

export default function WalletCarrouselItem({
  itemInfo,
  nextStep,
  prevStep,
  oneStep,
}) {
  const { image, quantity, amount } = itemInfo;

  return (
    <Fragment>
      <View style={styles.wrapperMoney}>
        {oneStep ? null : (
          <TouchableHighlight onPress={prevStep}>
            <Ionicons
              name="arrow-back-circle"
              size={48}
              color={colors.miBilletera}
            />
          </TouchableHighlight>
        )}
        <ItemMoney image={image} />
        {oneStep ? null : (
          <TouchableHighlight onPress={nextStep}>
            <Ionicons
              style={styles.horizontalReverse}
              name="arrow-back-circle"
              size={48}
              color={colors.miBilletera}
            />
          </TouchableHighlight>
        )}
      </View>
      <View style={styles.wrapperValues}>
        <Text style={styles.value}>
          VALOR:
          <Text style={{ fontWeight: 'bold' }}>{formatNum(amount)}</Text>
        </Text>
        <Text style={styles.value}>
          CANTIDAD:
          <Text style={{ fontWeight: 'bold' }}>{quantity}</Text>
        </Text>
        <Text style={styles.value}>
          TOTAL:
          <Text style={{ fontWeight: 'bold' }}>
            {formatNum(quantity * amount)}
          </Text>
        </Text>
      </View>
    </Fragment>
  );
}
