import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  indicatorContainer: {
    width,
    marginTop: 15,
    flexDirection: 'row',
    paddingHorizontal: 5 ,
    flexBasis: 20,
    flexGrow: 0,
    flexShrink: 1,
    justifyContent: "center",
  }
});

export default styles;
