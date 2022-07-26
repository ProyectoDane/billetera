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
    paddingLeft: 20,
    color: colors.menu2,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: '13%',
  },
  cardSubtitle: {
    paddingLeft: 20,
    paddingRight: 10,
    height: 80,
    paddingTop: 5,
    marginBottom: -18,
    color: colors.orange2,
    fontSize: 13,
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  button: {
    flex: 0.43,
    padding: 12,
    width: '100%',
  },
});
