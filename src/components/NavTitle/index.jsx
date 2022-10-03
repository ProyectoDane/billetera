import React from 'react';
import {Text, View} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import {styles} from './styles';
import {colors} from "../../constants";

const NavTitle = ({iconName, title, color = colors.newBlack}) => (
  <View style={{...styles.view, color: color}}>
    <FontAwesome5 name={iconName} size={16}  />
    <Text style={{...styles.text, color: color}}>{title}</Text>
  </View>
);

export default NavTitle;
