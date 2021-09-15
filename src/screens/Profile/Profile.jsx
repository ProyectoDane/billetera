import React, { useState, useEffect } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Image,
  Button,
  useWindowDimensions,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Layout from '../../components/Layout';
import Input from '../../components/Input';
import ImagePicker from '../../components/ImagePicker';

import { labels } from '../../constants';
import { colors } from '../../constants';

// import { getUser, updateName, updatePhoto } from '../../dataAccess/User';
// import { User } from '../../models/User';

import { styles } from './styles.jsx';

const Profile = () => {
  // Descomentar esto cuando se migre la BD. Codigo provisorio para que renderice la app.

  // const [user, setUser] = useState(new User());

  // useEffect(() => {
  //   const findUser = async () => {
  //     try {
  //       const user = await getUser();
  //       setUser(user);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   void findUser();
  // }, []);

  // const changeName = (name) => {
  //   const userUpdated = { ...user, name };
  //   setUser(userUpdated);
  //   void updateName(userUpdated);
  // };

  // const changePhoto = (photo) => {
  //   const userUpdated = { ...user, photo };
  //   setUser(userUpdated);
  //   void updatePhoto(userUpdated);
  // };

  const width = useWindowDimensions().width - 40;
  const imageStyle = { width, height: width };

  return (
    <Layout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.container}>
            <Input
              // text={user.name}
              // onFinish={changeName}
              placeholder={labels.insertName}
            />

            <View style={{ ...styles.emptyPhoto, ...imageStyle }}>
              <FontAwesome5
                style={styles.centered}
                name="user-alt"
                size={width / 2}
                color={colors.lightGreen}
              />
            </View>
          </View>
          {/* <ImagePicker setImage={changePhoto} /> */}
        </View>
      </TouchableWithoutFeedback>
    </Layout>
  );
};

export default Profile;

// Poner esto cuando se migre la BD.
// <Layout>
//   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//     <View>
//       <View style={styles.container}>
//         <Input
//           text={user.name}
//           onFinish={changeName}
//           placeholder={labels.insertName}
//         />

//         {user.photo ? (
//           <Image
//             accessibilityRole="image"
//             source={{ uri: user.photo }}
//             style={imageStyle}
//           />
//         ) : (
//           <View style={{ ...styles.emptyPhoto, ...imageStyle }}>
//             <FontAwesome5
//               style={styles.centered}
//               name="user-alt"
//               size={width / 2}
//               color={colors.lightGreen}
//             />
//           </View>
//         )}
//       </View>
//       <ImagePicker setImage={changePhoto} />
//     </View>
//   </TouchableWithoutFeedback>
// </Layout>
