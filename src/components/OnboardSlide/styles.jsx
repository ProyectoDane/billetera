import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  indicatorContainer: {
    position: 'absolute',
    width,
    bottom: 20,
    flexDirection: 'row',
    paddingHorizontal: 5 
  }
});

export default styles;
