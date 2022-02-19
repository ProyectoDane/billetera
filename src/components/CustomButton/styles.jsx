import { colors } from '../../constants';
import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const   shadow = {
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  shadowOpacity: 0.5,
  elevation: 3,
  shadowRadius: 3 ,
  shadowOffset : { width: 4, height: 4},
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    width: windowWidth - 45,
    height: 180,
    paddingBottom: 15,
    elevation: 5,
  },
  iconTextGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    margin: 15,
    paddingRight: 10,
  },
  text: {
    paddingLeft: 20,
  },
  label: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 20,
  },
  amount: {
    color: colors.white,
    fontSize: 30,
    fontWeight: 'bold',
    textDecorationLine: "underline"
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buyBtn: {...shadow,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 100,
    height: 35,
    backgroundColor: colors.white,

  },
  modifyBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 150,
    height: 35,
    backgroundColor: colors.white,
    ...shadow
  },
  btnText: {
    fontWeight: 'bold',
    color: colors.menu,
  },
});

export default styles;
