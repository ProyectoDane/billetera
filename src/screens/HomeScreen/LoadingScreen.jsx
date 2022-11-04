import React, {useContext, useEffect} from 'react';
import {Text, View} from 'react-native';

import {AddRemoveContext} from '../AddRemove/AddRemoveContext';
import Layout from '../../components/Layout';

import {SCREEN_NAME, TABS_NAME} from '../../constants';
import {styles} from './styles';
import {surveyDone} from '../../dataAccess/User';
import {changeCurrentUserAndReload} from "../../utils/functions/loadUserToContext";

const LoadingScreen = ({ navigation }) => {
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
        await changeCurrentUserAndReload(1, context);
        navigation.navigate(SCREEN_NAME.HOME);
    }
    navigation.addListener('focus', onFocus);
    return () => {
      navigation.removeListener('focus', onFocus);
    }
  }, []);

  return (
    <Layout hideTextFooter>
      <View style={{ ...styles.titleContainer, height: '100%', padding: 30 }}>
        <Text style={styles.titleText}>Cargando Tu billetera virtual</Text>
      </View>
    </Layout>
  );
};

export default LoadingScreen;
