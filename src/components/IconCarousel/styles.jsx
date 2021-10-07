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
    borderRadius: 50,
    height: 100,
    width: 100,
    backgroundColor: colors.darkBlue,
  },
  button: {
    padding: 15,
  },
});
