import React, { Fragment } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from "./WalletCarrouselItemStyles";
import { colors } from '../../constants';
import Money from './Money';

export default function WalletCarrouselItem({ itemInfo, nextStep, prevStep }){
    const { asset, nombre, cantidad, valor } = itemInfo

    //TODO: hacer switch segun imagen, no poner asset desde backend
    const handleImage = () => require("../../../assets/billetes/20Guanaco.png")

    return(
        <Fragment>
            <View style={styles.wrapperMoney}>
                <TouchableHighlight onPress={prevStep}>
                    <Ionicons name="arrow-back-circle" size={48} color={colors.miBilletera} />
                </TouchableHighlight>
                <Money src={handleImage()} name={nombre}/>
                <TouchableHighlight onPress={nextStep}>
                    <Ionicons style={styles.horizontalReverse} name="arrow-back-circle" size={48} color={colors.miBilletera} />
                </TouchableHighlight>
            </View>
            <View style={styles.wrapperValues}>
                <Text style={styles.value}>
                    VALOR: 
                    <Text style={{fontWeight: "bold"}}>
                        ${valor}
                    </Text>
                </Text>
                <Text style={styles.value}>
                    CANTIDAD: 
                    <Text style={{fontWeight: "bold"}}>
                        {cantidad}
                    </Text>
                </Text>
                <Text style={styles.value}>
                    TOTAL: 
                    <Text style={{fontWeight: "bold"}}>
                        ${cantidad*valor}
                    </Text>
                </Text>
            </View>
        </Fragment>
    )
}