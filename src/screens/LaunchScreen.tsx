import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import designToken from '../assets/design-tokens';
import Button from '../components/Button';
function LaunchScreen(): JSX.Element {
  return (
    <View style={style.wrap}>
      <View style={style.logoWrap}>
        <Image source={require('../assets/images/logo.png')} />
        <Text style={style.logoText}>JJAMMATE</Text>
      </View>
      <View style={style.btnWrap}>
        <Button title="회원가입" activate={true} />
        <Button
          title="로그인"
          activate={true}
          activateStyle={style.loginButton}
          titleColor={designToken.color.Grary.Gray700}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  loginButton: {
    borderColor: designToken.color.Grary.Gray300,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: designToken.color.Grary.White,
  },
  wrap: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  btnWrap: {
    display: 'flex',
    width: '90%',
    gap: 15,
    marginBottom: 17,
  },
  logoWrap: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 22.08,
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: 'GmarketSansTTFBold',
    fontSize: 22,
    color: designToken.color.Green,
  },
});
export default LaunchScreen;
