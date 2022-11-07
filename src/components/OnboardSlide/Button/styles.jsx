import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5
  },
  text: {
    paddingVertical: 20,    
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 1
  },
  icon: {
    paddingLeft: 13,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default styles