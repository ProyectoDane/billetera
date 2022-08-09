import { StyleSheet } from 'react-native';
import { colors } from '../../constants';

export const styles = StyleSheet.create({
  wrapperQuestion: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  question: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 18,
  },
  carrouselItem: {
    paddingVertical: 20,
  },
  viewWithoutMoney: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.blueText,
  },
  textWithoutMoney: {
    marginLeft: 10,
    color: colors.blueText,
    fontWeight: 'bold',
  },
});
