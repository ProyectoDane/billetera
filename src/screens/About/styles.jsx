import { StyleSheet } from 'react-native';

import { colors } from '../../constants';

export const styles = StyleSheet.create({
  whiteContainer: {
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  imageContainer: {
    marginVertical: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 15,
    marginBottom: 5
  }
});
