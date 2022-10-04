import { StyleSheet } from 'react-native';

import { colors } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
    borderRadius: 50,
    height: 80,
    width: 80,
    backgroundColor: colors.primarySoft,
  },
  button: {
    padding: 15,
  },
});
