import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { styles } from './styles';
import { colors } from '../../constants';

const IconCarousel = ({ icon, onPrevStep, onNextStep }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrevStep} accessibilityLabel="Previous icon">
        <FontAwesome5 name="arrow-circle-left" size={40} color={colors.softCyan} style={styles.button} />
      </TouchableOpacity>
      <View style={styles.icon}>
        <FontAwesome5
          accessibilityLabel="Wish icon"
          name={icon ?? 'hand-holding-heart'}
          size={48}
          color={colors.white}
        />
      </View>
      <TouchableOpacity onPress={onNextStep} accessibilityLabel="Next icon">
        <FontAwesome5 name="arrow-circle-right" size={40} color={colors.softCyan} style={styles.button} />
      </TouchableOpacity>
    </View>
  );
};

export default IconCarousel;
