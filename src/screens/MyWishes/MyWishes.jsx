import React from 'react';

import Layout from '../../components/Layout';
import SingleButton from '../../components/SingleButton';
import WishList from './components/WishList';

import { SCREEN_NAME } from '../../constants';
import { styles } from './styles';

const MyWishes = ({ navigation }) => {
  const onPressHandle = () => {
    navigation.navigate(SCREEN_NAME.NEW_WISH);
  };

  return (
    <Layout>
      <SingleButton
        icon="plus-circle"
        label="NUEVO DESEO"
        sizeIcon={24}
        onPress={onPressHandle}
        style={styles.newWish}
      />
      <WishList />
    </Layout>
  );
};

export default MyWishes;
