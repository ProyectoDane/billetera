import React, {useContext} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FontAwesome5} from '@expo/vector-icons';

import {colors, SCREEN_NAME} from '../../constants';
import {AddRemoveContext} from "../../screens/AddRemove/AddRemoveContext";

const ProfileButton = ({ sizeIcon = 24, colorIcon = 'white' }) => {
  const navigation = useNavigation();
  const route = useRoute();

    const {
        currentUser,
    } = useContext(AddRemoveContext);

  if (route.name === SCREEN_NAME.PROFILE) return null;


  return (
    <TouchableOpacity onPress={() => navigation.navigate(SCREEN_NAME.PROFILE)}>
        {currentUser.photo ? (
            <Image
                accessibilityRole="image"
                source={{ uri: currentUser.photo }}
                style={{
                    width: sizeIcon*4,
                    height: sizeIcon*4,
                    borderRadius: 150,
                    marginRight: 15,
                  marginTop: 15,
                  borderWidth: 2,
                  borderColor: 'white'
                }}r
            />
        ) : (
      <FontAwesome5
        name="user-alt"
        size={sizeIcon}
        color={colors[colorIcon]}
        style={{ paddingRight: 22 }}
        accessibilityLabel="Boton de perfil"
      />
        )}
    </TouchableOpacity>
  );
};

export default ProfileButton;
