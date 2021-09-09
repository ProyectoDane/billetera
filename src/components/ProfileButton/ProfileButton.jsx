import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

import { colors, SCREEN_NAME } from '../../constants';

const ProfileButton = ({ sizeIcon = 24, colorIcon = 'white' }) => {
  const navigation = useNavigation();
  const route = useRoute();

  if (route.name === SCREEN_NAME.PROFILE) return null;

  return (
    <TouchableOpacity onPress={() => navigation.navigate(SCREEN_NAME.PROFILE)}>
      <FontAwesome5
        name="user-alt"
        size={sizeIcon}
        color={colors[colorIcon]}
        style={{ paddingRight: 22 }}
        accessibilityLabel="Boton de perfil"
      />
    </TouchableOpacity>
  );
};

export default ProfileButton;
