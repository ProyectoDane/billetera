import { StyleSheet } from 'react-native';

import { colors } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  emptyPhoto: {
    borderWidth: 1,
    borderColor: colors.orange,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    alignSelf: 'center',
    textAlign: 'center',
  },
});
