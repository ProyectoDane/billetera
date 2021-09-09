import React from 'react';

import Layout from '../../components/Layout';
import SingleButton from '../../components/SingleButton';
import WishList from './components/WishList';
import { SCREEN_NAME } from '../../constants';

const MyWishes = ({ navigation }) => {
  return (
    <Layout>
      <SingleButton
        icon="plus-circle"
        label="NUEVO DESEO"
        sizeIcon={24}
        onPress={() => navigation.navigate(SCREEN_NAME.NEW_WISH)}
      />
      <WishList />
    </Layout>
  );
};

export default MyWishes;
