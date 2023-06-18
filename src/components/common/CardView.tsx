import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import designToken from '../../assets/design-tokens';

const CardView = (props: ViewProps) => {
  return (
    <Shadow
      offset={[1, 1]}
      startColor={'rgba(73, 73, 73, 0.1)'}
      containerStyle={{width: '100%'}}
      style={{width: '100%'}}
      distance={4}>
      <View {...props} style={[style.card, props.style]}>
        {props.children}
      </View>
    </Shadow>
  );
};

const style = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: designToken.color.Grary.White,
  },
});
export default CardView;
