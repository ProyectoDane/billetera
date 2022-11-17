import {StyleSheet} from "react-native";
import {colors} from "../../constants";

export const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
    tabLabel: {
        // backgroundColor: "red"
        color: colors.newBlack,
    },
    tabStyle: {
        flex: 1,
        flexDirection: 'row',
    },
    indicatorStyle: {
        backgroundColor: '#ef8639',
        height: 3,
    }
});