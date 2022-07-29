import React, { useContext } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { ToggleContext } from './Card';
import myStyles from './styles';

const CardContent = ({ children, expandable, style }) => {
  const { toggle, expanded, content } = useContext(ToggleContext);

  const styles = StyleSheet.flatten([expandable ? myStyles.cardContent : myStyles.cardContentFlex, style]);
  return (
    <TouchableWithoutFeedback onPress={toggle}>
      <View style={{ flex: 1, paddingHorizontal: 4 }}>
        <View style={styles}>{children}</View>
        {expanded && content}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CardContent;
