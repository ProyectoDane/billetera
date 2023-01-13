import React, {useContext, useEffect, useState} from 'react';
import {Image, Keyboard, TouchableWithoutFeedback, useWindowDimensions, View,} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';

import Layout from '../../components/Layout';
import Input from '../../components/Input';
import ImagePicker from '../../components/ImagePicker';

import {colors, labels, SCREEN_NAME} from '../../constants';

import {getUser, updateName, updatePhoto} from '../../dataAccess/User';
import {User} from '../../models/User';

import {styles} from './styles';
import {styles as wishStyle} from '../MyWishes/styles'

import {AddRemoveContext} from "../AddRemove/AddRemoveContext";
import SingleButton from "../../components/SingleButton";

const Profile = ({navigation, route}) => {
  const [user, setUser] = useState(new User());

  const {
    currentUser,
    setCurrentUser
  } = useContext(AddRemoveContext);


  useEffect(() => {
    let cancel = false;
    const findUser = async () => {
      try {
        const user = await getUser(currentUser.id);
        if (!cancel)
          setUser(user);
        // setCurrentUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    void findUser();

    return () => {
      cancel = true;
    }
  }, [currentUser.id]);

  const changeName = (name) => {
    const userUpdated = { ...user, name };
    setUser(userUpdated);
    void updateName(userUpdated);
    setCurrentUser(userUpdated);
  };

  const changePhoto = (photo) => {
    const userUpdated = { ...user, photo };
    setUser(userUpdated);
    void updatePhoto(userUpdated);
    setCurrentUser(userUpdated);
  };

  const width = useWindowDimensions().width - 150;
  const imageStyle = { width, height: width, borderRadius: 150 };

  return (
    <Layout>
      <View style={wishStyle.myWishesContainer}>
        <View style={{flex: 1}}>
          <View style={{...styles.card}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <View style={styles.container}>
                  <Input
                      text={user.name.toUpperCase()}
                      onFinish={changeName}
                      placeholder={labels.insertName}
                      style={{...styles.name, fontSize: 25,}}
                  />

                  {user.photo ? (
                      <Image
                          accessibilityRole="image"
                          source={{ uri: user.photo }}
                          style={imageStyle}
                      />
                  ) : (
                      <View style={{ ...styles.emptyPhoto, ...imageStyle }}>
                        <FontAwesome5
                            style={styles.centered}
                            name="user-alt"
                            size={width / 2}
                            color={colors.miBilletera}
                        />
                      </View>
                  )}
                </View>
                <ImagePicker setImage={changePhoto} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={{...wishStyle.bottomButtonContainer}}>
          <SingleButton
              style={{  width: "100%", marginBottom: 10 }}
              label={'CAMBIAR DE USUARIO'}
              onPress={() => navigation.navigate(SCREEN_NAME.SWITCH_USER)}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Profile;
