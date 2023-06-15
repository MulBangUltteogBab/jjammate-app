import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Title1 from '../../components/text/Title1';
import designToken from '../../assets/design-tokens';

function RegisterCompleteScreen(): JSX.Element {
  return (
    <View style={{height: '100%'}}>
      <View>
        <Title1>
          환영해요!
          {'\n'}
          <Text style={style.logoText}>JJAMMATE</Text>와 함께
          {'\n'}
          건강한 군생활을 시작해보아요!
        </Title1>
      </View>
      <View style={style.imageWrap}>
        <Image
          source={require('../../assets/images/complete.png')}
          style={{width: 155, height: 155}}
        />
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  imageWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'GmarketSansTTFBold',
    fontSize: 22,
    color: designToken.color.Green,
  },
});

export default RegisterCompleteScreen;
