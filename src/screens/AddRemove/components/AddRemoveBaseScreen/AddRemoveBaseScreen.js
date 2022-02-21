import * as React from 'react';
import {useState} from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    useWindowDimensions,
    View
} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';
import AddRemoveWalletBills from '../AddRemoveWalletBills';
import {formatNum} from '../../../../utils/functions/formatNum';
import SingleButton from '../../../../components/SingleButton';
import {colors} from '../../../../constants';
import {FontAwesome5} from "@expo/vector-icons";

export default function AddRemoveBaseScreen({
                                                navigation,
                                                actualBills, //array: billetes en la instancia
                                                setActualBills,
                                                actualCoins, //array: coins en la instancia
                                                setActualCoins,
                                                totalMoneyWallet, //number: El total guardado en la BD
                                                actualMoneyWallet, //number: El total antes de guardar (auxiliar)
                                                setActualMoneyWallet,
                                                initialBillsMoneyWallet, //array: billetes iniciales (guardados en la BD)
                                                initialCoinsMoneyWallet, //array: coins  iniciales (guardados en la BD)
                                                handleSave,
}) {
    const [isLoading, setIsLoading] = useState(false);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return (
                    <AddRemoveWalletBills
                        initialMoney={initialBillsMoneyWallet}
                        actualMoney={actualBills}
                        setActualMoney={setActualBills}
                        actualMoneyWallet={actualMoneyWallet}
                        setActualMoneyWallet={setActualMoneyWallet}
                        totalMoneyWallet={totalMoneyWallet}
                    />
                );
            case 'second':
                return (
                    <AddRemoveWalletBills
                        initialMoney={initialCoinsMoneyWallet}
                        actualMoney={actualCoins}
                        setActualMoney={setActualCoins}
                        actualMoneyWallet={actualMoneyWallet}
                        setActualMoneyWallet={setActualMoneyWallet}
                        totalMoneyWallet={totalMoneyWallet}
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

    const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);


    React.useEffect(()=>{
        setHasUnsavedChanges(Boolean(totalMoneyWallet - actualMoneyWallet != 0));
        // console.log(`${actualMoneyWallet}, ${totalMoneyWallet}, ${hasUnsavedChanges}`);
    },[actualMoneyWallet]);

    const innerHandleSave = async () => {
        setHasUnsavedChanges(false); //Prevent "Dirty check" on navigation leave after saving
        return handleSave();
    }

    //Check for dirty changes before exiting
    React.useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                if (!hasUnsavedChanges) {
                    // If we don't have unsaved changes, then we don't need to do anything
                    return;
                }

                // Prevent default behavior of leaving the screen
                e.preventDefault();

                // Prompt the user before leaving the screen
                Alert.alert(
                    'Discard changes?',
                    'You have unsaved changes. Are you sure to discard them and leave the screen? '
                    + (totalMoneyWallet-actualMoneyWallet) + " //" +totalMoneyWallet + " // " +actualMoneyWallet + " //" + hasUnsavedChanges,
                    [
                        { text: "Don't leave", style: 'cancel', onPress: () => {} },
                        {
                            text: 'Discard',
                            style: 'destructive',
                            // If the user confirmed, then we dispatch the action we blocked earlier
                            // This will continue the action that had triggered the removal of the screen
                            onPress: () => navigation.dispatch(e.data.action),
                        },
                    ]
                );
            }),
        [navigation, hasUnsavedChanges]
    );

    const getTabBarIcon = (props) => {
        const {route} = props
        if (route.key === 'first') {
            return <FontAwesome5 name='money-bill-wave' size={20} color={'white'}/>
        } else {
            return <FontAwesome5 name='coins' size={20} color={'white'}/>

        }
    }

    const styles = StyleSheet.create({
        scene: {
            flex: 1,
        },
        tabLabel: {

        },
        tabStyle: {
            flex: 1,
            flexDirection: 'row',
        },
    })

    return (
        <View style={{ flex: 1}}>
            <View style={{
                margin: 5,
                flex: 0.1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                <View style={{
                    backgroundColor: 'white',
                    padding: 5,
                    borderRadius: 10
                }}>
                    <Text style={{ fontSize: 30,
                    }}>
                        Total {formatNum(actualMoneyWallet)}
                    </Text>
                </View>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={props =>
                    <TabBar
                        {...props}
                        indicatorStyle={{backgroundColor: colors.secondary, height: 5}}
                        renderIcon={
                            props => getTabBarIcon(props)
                        }
                        tabStyle={styles.tabStyle}
                        labelStyle={styles.labelStyle}
                    />
                }
            />
            <View style={{ paddingVertical: 0,
                //  backgroundColor: colors.primary
            }}>
                <SingleButton
                    icon="money-bill-wave"
                    sizeIcon={22}
                    label="GUARDAR"
                    isLoading={isLoading}
                    disabled={isLoading}
                    onPress={innerHandleSave}
                    style={{...styles.container, width: "100%", height: 50}}
                />
            </View>
        </View>
    );
}

