import React, { useEffect, useContext, useCallback, useState } from 'react';
import { View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import * as SplashScreen from 'expo-splash-screen';

import AppNavigation from './src/navigation/AppNavigation';
import { initialization } from './src/db/queries';
import { AddRemoveContext } from './src/screens/AddRemove/AddRemoveContext';
import getMoney from './src/utils/functions/loadMoneyToContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Root = () => {
  const context = useContext(AddRemoveContext);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await initialization();
        await getMoney(context);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
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
