import {StyleSheet} from 'react-native';
import {colors} from "../../constants";
import {shadow} from "../../constants/styles";

export const styles = StyleSheet.create({
    icon: {
        alignSelf: 'center',
        padding: 15,
        backgroundColor: colors.primarySoft,
        marginRight: 20,
        borderRadius: 50,
        aspectRatio: 1,
        overflow: "visible"

    },
    container: {
        marginBottom: 10,
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        // minHeight: 100,
        // ...shadow
    },
});
