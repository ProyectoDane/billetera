import React, { useContext } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

import { colors, SCREEN_NAME } from '../../constants';
import { AddRemoveContext } from '../../screens/AddRemove/AddRemoveContext';

const ProfileButton = ({ sizeIcon = 24, colorIcon = 'white' }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const { currentUser } = useContext(AddRemoveContext);

  if (route.name === SCREEN_NAME.PROFILE) return null;

  return (
    <TouchableOpacity onPress={() => navigation.navigate(SCREEN_NAME.PROFILE)}>
      {currentUser.photo ? (
        <Image
          accessibilityRole="image"
          source={{ uri: currentUser.photo }}
          style={{
            width: sizeIcon * 2,
            height: sizeIcon * 2,
            borderRadius: 35,
            marginLeft: 5,
            borderColor: colors.menu2,
          }}
        />
      ) : (
        <FontAwesome5
          name="user-alt"
          size={sizeIcon}
          style={{ paddingLeft: 22, color: colorIcon }}
          accessibilityLabel="Boton de perfil"
        />
      )}
    </TouchableOpacity>
  );
};

export default ProfileButton;
