import React from 'react';
import {View, Alert, useWindowDimensions, Text} from 'react-native';
import * as ImagePickerExpo from 'expo-image-picker';

import IconButton from '../IconButton';

import {colors, labels} from '../../constants';
import {styles} from './styles';

const ImagePicker = ({setImage}) => {
    const pickImage = async () => {
        const permission =
            await ImagePickerExpo.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert(labels.attention, labels.permissions.gallery);
            return;
        }

        const result = await ImagePickerExpo.launchImageLibraryAsync({
            mediaTypes: ImagePickerExpo.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const permission = await ImagePickerExpo.requestCameraPermissionsAsync();

        if (!permission.granted) {
            Alert.alert(labels.attention, labels.permissions.camera);
            return;
        }

        const result = await ImagePickerExpo.launchCameraAsync();

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const size = useWindowDimensions().width > 360 ? 32 : 24;

    return (
        <View style={{marginTop: 20}}>
            <View style={{alignSelf: "center"}}><Text>CAMBIAR LA IMAGEN</Text></View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 10,
                }}>
                <View>
                    <IconButton
                        icon="image"
                        color={colors.white}
                        sizeIcon={size}
                        onPress={pickImage}
                        backgroundColor={colors.primary}
                    />
                    <Text style={styles.text}>GALERÍA</Text>
                </View>
                <View>
                    <IconButton
                        icon="camera"
                        color={colors.white}
                        sizeIcon={size}
                        onPress={takePhoto}
                        backgroundColor={colors.primary}
                    />
                    <Text style={styles.text}>CÁMARA</Text>
                </View>
            </View>
        </View>
    );
};

export default ImagePicker;
