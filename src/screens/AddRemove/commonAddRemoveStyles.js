import {StyleSheet} from "react-native";
import {colors} from "../../constants";

export const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
    tabLabel: {
        // backgroundColor: "red"
        color: colors.primary
    },
    tabStyle: {
        flex: 1,
        flexDirection: 'row',
    },
    indicatorStyle: {
        backgroundColor: colors.primary,
        height: 5,

    }
});