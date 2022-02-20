import { StyleSheet } from 'react-native';

import { colors } from '../../constants';

export const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    margin: 8,
    fontSize: 16,
    color: colors.white,
    fontWeight: 'normal',
  },
});
