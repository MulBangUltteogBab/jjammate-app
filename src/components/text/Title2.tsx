import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

const Title2 = (props: TextProps) => {
  return (
    <Text {...props} style={[defaultStyle.defaultStyle, props.style]}>
      {props.children}
    </Text>
  );
};

const defaultStyle = StyleSheet.create({
  defaultStyle: {
    letterSpacing: 1.15,
    fontFamily: 'SUIT-Regular',
    fontSize: 18,
  },
});

export default Title2;
