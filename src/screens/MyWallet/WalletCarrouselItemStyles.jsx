import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapperMoney: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  horizontalReverse: {
    transform: [{ scaleX: -1 }],
  },
  wrapperValues: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: '5%',
  },
  columnText: {
    flexDirection: 'column',
  },
  value: {
    fontSize: 14,
  },
});
