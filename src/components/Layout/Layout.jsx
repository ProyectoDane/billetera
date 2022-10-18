import React from 'react';
import {StatusBar, View} from 'react-native';

import {colors} from '../../constants';
import {styles as layoutStyles} from './styles';

const Layout = ({children}, style={}) => {
    return (
        // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        //SafeAreaView ???
        <View style={{...layoutStyles.container, ...(style)}}
              edges={['top', 'left', 'right']}>
            <StatusBar barStyle="dark-content"
                       backgroundColor={colors.white}/>
            {children}
        </View>
        // </TouchableWithoutFeedback>
    );
};

export default Layout;
