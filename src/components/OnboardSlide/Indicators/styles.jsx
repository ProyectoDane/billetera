import { StyleSheet } from 'react-native';
import { colors } from '../../../constants';

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    height: 10,
    backgroundColor: colors.skyBlue,
    borderRadius: 3,
    marginHorizontal: 5,
  },
  selected: {
    backgroundColor: colors.skyBlue,
  },
  unSelected: {
    backgroundColor: colors.slide,
  },
});

export default styles;
