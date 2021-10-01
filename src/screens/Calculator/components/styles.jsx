import { StyleSheet } from 'react-native';

import { colors } from '../../../constants';

export const styles = StyleSheet.create({
  button: {
    borderColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '24%',
    minHeight: '55%',
    flex: 2,
  },
  textButton: {
    color: colors.darkGray,
    fontSize: 28,
  },
});
