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
    justifyContent: 'space-between',
    marginTop: 20,
  },
  columnText: {
    flexDirection: 'column',
  },
  value: {
    // flex: 1,
    fontSize: 14,
    // marginHorizontal: 15,
  },
});
