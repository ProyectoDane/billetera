import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({    
  slides: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },  
})

export default styles