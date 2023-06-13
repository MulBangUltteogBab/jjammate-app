import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import designToken from '../assets/design-tokens';
import CustomButton from '../components/CustomButton';

function LaunchScreen({navigation}: any): JSX.Element {
  return (
    <View style={style.wrap}>
      <View style={style.logoWrap}>
        <Image source={require('../assets/images/logo.png')} />
        <Text style={style.logoText}>JJAMMATE</Text>
      </View>
      <View style={style.btnWrap}>
        <CustomButton
          title="회원가입"
          activate={true}
          onPress={() => {
            navigation.navigate('RegisterScreen');
          }}
        />
        <CustomButton
          title="로그인"
          activate={true}
          activateStyle={style.loginButton}
          titleColor={designToken.color.Grary.Gray700}
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}
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
