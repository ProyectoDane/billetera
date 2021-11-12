import { StyleSheet } from 'react-native';

import { colors } from '../../constants';

export const styles = StyleSheet.create({
    banner: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "60%",
        backgroundColor: colors.primary,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        paddingVertical: 10,
        marginBottom: 10,
    },
    balance: {       
        fontSize: 25,
        fontWeight: "bold",
        color: colors.white,
    }
})