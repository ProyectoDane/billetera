import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import MoneyObjectAddRemove
    from '../MoneyObjectAddRemove/MoneyObjectAddRemove';

const AddRemoveWalletBills = ({
                                  initialMoney,
                                  actualMoney,
                                  setActualMoney,
                                  actualMoneyWallet,
                                  setActualMoneyWallet,
                                  totalMoneyWallet }) => {
    useEffect(() => {
        if (totalMoneyWallet !== actualMoneyWallet) {
            setActualMoneyWallet(totalMoneyWallet);
        }
        setActualMoney(JSON.parse(JSON.stringify(initialMoney)));
    }, []);

    const handleAdd = (elem, index) => {
        actualMoney[index].quantity = actualMoney[index].quantity + 1;
        setActualMoneyWallet(actualMoneyWallet + actualMoney[index].amount);
        setActualMoney(actualMoney);
    };

    const handleSub = (elem, index) => {
        actualMoney[index].quantity = actualMoney[index].quantity - 1;
        setActualMoneyWallet(actualMoneyWallet - actualMoney[index].amount);
        setActualMoney(actualMoney);
    };


    return (
        <View>

            <ScrollView
                contentContainerStyle={{
                    paddingVertical: 10,
                    paddingHorizontal: 10
                }}>
                {actualMoney.map((elem, index) => {
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
        </View>
    );
};

export default AddRemoveWalletBills;
