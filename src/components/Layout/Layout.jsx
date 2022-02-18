import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {colors} from '../../constants';
import {styles} from './styles';

const Layout = ({ children}) => {
  return (
      <SafeAreaView style={{...styles.container}}>
          <StatusBar barStyle="dark-content" backgroundColor={colors.menu} />
          {children}
      </SafeAreaView>
  );
};

export default Layout;
