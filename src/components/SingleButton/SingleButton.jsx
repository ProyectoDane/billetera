import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import Spinner from '../Spinner/Spinner';

import { colors } from '../../constants';
import { styles } from './styles';
import {FontAwesome5} from "@expo/vector-icons";

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
      style={{ ...styles.baseBtn, ...style }}
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
          {label? (
            <View style={styles.textContainer}>
              <Text style={styles.text}>{label}</Text>
            </View>
          ):null}
        </>
      )}
    </TouchableOpacity>
  );
};

export default SingleButton;
