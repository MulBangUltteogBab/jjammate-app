import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

const Wrap = (props: ViewProps) => {
  return (
    <View {...props} style={style.wrap}>
      <View style={[style.container, props.style]}>{props.children}</View>
    </View>
  );
};

const style = StyleSheet.create({
  wrap: {
    width: '100%',
    alignItems: 'center',
  },
  container: {
    width: '90%',
  },
});

export default Wrap;
