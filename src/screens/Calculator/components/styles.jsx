import { StyleSheet } from 'react-native';

import { colors } from '../../../constants';

export const styles = StyleSheet.create({
  button: {
    color: colors.red,
    borderColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '55%',
    borderWidth: 1,
    backgroundColor: colors.softGray,
  },
  operationButton: {
    color: colors.white,
    backgroundColor: colors.primarySoft,
  },
  textButton: {
    color: colors.darkGray,
    fontSize: 28,
    fontWeight:"bold"
  },
});
