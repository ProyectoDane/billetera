import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { styles } from './styles';
import { useCarousel } from './hooks/useCarousel';
import { colors } from '../../constants';

const IconCarousel = () => {
  const { item, nextStep, prevStep } = useCarousel();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={prevStep} accessibilityLabel="Previous icon">
        <FontAwesome5
          name="arrow-circle-left"
          size={40}
          color={colors.softCyan}
          style={styles.button}
        />
      </TouchableOpacity>
      <View style={styles.icon}>
        <FontAwesome5
          accessibilityLabel="Wish icon"
          name={item ? item[0] : 'hand-holding-heart'}
          size={48}
          color={colors.white}
        />
      </View>
      <TouchableOpacity onPress={nextStep} accessibilityLabel="Next icon">
        <FontAwesome5
          name="arrow-circle-right"
          size={40}
          color={colors.softCyan}
          style={styles.button}
        />
      </TouchableOpacity>
    </View>
  );
};

export default IconCarousel;
