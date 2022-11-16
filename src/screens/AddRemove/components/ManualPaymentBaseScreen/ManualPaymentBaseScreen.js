import React, {useState} from 'react';
import {Text, useWindowDimensions, View} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';

import SingleButton from '../../../../components/SingleButton';
import {colors} from '../../../../constants';
import {formatNum} from '../../../../utils/functions/formatNum';
import {FontAwesome5} from "@expo/vector-icons";
import {styles as commonStyles} from '../../commonAddRemoveStyles';
import {bottomButtonContainer, shadow} from "../../../../constants/styles";
import {default as cardStyles} from "../../../../components/Card/styles";
import {styles as itemWishStyles} from "../../../MyWishes/components/ItemWish/styles";
import AddRemoveMoney from "../../components/AddRemoveMoney";

export default function ManualPaymentBaseScreen({ navigation,
                                                    actualBills,
                                                    setActualBills,
                                                    actualCoins,
                                                    setActualCoins,
                                                    initialBillsMoneyWallet,
                                                    initialCoinsMoneyWallet,
                                                    totalPaymentWallet,
                                                    setTotalPaymentWallet,
                                                    handleSave}) {
    const [isLoading, setIsLoading] = useState(false);


    const [totalFreeze] = useState(() => totalPaymentWallet);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return (
                    <AddRemoveMoney
                        initialMoney={initialBillsMoneyWallet}
                        actualMoney={actualBills}
                        setActualMoney={setActualBills}
                        actualMoneyWallet={totalPaymentWallet}
                        setActualMoneyWallet={setTotalPaymentWallet}
                        totalMoneyWallet={totalPaymentWallet}
                        isBuyFlow={true}

                    />
                );
            case 'second':
                return (
                    <AddRemoveMoney
                        initialMoney={initialCoinsMoneyWallet}
                        actualMoney={actualCoins}
                        setActualMoney={setActualCoins}
                        actualMoneyWallet={totalPaymentWallet}
                        setActualMoneyWallet={setTotalPaymentWallet}
                        totalMoneyWallet={totalPaymentWallet}
                        isBuyFlow={true}
                    />
                );

            default:
                return null;
        }
    };

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'BILLETES' },
        { key: 'second', title: 'MONEDAS' },
    ]);

    const innerHandleSave = async function () {
        setIsLoading(true);
        await handleSave();
        setIsLoading(false);
    }

    const getTabBarIcon = (props) => {
        const { route } = props;
        if (route.key === 'first') {
            return <FontAwesome5 name="money-bill-wave" size={20} color={colors.primary} />;
        } else {
            return <FontAwesome5 name="coins" size={20} color={colors.primary} />;
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    ...cardStyles.card,
                    margin: 10,
                    width: "auto",
                    flex: 1,
                    flexBasis: 60,
                    paddingVertical: 10,
                    // flexShrink: 1,
                    flexGrow: 0,
                    ...shadow,
                }}>
                <View style={{...itemWishStyles.itemTextRow}}>
                    <Text style={{...itemWishStyles.itemLabel}}>TOTAL</Text>
                    <Text style={{...itemWishStyles.valueItem}}>{formatNum(totalFreeze)}</Text>
                </View>
                {totalPaymentWallet > 0 ? (
                    <View style={{...itemWishStyles.itemTextRow}}>
                        <Text style={{...itemWishStyles.itemLabel}}>TE FALTA PAGAR</Text>
                        <Text style={{...itemWishStyles.valueItem}}>{formatNum(totalPaymentWallet)}</Text>
                    </View>
                ) : (
                    totalPaymentWallet === 0 ? (
                        <View style={{...itemWishStyles.itemTextRow}}>
                            <Text style={{...itemWishStyles.itemLabel}}>PAGASTE JUSTO</Text>
                        </View>
                    ) : (
                        <View style={{...itemWishStyles.itemTextRow}}>
                            <Text style={{...itemWishStyles.itemLabel}}>TU VUELTO ES </Text>
                            <Text style={{...itemWishStyles.valueItem,
                                ...itemWishStyles.valueItemSpecial}}>{formatNum(Math.abs(totalPaymentWallet))}</Text>
                        </View>
                    )
                ) }
            </View>

            <View style={{...cardStyles.card, ...shadow, flex: 15, margin: 10, width: "auto", flexGrow: 1,}}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={(props) => (
                        <TabBar
                            {...props}
                            indicatorStyle={commonStyles.indicatorStyle}
                            style={{ backgroundColor: colors.white}}
                            renderIcon={(props) => getTabBarIcon(props)}
                            tabStyle={commonStyles.tabStyle}
                            labelStyle={commonStyles.tabLabel}
                        />)}

                />
            </View>
            <View
                style={{
                    ...bottomButtonContainer,
                    flexBasis: 130,
                    paddingBottom: 40,
                    paddingTop: 15
                }}>
                <SingleButton
                    icon="money-bill-wave"
                    sizeIcon={22}
                    label="CONFIRMAR"
                    isLoading={isLoading}
                    disabled={
                        isLoading || (totalPaymentWallet !== 0 && totalPaymentWallet > 0)
                    }
                    onPress={innerHandleSave}
                    style={{
                        width: "100%",
                        marginBottom: 10,
                        backgroundColor:
                            totalPaymentWallet !== 0 && totalPaymentWallet > 0
                                ? colors.disable
                                : colors.primary,
                    }}
                />
                <SingleButton
                    style={{
                        width: "100%",
                        backgroundColor: colors.white,
                        borderWidth: 2,
                        borderColor: colors.primary,
                        color: colors.primary
                    }}
                    label="VOLVER"
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
            </View>
        </View>
    );
}
