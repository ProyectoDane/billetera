import { StyleSheet } from 'react-native';

import { colors } from '../../constants';

export const styles = StyleSheet.create({
  baseBtn: {
    flexDirection: 'row',
    width: 175,
    height: 40,
    borderRadius: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    // marginTop: 20,
    // marginBottom: 20,
    backgroundColor: colors.primary,
  },

  deseoBtn: {
    flexDirection: 'row',
    width: 175,
    height: 40,
    borderRadius: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: colors.secondary,
  },
  icon: {
    flex: 0.2,
    alignSelf: 'center',
    textAlign: 'center',
  },
  textContainer: {
    flex: 0.65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
  },
});
