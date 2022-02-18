import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import Spinner from '../Spinner/Spinner';

import { styles } from './styles';
import { colors } from '../../constants';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

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
