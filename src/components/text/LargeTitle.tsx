import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

const LargeTitle = (props: TextProps) => {
  return (
    <Text {...props} style={[defaultStyle.defaultStyle, props.style]}>
      {props.children}
    </Text>
  );
};

const defaultStyle = StyleSheet.create({
  defaultStyle: {
    letterSpacing: 1.77,
    fontFamily: 'SUIT-Regular',
    fontSize: 28,
  },
});

export default LargeTitle;
