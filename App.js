import React, { useEffect } from 'react';
import { View } from 'react-native';
import FlashMessage from 'react-native-flash-message';

import AppNavigation from './src/navigation/AppNavigation';
import { initialization } from './src/db/queries';

const App = () => {
  useEffect(() => {
    const init = async () => await initialization();

    init();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AppNavigation />
      <FlashMessage position="top" />
    </View>
  );
};

export default App;
