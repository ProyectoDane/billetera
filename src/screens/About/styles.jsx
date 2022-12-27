import {StyleSheet} from 'react-native';

import {colors} from '../../constants';
import {shadow} from "../../constants/styles";

export const styles = StyleSheet.create({
    whiteContainer: {
        backgroundColor: colors.white,
    }, container: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: colors.white,
        borderRadius: 15,
        paddingVertical: 20,
        marginBottom: 20,
        paddingHorizontal: 15,
        marginVertical: 10,
        ...shadow,
    }, imageContainer: {
        marginVertical: 10, alignContent: 'center', justifyContent: 'center',
    }, title: {
        marginTop: 0, marginBottom: 10
    }
});
