import { StyleSheet } from 'react-native';

import { colors } from '../../constants';

export const styles = StyleSheet.create({
  deseoBtn: {
    flexDirection: 'row',
    width: 175,
    height: 40,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 25,
    backgroundColor: colors.secondary,
  },
  icon: {
    flex: 0.2,
    alignSelf: 'center',
    textAlign: 'right',
  },
  textContainer: {
    flex: 0.75,
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
