import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';

const TextUppercase = ({ children, style, bold, paragraph }) => {
  return (
    <Text
      style={{
        ...styles.text,
        ...style,
        ...{ fontWeight: bold ? 'bold' : 'normal' },
      }}>
      {children}
      {paragraph ? '\n' : ''}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    textTransform: 'uppercase',
    color: colors.blueText,
  },
});

export default TextUppercase;
