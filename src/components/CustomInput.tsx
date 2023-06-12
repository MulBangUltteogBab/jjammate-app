import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import designToken from '../assets/design-tokens';

const CustomInput = (props: TextInputProps) => {
  return (
    <TextInput
      {...props}
      style={[style.input, props.style]}
      placeholderTextColor={designToken.color.Grary.Gray600}
    />
  );
};

const style = StyleSheet.create({
  input: {
    backgroundColor: designToken.color.Grary.Gray100,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 13,
  },
});

export default CustomInput;
