import React from 'react';
import { View } from 'react-native';
import myStyles from './styles';

const CardActions = ({ children, styles }) => {
  return <View style={[myStyles.cardActions, styles]}>{children}</View>;
};

export default CardActions;
