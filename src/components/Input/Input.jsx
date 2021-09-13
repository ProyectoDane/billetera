import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';

import { styles } from './styles';

const Input = ({ text, placeholder, onFinish }) => {
  const [insideText, setInsideText] = useState(text);

  useEffect(() => {
    setInsideText(text);
  }, [text]);

  const endEditingHandler = (e) => onFinish(e.nativeEvent.text);

  return (
    <View style={{ flexDirection: 'row' }}>
      <TextInput
        style={styles.text}
        autoCapitalize="words"
        value={insideText}
        onChangeText={setInsideText}
        onEndEditing={endEditingHandler}
        maxLength={50}
        multiline={true}
        placeholder={placeholder}
      />
    </View>
  );
};

export default Input;
