import { StyleSheet } from 'react-native';

import { colors } from '../../constants';

export const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 8,
    marginBottom: 10,
  },
  cardTitle: {
    paddingTop: 25,
    paddingLeft: 20,
    paddingBottom: 10,
    color: colors.menu2,
    fontSize: 23,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    paddingTop: 20,
    paddingLeft: 20,
    color: colors.orange2,
    fontSize: 13,
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
    width: '100%',
    maxHeight: 180,
  },
});
