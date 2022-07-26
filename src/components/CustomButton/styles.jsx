import { colors } from '../../constants';
import { StyleSheet } from 'react-native';

const shadow2 = {
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  shadowOpacity: 0.5,
  elevation: 3,
  shadowRadius: 3,
  shadowOffset: { width: 4, height: 4 },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    elevation: 6,
    backgroundColor: colors['white'],
  },
  cardContent: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: -10,
    justifyContent: 'space-between',
  },
  label: {
    color: '#222',
    fontSize: 15,
    letterSpacing: 0.7,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.orange2,
  },
  cardButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buyBtn: {
    ...shadow2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flex: 1,
    height: 40,
    backgroundColor: colors.misAhorros,
  },
  modifyBtn: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flex: 1,
    height: 40,
    backgroundColor: colors.blueText,
    ...shadow2,
  },
  btnText: {
    fontWeight: 'bold',
    color: '#fffeee',
  },

  shadow2: { ...shadow2 },
});

export default styles;
