import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../constants';
import { FontAwesome5 } from '@expo/vector-icons';

import WalletCarrouselItem from './WalletCarrouselItem';
import { styles } from './WalletCarrouselStyles';

export default function WalletCarrousel({ moneyType, dataCarrousel }) {
  const [step, setStep] = useState(0);
  const [item, setItem] = useState(dataCarrousel ? dataCarrousel[step] : []);

  const lastStep =
    dataCarrousel && dataCarrousel.length == 1 ? 1 : dataCarrousel.length > 0 ? dataCarrousel.length - 1 : 0;

  const firstStep = 0;

  const calculateStep = (sign) => (sign === '+' ? step + 1 : step - 1);

  const nextStep = () =>
    step === lastStep
      ? (setItem(dataCarrousel[firstStep]), setStep(firstStep))
      : (setItem(dataCarrousel[calculateStep('+')]), setStep(calculateStep('+')));

  const prevStep = () =>
    step === firstStep
      ? (setItem(dataCarrousel[lastStep]), setStep(lastStep))
      : (setItem(dataCarrousel[calculateStep('-')]), setStep(calculateStep('-')));

  return (
    <View style={styles.carrouselItem}>
      {lastStep ? (
        <WalletCarrouselItem
          itemInfo={item}
          oneStep={dataCarrousel.length === 1 ? true : false}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ) : (
        <View style={styles.viewWithoutMoney}>
          <FontAwesome5 accessibilityLabel="Info icon" name="info-circle" size={22} color={colors.blueText} />
          <Text style={styles.textWithoutMoney}>AÚN NO SE HAN AGREGADO {moneyType.toUpperCase()}</Text>
        </View>
      )}
    </View>
  );
}
