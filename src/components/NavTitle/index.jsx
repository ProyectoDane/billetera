import React from 'react';
import {Text, View} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import {styles} from './styles';

const NavTitle = ({iconName, title, color = 'black'}) => (
  <View style={{...styles.view, color: color}}>
    <FontAwesome5 name={iconName} size={24}  />
    <Text style={{...styles.text, color: color}}>{title}</Text>
  </View>
);

export default NavTitle;
