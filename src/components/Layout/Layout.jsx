import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../constants';
import { styles } from './styles';

const Layout = ({ children }) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.menu} />
        {children}
      </SafeAreaView>
    </>
  );
};

export default Layout;
