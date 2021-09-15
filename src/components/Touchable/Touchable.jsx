import React from 'react';
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

const Touchable = ({ onPress, children }) => {
  const TouchableComponent =
    Platform.OS === 'android' && Platform.Version > 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return <TouchableComponent onPress={onPress}>{children}</TouchableComponent>;
};

export default Touchable;
