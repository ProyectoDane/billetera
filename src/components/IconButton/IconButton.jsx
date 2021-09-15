import React from 'react';
import { View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import Touchable from '../Touchable';

import { styles } from './styles';

const IconButton = ({ icon, sizeIcon, color, backgroundColor, onPress }) => {
  return (
    <View
      accessibilityRole="button"
      style={{
        borderRadius: 1.5 * sizeIcon,
        overflow: 'hidden',
      }}>
      <Touchable onPress={onPress}>
        <View
          style={{
            width: 2 * sizeIcon,
            height: 2 * sizeIcon,
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor,
          }}>
          <FontAwesome5
            style={styles.icon}
            name={icon}
            size={sizeIcon}
            color={color}
          />
        </View>
      </Touchable>
    </View>
  );
};

export default IconButton;
