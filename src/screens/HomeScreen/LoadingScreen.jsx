import React, {useContext, useEffect} from 'react';
import {Text, View} from 'react-native';

import {AddRemoveContext} from '../AddRemove/AddRemoveContext';
import Layout from '../../components/Layout';

import {SCREEN_NAME, TABS_NAME} from '../../constants';
import {styles} from './styles';
import {surveyDone} from '../../dataAccess/User';
import {changeCurrentUserAndReload} from "../../utils/functions/loadUserToContext";

const LoadingScreen = ({ navigation, route }) => {
  const context = useContext(AddRemoveContext);

  useEffect(() => {
    // console.log('SOMETHING HAPPENS');
    const isDone = async () => {
      const done = await surveyDone();
      if (!done) {
        navigation.navigate(TABS_NAME.INFORMATION);
        setTimeout(() => {
          navigation.navigate(SCREEN_NAME.SURVEY, { firstTime: true });
        }, 50);
      }
    };

    isDone();
  }, []);

  useEffect(() => {
    async function onFocus() {
      // await getMoney(context);
      console.log("focus! ")
      if (route.params?.switchUserId) {
        await changeCurrentUserAndReload(route.params.switchUserId, context);
      }

      navigation.navigate(SCREEN_NAME.HOME, {firstTime: true});

    }

    navigation.addListener('focus', onFocus);
    return () => {
      navigation.removeListener('focus', onFocus);
    }
  }, []);

  return (
    <Layout hideTextFooter>
      <View style={{ ...styles.titleContainer, height: '100%', padding: 30, marginTop: 30,
        flexDirection: 'column', justifyContent: "flex-start" }}>
        <Text style={{...styles.titleText, alignSelf: "center", fontWeight: "bold"}}>CARGANDO TU BILLETERA VIRTUAL</Text>
        <Text style={{...styles.titleText, alignSelf: "center", fontWeight: "normal"}}>UN MOMENTO POR FAVOR...</Text>
      </View>
    </Layout>
  );
};

export default LoadingScreen;
