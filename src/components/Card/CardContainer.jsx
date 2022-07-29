import React from 'react';
import { View } from 'react-native';
import myStyles from './styles';

const CardContainer = ({ children, styles }) => {
  return <View style={[myStyles.cardContainer, styles]}>{children}</View>;
};

export default CardContainer;
