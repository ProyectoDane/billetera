import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { NAVIGATION_TITLE, NAVIGATION_ICONS } from '../../constants';
import { styles } from './styles';

const NavTitle = () => (
  <View style={styles.view}>
    <FontAwesome5 name={NAVIGATION_ICONS.ADD_REMOVE} size={24} color="white" />
    <Text style={styles.text}>{NAVIGATION_TITLE.ADD_REMOVE}</Text>
  </View>
);

export default NavTitle;
