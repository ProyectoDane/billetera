import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import SingleButton from '../../../../components/SingleButton';
import {AddRemoveContext} from '../../AddRemoveContext';
import {SCREEN_NAME} from '../../../../constants';
import {formatNum} from '../../../../utils/functions/formatNum';
import {toastNotification} from '../../../../utils/functions/toastNotifcation';
import MoneyObjectAddRemove
    from '../MoneyObjectAddRemove/MoneyObjectAddRemove';
import getMoney from "../../../../utils/functions/loadMoneyToContext";
import {innerSaveAddRemove} from "../../utils";

const AddRemoveWalletBills = ({navigation}) => {
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
        initialBillsMoneyWallet,
        setInitialBillsMoneyWallet,
        initialCoinsMoneyWallet
    } = useContext(AddRemoveContext);

    const context = useContext(AddRemoveContext);

    useEffect(() => {
        if (totalMoneyWallet !== actualMoneyWallet) {
            setActualMoneyWallet(totalMoneyWallet);
        }
        setActualBills(JSON.parse(JSON.stringify(initialBillsMoneyWallet)));
    }, []);

    const handleAdd = (elem, index) => {
        actualBills[index].quantity = actualBills[index].quantity + 1;
        setActualMoneyWallet(actualMoneyWallet + actualBills[index].amount);
        setActualBills(actualBills);
    };

    const handleSub = (elem, index) => {
        actualBills[index].quantity = actualBills[index].quantity - 1;
        setActualMoneyWallet(actualMoneyWallet - actualBills[index].amount);
        setActualBills(actualBills);
    };

    const handleSave = async () => {
        setIsLoading(true);

        await innerSaveAddRemove(initialCoinsMoneyWallet, actualCoins, initialBillsMoneyWallet, actualBills);
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
                {actualBills.map((elem, index) => {
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

export default AddRemoveWalletBills;
