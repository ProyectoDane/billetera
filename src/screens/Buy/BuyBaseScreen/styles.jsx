import { StyleSheet } from 'react-native';
import {colors} from "../../../constants";
import {shadow} from "../../../constants/styles";

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
  resultTextLabel: {
    flex: 3,
    fontSize: 17,
    color: colors.newBlack,
    textAlign: 'left',
  },
  resultTextAmount: {
    flex: 1,
    fontSize: 17,
    color: colors.newBlack,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  resultTextAmountVuelto: {
    flex: 1,
    fontSize: 17,
    color: colors.orange,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  optBuyContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: colors.white,
    ...shadow
  },
  optBuy: {
    fontSize: 17,
    textAlign: 'right',
    paddingBottom: 20,
  },
  itemOptBuy: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 3,
    marginBottom: 10,
  },

  text: {
    fontSize: 17,
    alignSelf: 'center',
    color: colors.newBlack
  },
  vuelto: {
    marginTop: 5,
    fontSize: 17,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 3,
    // backgroundColor: '#70c585',
    textAlign: 'right',
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
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: colors.primary
  },
});
