import { StyleSheet } from 'react-native';

import { colors } from '../../../constants';

export const styles = StyleSheet.create({
  button: {
    borderColor: colors.newBlack,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '24%',
    minHeight: '55%',
    flex: 2,
    borderWidth: 1,
  },
  textButton: {
    color: colors.darkGray,
    fontSize: 28,
  },
});
