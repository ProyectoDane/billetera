import React from 'react';
import {StatusBar, View} from 'react-native';

import {colors} from '../../constants';
import {styles} from './styles';

const Layout = ({children}) => {
    return (
        // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        //SafeAreaView ???
        <View style={{...styles.container}}
              edges={['top', 'left', 'right']}>
            <StatusBar barStyle="dark-content"
                       backgroundColor={colors.white}/>
            {children}
        </View>
        // </TouchableWithoutFeedback>
    );
};

export default Layout;
