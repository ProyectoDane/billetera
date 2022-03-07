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
    marginLeft: 4,
    marginRight: 4,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'

  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
  },
});
