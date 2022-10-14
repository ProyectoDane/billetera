import React from 'react';
import {Image, useWindowDimensions, View,} from 'react-native';

import daneLogo from '../../../assets/dane_logo.png';

import Layout from '../../components/Layout';
import {colors, SCREEN_NAME} from '../../constants';

import {styles} from './styles';
import Card from "../../components/Card/Card";
import CardSection from "../../components/Card/CardSection";
import {FontAwesome5} from "@expo/vector-icons";
import CardText from "../../components/Card/CardText";
import {styles as WalletStyles} from "../MyWallet/styles";
import {styles as WhisestStyles} from "../WishesHome/styles";
import {toastNotification} from "../../utils/functions/toastNotifcation";

const flexrow = {flex: 1, flexDirection: 'row', alignItems: 'center'};
const Information = ({navigation}) => {
    const width = useWindowDimensions().width - 20;

    const imageGenerator = (img, height) => (
        <View style={styles.imageContainer}>
            <Image source={img} style={{width, height}} resizeMode="contain"/>
        </View>
    );

    return (
        <Layout>
            <View style={styles.container}>
                <View style={WalletStyles.container}>
                    <Card containerStyle={{flex: 1,}}>
                        <CardSection
                            onPress={() => navigation.navigate(SCREEN_NAME.ABOUT)}>
                            <View style={flexrow}>
                                <View style={WhisestStyles.icon}>
                                    <FontAwesome5
                                        name={'info-circle'}
                                        size={24}
                                        color={colors.primary}
                                    />
                                </View>
                                <CardText>SOBRE NOSOTROS</CardText>
                            </View>
                        </CardSection>
                    </Card>
                </View>
                <View style={WalletStyles.container}>
                    <Card containerStyle={{flex: 1,}}>
                        <CardSection
                            onPress={() => navigation.navigate(SCREEN_NAME.SURVEY)}>
                            <View style={flexrow}>
                                <View style={WhisestStyles.icon}>
                                    <FontAwesome5
                                        name={'edit'}
                                        size={24}
                                        color={colors.primary}
                                    />
                                </View>
                                <CardText>ENCUESTA</CardText>
                            </View>
                        </CardSection>
                    </Card>
                </View>
                <View style={WalletStyles.container}>
                    <Card containerStyle={{flex: 1,}}>
                        <CardSection
                            onPress={() => toastNotification("Under Construction")}>
                            <View style={flexrow}>
                                <View style={WhisestStyles.icon}>
                                    <FontAwesome5
                                        name={'magic'}
                                        size={24}
                                        color={colors.primary}
                                    />
                                </View>
                                <CardText>TOUR</CardText>
                            </View>
                        </CardSection>
                    </Card>
                </View>
            </View>
        </Layout>
    );
};

export default Information;
