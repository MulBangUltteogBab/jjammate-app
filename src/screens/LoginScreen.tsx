import {StyleSheet, TouchableHighlight, View} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import Wrap from '../components/Wrap';
import Header from '../components/Header';
import Caption from '../components/text/Caption';
import designToken from '../assets/design-tokens';
import CheckBox from '../components/CheckBox';
import {autoLoginState} from '../states/setting';
import {useRecoilState} from 'recoil';

function LoginScreen(): JSX.Element {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useRecoilState(autoLoginState);
  return (
    <View style={style.container}>
      <Header title="로그인" marginBottom={23} />
      <Wrap style={{gap: 12}}>
        <CustomInput
          placeholder="군번"
          style={{fontSize: 14}}
          onChangeText={text => {
            setId(text);
          }}
        />
        <CustomInput
          placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
          style={{fontSize: 14}}
          secureTextEntry={true}
          onChangeText={text => {
            setPassword(text);
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', gap: 8}}>
            <CheckBox checked={autoLogin} setChecked={setAutoLogin} />
            <Caption style={{color: designToken.color.Grary.Gray700}}>
              자동로그인
            </Caption>
          </View>
          <TouchableHighlight>
            <Caption style={style.caption}>비밀번호 찾기</Caption>
          </TouchableHighlight>
        </View>
        <CustomButton title="로그인" activate={id !== '' && password !== ''} />
        <View style={{height: 17}} />
      </Wrap>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
  },
  caption: {
    color: designToken.color.Grary.Gray400,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    borderBottomColor: designToken.color.Grary.Gray400, // Add this to specify bottom border color
    borderBottomWidth: 1,
    textDecorationColor: designToken.color.Grary.Gray400,
  },
});
export default LoginScreen;
