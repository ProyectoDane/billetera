import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import * as SplashScreen from 'expo-splash-screen';

import AppNavigation from './src/navigation/AppNavigation';
import {initialization} from './src/db/queries';
import {AddRemoveContext} from './src/screens/AddRemove/AddRemoveContext';
import getMoney from './src/utils/functions/loadMoneyToContext';
import {getUser} from './src/dataAccess/User';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
const INIT_USER_ID = 1;

const Root = () => {
  const context = useContext(AddRemoveContext);
  const [appIsReady, setAppIsReady] = useState(false);
  const currentUserId = context.currentUser?.id;
  const forceRefresh = context.appRefresh;

  useEffect(() => {
    if (currentUserId) {
      getMoney(context);
    }
  }, [currentUserId, forceRefresh]);

  useEffect(() => {
    async function firstLoad() {
      try {
        await initialization();
        const user = await getUser(INIT_USER_ID);
        console.log(`load user to context ${user.name}`);
        context.setCurrentUser(user);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    firstLoad();
  }, []);

  const onLayoutRootView = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  if (!appIsReady) return null;
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AppNavigation />
      <FlashMessage position="top" />
    </View>
  );
};

export default Root;
