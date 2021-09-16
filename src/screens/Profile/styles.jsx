import { StyleSheet } from 'react-native';

import { colors } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  emptyPhoto: {
    borderWidth: 1,
    borderColor: colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  name: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
