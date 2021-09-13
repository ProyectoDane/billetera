import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { styles } from './styles';

const SingleButton = ({ icon, label, sizeIcon, onPress }) => {
  return (
    <TouchableOpacity style={styles.deseoBtn} onPress={onPress}>
      <FontAwesome5
        style={styles.icon}
        name={icon}
        size={sizeIcon}
        color="white"
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SingleButton;
