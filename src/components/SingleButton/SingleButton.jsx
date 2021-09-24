import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import Spinner from '../Spinner/Spinner';

import { styles } from './styles';
import { colors } from '../../constants';

const SingleButton = ({
  style,
  icon,
  label,
  sizeIcon,
  onPress,
  disabled,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.deseoBtn, ...style }}
      onPress={onPress}
      disabled={disabled}>
      {isLoading ? (
        <Spinner color={colors.white} size={26} />
      ) : (
        <>
          <FontAwesome5
            style={styles.icon}
            name={icon}
            size={sizeIcon}
            color={colors.white}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{label}</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default SingleButton;
