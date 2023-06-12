import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import designToken from '../assets/design-tokens';
const Button = ({
  onPress,
  title,
  activate = false,
  activateStyle,
  titleColor,
}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!activate}
      style={[
        activate ? style.activeBtn : style.nonActiveBtn,
        style.btn,
        activateStyle,
      ]}>
      <Text
        style={[
          titleColor
            ? {color: titleColor}
            : activate
            ? {color: designToken.color.Grary.White}
            : {color: designToken.color.Grary.Gray700},
          style.title,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  title: {
    fontSize: 16,
    textAlign: 'center',
  },
  nonActiveBtn: {
    backgroundColor: designToken.color.Grary.Gray200,
    color: designToken.color.Grary.Gray700,
  },
  activeBtn: {
    backgroundColor: designToken.color.Green,
    color: designToken.color.Grary.White,
  },
  btn: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 16,
  },
});

export default Button;
