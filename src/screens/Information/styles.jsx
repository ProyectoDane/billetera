import { StyleSheet } from 'react-native';
import { colors } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
  button: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: colors.menu,
    height: 60,
    width: '100%',
    shadowColor: colors.black,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: colors.white,
    borderRadius: 5,
  },
  imageContainer: {
    marginVertical: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
