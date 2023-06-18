import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import designToken from '../../assets/design-tokens';
import Headline1 from '../text/Headline1';

type CustomButtonProps = {
  // 눌렀을때 콜백
  onPress?: () => void;
  // 버튼 텍스트
  title?: String;
  // 버튼 활성화
  activate?: Boolean;
  // 커스텀 활성화 스타일
  activateStyle?: ViewStyle;
  // 버튼 텍스트 색
  titleColor?: string;
};
const CustomButton = ({
  onPress,
  title,
  activate = false,
  activateStyle,
  titleColor,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!activate}
      style={[
        activate ? style.activeBtn : style.nonActiveBtn,
        style.btn,
        activateStyle,
      ]}>
      <Headline1
        style={{
          color: titleColor
            ? titleColor
            : activate
            ? designToken.color.Grary.White
            : designToken.color.Grary.Gray700,
          textAlign: 'center',
        }}>
        {title}
      </Headline1>
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

export default CustomButton;
