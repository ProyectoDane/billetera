import { View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { colors } from '../../../../constants';

const IconContainer = ({iconName = 'bicycle'}) => (
  <View style={styles.container}>
    <FontAwesome5 name={iconName} size={25} color={colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primarySoft,
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconContainer;
