import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

const Title3 = (props: TextProps) => {
  return (
    <Text {...props} style={[defaultStyle.defaultStyle, props.style]}>
      {props.children}
    </Text>
  );
};

const defaultStyle = StyleSheet.create({
  defaultStyle: {
    letterSpacing: 1,
    fontFamily: 'SUIT-Bold',
    fontSize: 16,
  },
});

export default Title3;
