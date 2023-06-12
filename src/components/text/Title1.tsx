import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

const Title1 = (props: TextProps) => {
  return (
    <Text {...props} style={[defaultStyle.defaultStyle, props.style]}>
      {props.children}
    </Text>
  );
};

const defaultStyle = StyleSheet.create({
  defaultStyle: {
    letterSpacing: 1.33,
    fontFamily: 'SUIT-Regular',
    fontSize: 22,
  },
});

export default Title1;
