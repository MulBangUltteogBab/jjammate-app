import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

const Headline2 = (props: TextProps) => {
  return (
    <Text {...props} style={[defaultStyle.defaultStyle, props.style]}>
      {props.children}
    </Text>
  );
};

const defaultStyle = StyleSheet.create({
  defaultStyle: {
    letterSpacing: 0.87,
    fontFamily: 'SUIT-SemiBold',
    fontSize: 14,
  },
});

export default Headline2;
