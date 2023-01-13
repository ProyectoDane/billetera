import React from 'react';

import Layout from '../../components/Layout';
import SingleButton from '../../components/SingleButton';
import WishList from './components/WishList';

import {SCREEN_NAME} from '../../constants';
import {styles} from './styles';
import {Text, View} from "react-native";

const MyWishes = ({ navigation }) => {
  const onPressHandle = () => {
    navigation.navigate(SCREEN_NAME.NEW_WISH);
  };

  return (
    <Layout>
        <View style={{...styles.myWishesContainer}}>
            <View style={{...styles.wishTopTextLegend}}>
                <Text style={{textAlign: "center"}}>
                    TUS AHORROS SIRVEN PARA PAGAR TUS DESEOS
                </Text>
            </View>
            <WishList />
            <View style={{...styles.bottomButtonContainer}}>
                <SingleButton
                    // icon="plus-circle"
                    label="AGREGAR DESEO"
                    sizeIcon={24}
                    onPress={onPressHandle}
                    style={styles.newWish}
                />
            </View>
        </View>
    </Layout>
  );
};

export default MyWishes;
