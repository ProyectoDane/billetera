import { StyleSheet } from 'react-native';
import {shadow} from "../../constants/styles";

const shadow2 = {
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  shadowOpacity: 0.5,
  elevation: 3,
  shadowRadius: 3,
  shadowOffset: { width: 4, height: 4 },
};

export const styles = StyleSheet.create({
  cardGroup: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    marginBottom: 10,
    flexDirection: 'row',
    width: '100%',
    minHeight: 100,
    ...shadow
  },

  btnText: {
    fontWeight: 'bold',
    color: '#fffeee',
  },
  shadow2: { ...shadow2 },
});
