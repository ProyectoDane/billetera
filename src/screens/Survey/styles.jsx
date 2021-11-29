import { StyleSheet } from 'react-native';
import { colors } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerFistTime: {
    flex: 1,
    backgroundColor: colors.white,
  },
  completeContainer: {
    alignContent: 'center',
    alignSelf: 'center',
    margin: 40,
  },
  spinner: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  retryBtn: {
    width: 160,
    height: 70,
  },
});
