import React from 'react';
import {View} from 'react-native';
import {NumberProp} from 'react-native-svg';

const Spacer = (height: NumberProp) => {
  return <View style={{height: height}} />;
};

export default Spacer;
