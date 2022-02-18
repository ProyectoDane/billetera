import { StyleSheet } from 'react-native';
import {colors} from "../../../constants";

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
    color: 'black',
    // paddingTop: 25,
  },
  valueBuy: {
    fontSize: 17,
    color: 'darkblue',
    fontWeight: 'bold',
    paddingTop: 15,
    textAlign: 'center',
  },
  optBuyContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  optBuy: {
    fontSize: 17,
    textAlign: 'center',
    padding: 20,
  },
  itemOptBuy: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    paddingBottom: 3,
  },

  text: {
    fontSize: 17,
  },
  vuelto: {
    marginTop: 5,
    fontSize: 17,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 3,
    backgroundColor: '#70c585',
    textAlign: 'center',
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
  buyInputText: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: colors.primary
  },
});
