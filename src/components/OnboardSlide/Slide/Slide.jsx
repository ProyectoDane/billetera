import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';

const Slide = ({ item }) => {
  const { title, subtitle1, subtitle2, subtitle3, img } = item;

  return (
    <View style={styles.slide}>
      <View style={styles.viewText1}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle1}>{subtitle1}</Text>
      </View>
        {img}
      <View style={{...styles.viewText2, }}>
        <Text style={styles.subtitle2}>{subtitle2}</Text>
        <Text style={styles.subtitle2}>{subtitle3}</Text>
      </View>
    </View>
  );
};

export default Slide;
