import React, {ReactNode} from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import designToken from '../assets/design-tokens';

interface Props extends TextInputProps {
  right?: ReactNode;
  wrapStyle?: ViewStyle;
}
const CustomInput = (props: Props) => {
  const {right, ...inputProps} = props;
  return (
    <View style={[style.wrap, props.wrapStyle]}>
      <TextInput
        {...inputProps}
        style={[style.input, props.style]}
        placeholderTextColor={designToken.color.Grary.Gray600}
        cursorColor={designToken.color.Grary.Black}
      />
      {right}
    </View>
  );
};

const style = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: designToken.color.Grary.Gray100,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 13,
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: designToken.color.Grary.Gray100,
  },
  input: {
    flex: 1,
  },
});

export default CustomInput;
