import React, {useState} from 'react';
import Layout from '../../components/Layout';
import {ScrollView, Text, View} from "react-native";
import {styles as WalletStyles} from "../MyWallet/styles";
import Card from "../../components/Card/Card";
import CardSection from "../../components/Card/CardSection";
import CardText from "../../components/Card/CardText";
import {colors, NAVIGATION_TITLE} from "../../constants";
import {FontAwesome5} from "@expo/vector-icons";
import {styles} from "./styles";

const flexrow = {flex: 1, flexDirection: 'row', alignItems: 'center'};


const WishesHome = ({navigation, route}) => {
    const [isLoading, setIsLoading] = useState(false);


    return (
        <Layout>
            <ScrollView contentContainerStyle={WalletStyles.cardGroup}>
                <View style={{...styles.container, marginTop: 10}}>
                    <View style={{flex: 1, flexDirection: "row"}}>
                        <View style={{marginRight: 10}}>
                            <FontAwesome5 name={'info-circle'} size={24}
                                          color={colors.primary}/>
                        </View>
                        <View style={{flex: 1, flexGrow: 1,}}>
                            <Text style={{color: colors.primary}}>PARA CALCULAR
                                EL
                                SALDO DE CADA DESEO SE CONSIDERA EL TOTAL
                                DE <Text
                                    style={{fontWeight: 'bold'}}>MIS
                                    AHORROS</Text></Text>
                        </View>
                    </View>
                </View>
                <View style={WalletStyles.container}>
                    <Card containerStyle={{flex: 1,}}>
                        <CardSection
                            onPress={() => navigation.navigate(NAVIGATION_TITLE.WISHES)}>
                            <View style={flexrow}>
                                <View style={styles.icon}>
                                    <FontAwesome5
                                        name={'magic'}
                                        size={24}
                                        color={colors.primary}
                                    />
                                </View>
                                <CardText>MIS DESEOS</CardText>
                            </View>
                        </CardSection>
                    </Card>
                </View>
                <View style={WalletStyles.container}>
                    <Card containerStyle={{flex: 1,}}>
                        <CardSection
                            onPress={() => navigation.navigate(NAVIGATION_TITLE.WISHES_FULLFILLED)}>
                            <View style={flexrow}>
                                <View style={styles.icon}>
                                    <FontAwesome5
                                        name={'grin-stars'}
                                        size={24}
                                        color={colors.primary}
                                    />
                                </View>
                                <CardText>MIS DESEOS CUMPLIDOS</CardText>
                            </View>
                        </CardSection>
                    </Card>
                </View>
            </ScrollView>
        </Layout>
    );
};

export default WishesHome;
