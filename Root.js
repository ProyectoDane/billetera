import React, { useEffect, useContext } from 'react';
import { View } from 'react-native';
import FlashMessage from 'react-native-flash-message';

import AppNavigation from './src/navigation/AppNavigation';
import { initialization } from './src/db/queries';
import { AddRemoveContext } from './src/screens/AddRemove/AddRemoveContext';

import getMoney from './src/utils/functions/loadMoneyToContext';

const Root = () => {
  const context = useContext(AddRemoveContext);

  useEffect(() => {
    async function init() {
      await initialization();
      await getMoney(context);
    }

    init();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AppNavigation />
      <FlashMessage position="top" />
    </View>
  );
};

export default Root;
