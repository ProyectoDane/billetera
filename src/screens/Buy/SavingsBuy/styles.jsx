import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  form: {
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 30,
    paddingTop: 60,
  },
  amountAvaible: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
    paddingTop: 25,
  },
  valueBuy: {
    fontSize: 17,
    color: 'violet',
    fontWeight: 'bold',
    paddingTop: 15,
    textAlign: 'center',
  },
  optBuyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  optBuy: {
    fontSize: 17,
    textAlign: 'center',
    padding: 20,
  },
  text: {
    fontSize: 17,
  },
  error: {
    fontSize: 17,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
    color: 'red',
  },
  icon: {
    alignSelf: 'center',
    padding: 5,
  },
  buttonsContainer: {
    flex: 1,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
