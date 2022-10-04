import { StyleSheet } from 'react-native';
import {colors} from "../../constants";
import {shadow} from "../../constants/styles";

export const styles = StyleSheet.create({
  newWishContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start"
  },
  card: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: '5%',
    backgroundColor: colors.white,
    margin: 10,
    borderRadius: 10,
    ...shadow
  },
  form: {
    alignContent: 'center',
    justifyContent: 'center',

  },
  title: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 20,

  },
  bottomButtonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    paddingBottom: 120,
    backgroundColor: colors.white,

    display: "flex",
    justifyContent: "center",
    // flex: 1,
    // alignSelf: "flex-end",
    flexBasis: 80,
    flexGrow: 0,
    flexShrink: 1,
    ...shadow
  },
});
