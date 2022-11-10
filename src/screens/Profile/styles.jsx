import { StyleSheet } from 'react-native';

import { colors } from '../../constants';
import {shadow} from "../../constants/styles";

export const styles = StyleSheet.create({
  container: {
    // paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  emptyPhoto: {
    borderWidth: 1,
    borderColor: colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  name: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: "solid",
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.white,
    margin: 15,
    padding: 5,
    borderRadius: 5,
    ...shadow

  }
});
