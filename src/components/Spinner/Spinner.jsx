import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size, color }) => (
  <View
    style={{
      flex: 1,
      width: 40,
      alignItems: 'center',
    }}>
    <ActivityIndicator
      style={{
        flex: 1,
      }}
      accessibilityHint="loading"
      size={size}
      color={color}
    />
  </View>
);

export default Spinner;
