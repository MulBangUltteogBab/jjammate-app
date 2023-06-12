import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

const Caption = (props: TextProps) => {
  return (
    <Text {...props} style={[defaultStyle.defaultStyle, props.style]}>
      {props.children}
    </Text>
  );
};

const defaultStyle = StyleSheet.create({
  defaultStyle: {
    letterSpacing: 0.75,
    fontFamily: 'SUIT-Regular',
    fontSize: 13,
  },
});

export default Caption;
