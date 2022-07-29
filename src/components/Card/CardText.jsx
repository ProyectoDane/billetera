import React from 'react';
import { Text } from 'react-native';
import myStyles from './styles';

const CardText = ({ children, style }) => {
  return <Text style={[myStyles.label, style]}>{children}</Text>;
};

export default CardText;
