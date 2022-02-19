import { StyleSheet } from 'react-native';

import { colors } from '../../constants';

export const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: colors.menu,
    color: colors.white,
    alignItems: 'center',
    fontSize: 40,
    justifyContent: 'center',
  },
  titleText: {
    marginTop: '5%',
    color: colors.white,
    fontSize: 32,
    textAlign: "center"
  },
  titleText1: {
    color: colors.white,
    fontSize: 20,
    marginTop: 15,
    marginBottom: 40,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonGroupBg: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: colors.menu,
    width: '100%',
  },
  button: {
    padding: 10,
  },
});
