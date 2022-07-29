import { StyleSheet } from 'react-native';

import { colors } from '../../constants';

const shadow2 = {
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  shadowOpacity: 0.5,
  elevation: 3,
  shadowRadius: 3,
  shadowOffset: { width: 4, height: 4 },
};

export const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 8,
    marginBottom: 10,
  },
  headerTitle: {
    paddingLeft: 20,
    color: colors.menu2,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: '13%',
  },
  headerSubtitle: {
    paddingLeft: 20,
    paddingRight: 10,
    height: 80,
    paddingTop: 5,
    marginBottom: -18,
    color: colors.orange2,
    fontSize: 13,
  },
  cardGroup: {
    flex: 1,
    flexDirection: 'column',
    // flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  cardContainer: {
    // flex: 0.42,
    // padding: 12,
    // width: '100%',
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
