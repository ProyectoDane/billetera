import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapperMoney: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 10,
  },
  horizontalReverse: {
    transform: [{ scaleX: -1 }],
  },
  wrapperValues: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  value: {
    fontSize: 14,
    marginHorizontal: 10,
  },
});
