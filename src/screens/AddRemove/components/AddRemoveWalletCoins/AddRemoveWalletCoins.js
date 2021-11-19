import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View,} from 'react-native';
import SingleButton from '../../../../components/SingleButton';
import {AddRemoveContext} from '../../AddRemoveContext';
import {SCREEN_NAME} from '../../../../constants';
import {formatNum} from '../../../../utils/functions/formatNum';
import {toastNotification} from '../../../../utils/functions/toastNotifcation';
import getMoney from "../../../../utils/functions/loadMoneyToContext";
import {innerSaveAddRemove} from "../../utils";
import MoneyObjectAddRemove from "../MoneyObjectAddRemove";


const AddRemoveWalletCoins = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        actualBills,
        setActualBills,
        actualCoins,
        setActualCoins,
        totalMoneyWallet,
        setTotalMoneyWallet,
        actualMoneyWallet,
        setActualMoneyWallet,
        initialCoinsMoneyWallet,
        setInitialCoinsMoneyWallet,
        initialBillsMoneyWallet
    } = useContext(AddRemoveContext);

    const context = useContext(AddRemoveContext);

    const coins = actualCoins;
    const setCoins = setActualCoins;

    const bills = actualBills;
    const setBills = setActualBills;

    useEffect(() => {
        if (totalMoneyWallet !== actualMoneyWallet) {
            setActualMoneyWallet(totalMoneyWallet);
        }
        setActualCoins(JSON.parse(JSON.stringify(initialCoinsMoneyWallet)));
        setCoins(JSON.parse(JSON.stringify(initialCoinsMoneyWallet)));
    }, []);

    const handleAdd = (elem, index) => {
        let newCoins = coins;
        newCoins[index].quantity = newCoins[index].quantity + 1;
        setActualMoneyWallet(actualMoneyWallet + newCoins[index].amount);
        setCoins(newCoins);
    };

    const handleSub = (elem, index) => {
        let newCoins = coins;
        newCoins[index].quantity = newCoins[index].quantity - 1;
        setActualMoneyWallet(actualMoneyWallet - newCoins[index].amount);
        setCoins(newCoins);
    };

    const handleSave = async () => {
        setIsLoading(true);

        await innerSaveAddRemove(initialCoinsMoneyWallet, coins, initialBillsMoneyWallet, bills);
        await getMoney(context);
        toastNotification(
            'SE ACTUALIZO EL DINERO CORRECTAMENTE!',
            'success',
            'success',
        );
        navigation.navigate(SCREEN_NAME.HOME);
    };

    return (
        <View
            style={{
                marginBottom: 90,
            }}>
            <View style={{backgroundColor: '#BBB'}}>
                <Text style={{fontSize: 30, textAlign: 'center'}}>
                    Total {formatNum(actualMoneyWallet)}
                </Text>
            </View>
            <ScrollView
                contentContainerStyle={{
                    paddingVertical: 10,
                    paddingHorizontal: 10
                }}>
                {coins.map((elem, index) => {
                    return (
                        <MoneyObjectAddRemove
                            key={`name: ${elem.image} - amount: ${elem.amount}`}
                            handleAdd={() => handleAdd(elem, index)}
                            handleSub={() => handleSub(elem, index)}
                            {...elem}
                        />
                    );
                })}
            </ScrollView>
            <View style={{paddingVertical: 5}}>
                <SingleButton
                    icon="money-bill-wave"
                    sizeIcon={22}
                    label="GUARDAR"
                    isLoading={isLoading}
                    disabled={isLoading}
                    onPress={handleSave}
                    style={styles.container}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
    },
});

export default AddRemoveWalletCoins;
