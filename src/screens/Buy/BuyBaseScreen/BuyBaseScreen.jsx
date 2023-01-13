import React, {useContext, useEffect, useState} from 'react';
import {Keyboard, ScrollView, Text, View} from 'react-native';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';

import InputText from '../../../components/InputText';
import Layout from '../../../components/Layout';
import {BalanceSchema} from '../../../validations/FormSchemas';
import SingleButton from '../../../components/SingleButton';

import {styles} from './styles';
import {colors, SCREEN_NAME} from '../../../constants';
import {formatAmount, formatNum} from '../../../utils/functions/formatNum';
import {toastNotification} from '../../../utils/functions/toastNotifcation';
import pagarCon from '../../../utils/functions/calculaComoPagar';
import ItemMoney from '../../AddRemove/components/ItemMoney';
import {AddRemoveContext} from '../../AddRemove/AddRemoveContext';
import {bottomButtonContainer} from "../../../constants/styles";

const BuyBaseScreen = ({
                           setActualTotal,
                           setTotalMoneyWallet,
                           totalMoneyWallet,
                           setInitialCoinsMoneyWallet,
                           setInitialBillsMoneyWallet,
                           initialCoinsMoneyWallet,
                           initialBillsMoneyWallet,
                           getDineroWallet,
                           deleteMoneyWallet,
                           handleManualPay,
                       }) => {
    const {setPurchase} = useContext(AddRemoveContext);
    const [valueBuy, setValueBuy] = useState();
    const [optionBill, setOptionBill] = useState('');
    const [optPay, setOptPay] = useState();
    const [vuelto, setVuelto] = useState();
    const [cantidadPagar, setCantidadPagar] = useState();
    const [moneyDB, setMoneyDB] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const schema = BalanceSchema(totalMoneyWallet);
    const methods = useForm({
        defaultValues: {amount: ''}, resolver: yupResolver(schema),
    });

    const {handleSubmit, reset} = methods;

    const tomarDinero = async () => {
        const res = await getDineroWallet();
        if (res.length > 0) {
            let dineroBillDB = res
                .filter((item) => item.isCoins === 0)
                .sort(function (a, b) {
                    return b.id - a.id;
                });
            let dineroCoinDB = res
                .filter((item) => item.isCoins === 1)
                .sort(function (a, b) {
                    return b.amount - a.amount;
                });

            let dineroDB = [...dineroBillDB, ...dineroCoinDB];
            setMoneyDB(dineroDB);
        }
        return res;
    };
    useEffect(() => {
        // Obtiene y ordena el dinero de la billetera
        tomarDinero();
    }, [isLoading]);

    let optionsBills = [];

    const onSubmit = (data) => {
        setOptionBill('');
        // data trae los datos del formulario
        let money = data.amount;

        let resultados = pagarCon(money, moneyDB);

        let resultado = resultados[0];
        let primeraOpcion = resultado.billetes;

        setOptPay(primeraOpcion);
        setVuelto(resultado.vuelto ? formatNum(resultado.vuelto) : null);
        setCantidadPagar(resultado.totales.amount);

        for (let e of primeraOpcion) {
            let especie = e.quantity == 1 ? 'BILLETE' : 'BILLETES';
            if (e.quantity > 0 && e.amount <= 10 && e.isCoins === 1) {
                especie = e.quantity == 1 ? 'MONEDA' : 'MONEDAS';
            }
            optionsBills.push(e.quantity + ' ' + especie + ' DE ' + formatAmount(e.amount,));

        }
        setOptionBill(optionsBills);
        // setOptionCoin(optionsCoins);

        setValueBuy(data.amount);
        reset();
        Keyboard.dismiss();
    };

    const handleContinue = async () => {
        setValueBuy('');
        setOptionBill('');
        setIsLoading(true);
        try {
            let substract = 0;
            let newCoins = [...initialCoinsMoneyWallet];
            let newBills = [...initialBillsMoneyWallet];
            for (let opt of optPay) {
                substract += (opt.amount * opt.quantity);
                await deleteMoneyWallet(opt.userId, opt.moneyId, opt.quantity);
                if (opt.quantity > 0) {
                    const moneyArray = opt.isCoins? newCoins: newBills;
                    moneyArray.forEach((item) => {
                        if (item.id === opt.moneyId) {
                            item.quantity -= opt.quantity;                            
                        }                     
                    });        
                }                
            }
            setInitialBillsMoneyWallet(newBills);
            setInitialCoinsMoneyWallet(newCoins);
            setTotalMoneyWallet(totalMoneyWallet - substract);
            setActualTotal(totalMoneyWallet - substract);
            setPurchase(true);
            navigation.navigate(SCREEN_NAME.HOME);

            vuelto ? toastNotification(`ACORDATE DE CARGAR TU VUELTO DE ${vuelto} EN LA BILLETERA !`, 'info', 'info',) : toastNotification('LA COMPRA SE REALIZÓ CORRECTAMENTE!', 'success', 'success',);

            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (<Layout style={{}}>


            <View container style={{
                flex: 1, // flexBasis: 50,
                // flexGrow: 0,
                // flexShrink: 1,
                flexDirection: 'column', // alignItems: 'flex-start',

            }}>
                <View style={{}}>
                    <FormProvider {...methods}>
                        <View style={{
                            marginBottom: 10, paddingHorizontal: 20,
                        }}>
                            <View
                                style={{flexDirection: 'row', marginTop: 10}}>
                                <Text style={{
                                    ...styles.resultTextLabel, fontWeight: 'bold'
                                }}>
                                    TENES:
                                </Text>
                                <Text style={styles.resultTextAmount}>
                                    {totalMoneyWallet > 0 ? formatNum(totalMoneyWallet) : `$0`}
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            // flex: 1,
                            flexDirection: 'row',
                            alignItems: 'flex-start', ...styles.form,
                            paddingHorizontal: 10,
                            marginBottom: 10,
                        }}>
                            <View style={{flex: 7}}>
                                <InputText
                                    name="amount"
                                    //label="IMPORTE DEL PRODUCTO A COMPRAR"
                                    placeholder="¿CUÁNTO CUESTA? "
                                    keyboardType="numeric"
                                    required
                                    inputStyle={styles.buyInputText}
                                    onSubmitEditing={handleSubmit(onSubmit)}
                                />
                            </View>
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                <SingleButton
                                    icon="calculator"
                                    sizeIcon={22}
                                    style={{
                                        flex: 1,
                                        height: 50,
                                        borderRadius: 10,
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0
                                    }}
                                    onPress={handleSubmit(onSubmit)}
                                />
                            </View>
                        </View>
                    </FormProvider>
                </View>
                {valueBuy ? (<View style={{
                        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', flexGrow: 1,
                    }}>
                        <View style={{
                            display: "flex", flexDirection: "column", flex: 10, justifyContent: "flex-start",
                        }}>

                            <View style={{
                                flexGrow: 1, flexShrink: 0, flex: 1, padding: 10,
                            }}>
                                <View
                                    style={{
                                        borderRadius: 10,
                                        padding: 10, ...styles.optBuyContainer,
                                        borderWidth: 1,
                                        borderColor: 'lightgray',
                                    }}>
                                    <View style={{
                                        flexDirection: 'row', marginTop: 10
                                    }}>
                                        <Text style={styles.resultTextLabel}>
                                            VALOR DE LA COMPRA:
                                        </Text>
                                        <Text style={styles.resultTextAmount}>
                                            {formatNum(valueBuy)}
                                        </Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row', marginBottom: 10
                                    }}>
                                        <Text style={styles.resultTextLabel}>
                                            FORMA DE PAGO SUGERIDA:
                                        </Text>
                                        <Text style={styles.resultTextAmount}>
                                            {formatNum(cantidadPagar)}
                                        </Text>
                                    </View>
                                    {optionBill ? (<ScrollView persistentScrollbar={true}>
                                            <View style={{marginRight: 10}}>
                                                {optionBill.map((item, index) => (<View key={index}
                                                                                        style={styles.itemOptBuy}>
                                                        <Text
                                                            style={{flex: 5, ...styles.text}}>
                                                            {item}
                                                        </Text>
                                                        <ItemMoney
                                                            key={'money_' + index}
                                                            {...optPay[index]}
                                                            style={{
                                                                flex: 3, width: null, height: 60, resizeMode: 'contain',
                                                            }}
                                                        />
                                                    </View>))}
                                            </View>
                                        </ScrollView>) : null}
                                    {vuelto ? (<View
                                            style={{
                                                flexDirection: 'row', marginTop: 10
                                            }}>
                                            <Text
                                                style={{...styles.resultTextLabel, fontWeight: "bold"}}>
                                                TU VUELTO:
                                            </Text>
                                            <Text
                                                style={styles.resultTextAmountVuelto}>
                                                {vuelto}
                                            </Text>
                                        </View>

                                    ) : null}
                                </View>
                            </View>

                            <View style={{...bottomButtonContainer,}}>
                                <View>
                                    <SingleButton
                                        // icon="magic"
                                        // sizeIcon={22}
                                        style={{
                                            width: "100%", marginBottom: 10
                                        }}
                                        label="USAR SUGERIDO"
                                        isLoading={isLoading}
                                        disabled={isLoading}
                                        onPress={handleContinue}
                                    />
                                    <SingleButton
                                        // icon="magic"
                                        // sizeIcon={22}
                                        style={{
                                            width: "100%",
                                            backgroundColor: colors.white,
                                            borderWidth: 2,
                                            borderColor: colors.primary,
                                            color: colors.primary
                                        }}
                                        label="ELEGIR YO"
                                        onPress={() => {
                                            handleManualPay(valueBuy)
                                        }}
                                    />
                                </View>

                            </View>
                        </View>
                    </View>) : null}


            </View>
        </Layout>);
};

export default BuyBaseScreen;
