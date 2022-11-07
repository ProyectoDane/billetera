import React from 'react';
import { View } from 'react-native';

import styles from './styles'

const Indicators = ({ countIndicator, currentSlideIndex }) => {
  if (!countIndicator || typeof countIndicator !== 'number') return null;

  let indicators = [];
  for (let i = 0; i < countIndicator; i++) {
    indicators.push(i);
  }

  return indicators.map((indicator, index) => (
    <View
      key={indicator.toString()}
      style={[styles.indicator, index === currentSlideIndex ? styles.selected : styles.unSelected]}
    />
  ));
};

export default Indicators;
