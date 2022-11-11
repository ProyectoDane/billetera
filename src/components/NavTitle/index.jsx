import React, {useEffect} from 'react';
import {Text, useWindowDimensions, View} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import {styles} from './styles';
import {colors} from "../../constants";


const NavTitle = ({iconName, title, color = colors.newBlack}) => {
    const screenWidth = useWindowDimensions().width;

    return (
        <View style={{...styles.view, color: color, width: screenWidth - 90}}>
            <FontAwesome5 name={iconName} size={16}/>
            <Text style={{...styles.text, color: color}}>{title}</Text>
        </View>
    )
}


export default NavTitle;
