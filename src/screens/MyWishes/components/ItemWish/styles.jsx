import { StyleSheet } from 'react-native';

import { colors } from '../../../../constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    width: '100%',
    paddingRight: 10,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.strongCyan,
    borderRadius: 50,
    elevation: 5,
  },
  iconItem: {
    flex: 0.22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkBlue,
    borderRadius: 50,
    height: 70,
  },
  dataItem: {
    flex: 0.8,
    alignItems: 'center',
  },
  chevron: {
    flex: 0.1,
    alignItems: 'center',
  },
  title: {
    flex: 0.7,
    textAlign: 'left',
    color: colors.white,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  valueItem: {
    flex: 0.7,
    textAlign: 'right',
    alignSelf: 'center',
    fontWeight: 'bold',
    color: colors.white,
  },
  itemDetails: {
    fontWeight: 'bold',
    color: colors.white,
  },
  actionsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    color: colors.white,
  },
  actionBtn: {
    fontWeight: 'bold',
    width: 80,
    color: colors.primary,
    textAlign: 'center',
    paddingTop: 6,
    fontSize: 13,
  },
  text: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 6,
  },
  collapse: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: colors.strongCyan,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
