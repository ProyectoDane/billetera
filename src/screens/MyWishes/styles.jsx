import {StyleSheet} from 'react-native';
import {colors} from "../../constants";

export const styles = StyleSheet.create({
    myWishesContainer: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "flex-start"
    },
    wishTopTextLegend: {
        padding: 10,
        flexBasis: "auto"
    },
    bottomButtonContainer: {
        display: "flex",
        flex: 1, alignSelf: "center",
        padding: 30,
        paddingTop: 20,
        marginTop: 10,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        paddingBottom: 60,
        backgroundColor: colors.white,
        flexBasis: 30, flexGrow: 0
    },
    newWish: {
        width: "100%",
    },
});
