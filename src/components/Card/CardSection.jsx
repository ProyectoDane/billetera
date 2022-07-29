import React, { useContext } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import SvgChevron from '../CustomButton/SvgChevron';
import { ToggleContext } from './Card';
import myStyles from './styles';
import SvgChevron2 from './SvgChevron2';

const CardSection = ({ children, style, onPress = null }) => {
  const { expanded, expandable } = useContext(ToggleContext);
  const styles = StyleSheet.flatten([myStyles.cardSection, style]);

  if (!onPress) {
    const chevronStls = { marginTop: 1, transform: [{ rotate: expanded ? '180deg' : '0deg' }] };
    return (
      <View style={[styles]}>
        {expandable && (
          <View style={myStyles.cardChevron2}>
            <SvgChevron2 style={StyleSheet.flatten([chevronStls, { aspectRatio: 1 / 1 }])} />
          </View>
        )}
        {children}
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles}>
      <View style={myStyles.cardChevron}>
        {onPress && <SvgChevron style={StyleSheet.flatten([{ aspectRatio: 1 / 1 }])} />}
      </View>
      {children}
    </TouchableOpacity>
  );
};

export default CardSection;
