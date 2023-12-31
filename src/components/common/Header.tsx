import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Title3 from '../text/Title3';
import Wrap from './Wrap';
import {useNavigation} from '@react-navigation/native';
import designToken from '../../assets/design-tokens';
import BackImage from '../../assets/icons/back.svg';

type HeaderProps = {
  // 헤더 텍스트 내용
  title?: string;
  // 너비 화면의 90%로 조정
  wrap?: boolean;
  // 아래 마진값
  marginBottom?: number;
  // 눌렀을 시 콜백함수
  onPress?: any;
};
const Header = ({
  title = ' ',
  wrap = true,
  marginBottom = 0,
  onPress,
}: HeaderProps) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack(); // 뒤로가기 동작
  };
  return (
    <Wrap
      style={{
        ...style.wrap,
        marginBottom: marginBottom,
        width: !wrap ? '100%' : '90%',
      }}>
      <TouchableOpacity
        onPress={onPress ? onPress : handleGoBack}
        style={style.backButton}>
        <BackImage />
      </TouchableOpacity>
      {title && <Title3 style={style.title}>{title}</Title3>}
    </Wrap>
  );
};

const style = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    // height: 56,
    // marginBottom: 23,
  },
  container: {
    width: '90%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    paddingVertical: 17,
    color: designToken.color.Grary.Gray700,
  },
});

export default Header;
