import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import * as SplashScreen from 'expo-splash-screen';

import AppNavigation from './src/navigation/AppNavigation';
import {initialization} from './src/db/queries';
import {AddRemoveContext} from './src/screens/AddRemove/AddRemoveContext';
import {changeCurrentUserAndReload} from "./src/utils/functions/loadUserToContext";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Root = () => {
  const context = useContext(AddRemoveContext);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function doEffect() {
      try {
        await initialization();
      } catch (e) {
        console.warn(e);
      } finally {
        // setAppIsReady(true);
      }
    }
    doEffect();
  }, []);

  useEffect(() => {
    async function doEffect() {
      try {
        let userId = context.currentUser?.id || 1;
        await changeCurrentUserAndReload(userId, context);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    doEffect();
  }, [context.currentUser?.id || 1]);


  const onLayoutRootView = useCallback(() => {
    async function doEffect() {
      if (appIsReady) {
        await SplashScreen.hideAsync();
      }
    }
    doEffect();
  }, [appIsReady]);

  if (!appIsReady) return null;
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AppNavigation />
      <FlashMessage position="top" />
    </View>
  );
};

export default Root;
