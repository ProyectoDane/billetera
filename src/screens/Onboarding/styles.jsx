import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../constants';

const {widthScreen} = Dimensions.get('screen').width
const {width} = Dimensions.get('window').width

const styles = StyleSheet.create({    
  container: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'

  },
  indicatorContainer: {
    position: 'absolute',
    width,
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  visualContainer: {
    position: 'absolute',
    width: widthScreen,
    bottom: 20,
    flexDirection: 'row'
  }
})

export default styles