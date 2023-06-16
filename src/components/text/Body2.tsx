import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import designToken from '../../assets/design-tokens';

const Body2 = (props: TextProps) => {
  return (
    <Text {...props} style={[defaultStyle.defaultStyle, props.style]}>
      {props.children}
    </Text>
  );
};

const defaultStyle = StyleSheet.create({
  defaultStyle: {
    letterSpacing: 0.87,
    fontFamily: 'SUIT-Regular',
    fontSize: 14,
    color: designToken.color.Grary.Gray700,
  },
});

export default Body2;
