import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { Controller } from 'react-hook-form';

import { styles } from './styles';

const InputText = ({
  name,
  placeholder,
  label,
  required,
  editable,
  keyboardType, inputStyle,onSubmitEditing
}) => {
  return (
    <Controller
      name={name}
      rules={{ required }}
      render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
        <View>
          {label && <Text style={styles.label}>{label}</Text>}
          <View style={styles.mainView}>
            <TextInput
              {...rest}
              placeholder={placeholder}
              style={{...styles.input, ...inputStyle}}
              onChangeText={(e) => onChange(e)}
              editable={editable}
              keyboardType={keyboardType}
              onSubmitEditing={onSubmitEditing}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </View>
        </View>
      )}
    />
  );
};
export default InputText;
