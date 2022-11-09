import Layout from "../../components/Layout";
import {styles as WalletStyles} from "../MyWallet/styles";
import {Image, ScrollView, View} from "react-native";
import {changeCurrentUserAndReload, loadUserToContext} from "../../utils/functions/loadUserToContext";
import React, {useContext, useEffect, useState} from "react";
import {AddRemoveContext} from "../AddRemove/AddRemoveContext";
import {colors, SCREEN_NAME} from "../../constants";
import {getAllUsers} from "../../dataAccess/User";
import Card from "../../components/Card/Card";
import CardSection from "../../components/Card/CardSection";
import CardText from "../../components/Card/CardText";
import {FontAwesome5} from "@expo/vector-icons";
import {styles as WishesStyles} from "../WishesHome/styles";

const flexrow = {flex: 1, flexDirection: 'row', alignItems: 'center'};

const SwitchUser = ({navigation, route}) => {

    const [users, setUsers] = useState([]);

    const context = useContext(AddRemoveContext);

    useEffect(() => {
        let cancel = false;
        async function doEffect() {
            const allUsers = await getAllUsers();
            if (!cancel)
                setUsers(allUsers);
        }

        doEffect();
        return () => { cancel = true;}

    }, []);

    async function handleClick(userId) {
        // navigation.navigate(SCREEN_NAME.LOADING, {switchUserId:userId });

        let user = await loadUserToContext(userId, context);
        console.log(`current user name: ${user.name}`);
        if (user.name == "") {
            navigation.navigate(SCREEN_NAME.PROFILE);
        } else {
            navigation.navigate(SCREEN_NAME.HOME);
        }
    }

    return (
      <Layout>
          <ScrollView contentContainerStyle={WalletStyles.cardGroup}>
              {users.map((elem) => {
                  return (
                      <View style={WalletStyles.container} key={`entry_for_user_${elem.id}`}>
                          <Card containerStyle={{flex: 1,}}>
                              <CardSection
                                  onPress={ () => handleClick(elem.id)}>
                                  <View style={flexrow}>
                                      <View style={{...WishesStyles.icon, padding: 5}}>
                                          {elem.photo ? (
                                              <Image
                                                  accessibilityRole="image"
                                                  source={{ uri: elem.photo }}
                                                  style={{
                                                      width: 34,
                                                      height: 34,
                                                      borderRadius: 35,
                                                      // marginLeft: 0,
                                                      borderColor: colors.menu2,
                                                  }}
                                              />
                                          ) :  <FontAwesome5
                                              name={'user-circle'}
                                              size={34}
                                              color={colors.primary}
                                          /> }

                                      </View>
                                      <CardText>{elem.name || `USUARIO ${elem.id}`}</CardText>
                                  </View>
                              </CardSection>
                          </Card>
                      </View>

                  );
              })}
          </ScrollView>
      </Layout>
    );
}

export default  SwitchUser;