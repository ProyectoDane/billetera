import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import Spinner from '../Spinner/Spinner';

import { colors } from '../../constants';
import { styles } from './styles';
import { FontAwesome5 } from '@expo/vector-icons';

const SingleButton = ({ style, icon, label, sizeIcon, onPress, disabled, isLoading, textStyle }) => {
  return (
    <TouchableOpacity style={{ ...styles.baseBtn, ...style }} onPress={onPress} disabled={disabled}>
      {isLoading ? (
        <Spinner color={colors.white} size={26} />
      ) : (
        <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center' }}>
          <View style={styles.textContainer}>
            {icon && <FontAwesome5 style={styles.icon} name={icon} size={sizeIcon} color={colors.white} />}
            {label ? <Text style={{ ...styles.text, ...textStyle }}>{label}</Text> : null}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SingleButton;
