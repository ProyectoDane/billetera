import { StyleSheet } from 'react-native';
import { colors } from '../../constants';

export const styles = StyleSheet.create({
  results: {
    backgroundColor: colors.gray,
    maxWidth: '100%',
    minHeight: '34%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  resultText: {
    maxHeight: 60,
    color: colors.skyBlue,
    margin: 15,
    fontSize: 50,
    // alignSelf: "center"

  },
  historyText: {
    color: colors.darkGray,
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    width: '100%',
    height: '35%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
