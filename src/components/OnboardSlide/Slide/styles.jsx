import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  slide: {
    width,
    marginTop: 10,
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 25,
    color: '#484848',
    lineHeight: 29,
  },
  subtitle1: {
    fontWeight: '800',
    fontSize: 28,
    color: '#1F4183',
    lineHeight: 33,
  },
  subtitle2: {
    fontWeight: '400',
    fontSize: 18,
    color: '#484848',
    lineHeight: 21,
  },
  subtitle3: {
    fontWeight: '700',
    fontSize: 18,
    color: '#484848',
    lineHeight: 21,
  },
  viewText1: {
    alignItems: 'center',
    marginBottom: 20,
  },
  viewText2: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default styles;
