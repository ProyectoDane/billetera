import { StyleSheet } from 'react-native';

import { colors } from '../../constants';

export const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: colors.menu2,
    color: colors.white,
    alignItems: 'center',
    fontSize: 40,
    justifyContent: 'center',
  },
  titleText: {
    marginTop: 5,
    color: colors.white,
    fontSize: 32,
    textAlign: "center"
  },
  titleText1: {
    color: colors.white,
    fontSize: 20,
    marginTop: 5,
    marginBottom: 10,
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  buttonGroupBg: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: colors.menu,
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    width: "100%",
    maxHeight: 180
  },
});
