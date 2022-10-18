import {colors} from "./colors";

export const shadow = {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
};

export const bottomButtonContainer = {
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
};