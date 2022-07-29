import React, { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';

import { AddRemoveContext } from '../AddRemove/AddRemoveContext';
import Layout from '../../components/Layout';

import { SCREEN_NAME, TABS_NAME } from '../../constants';
import { styles } from './styles';
import getMoney from '../../utils/functions/loadMoneyToContext';
import { surveyDone } from '../../dataAccess/User';

const LoadingScreen = ({ navigation }) => {
  const context = useContext(AddRemoveContext);

  useEffect(() => {
    console.log('SOMETHING HAPPENS');
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
    const unsubscribe = navigation.addListener('focus', async () => {
      await getMoney(context);
      navigation.navigate(SCREEN_NAME.HOME);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Layout hideTextFooter>
      <View style={{ ...styles.titleContainer, height: '100%', padding: 30 }}>
        <Text style={styles.titleText}>Cargando Tu billetera virtual</Text>
      </View>
    </Layout>
  );
};

export default LoadingScreen;
