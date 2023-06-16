/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Title1 from '../../components/text/Title1';
import CustomInput from '../../components/common/CustomInput';
import {useRecoilState} from 'recoil';
import {isReadyAtom, registerInfoAtom} from '../../states/register';
import {HelperText} from 'react-native-paper';
import designToken from '../../assets/design-tokens';

export enum InfoType {
  nickName = 'nickName',
  serialNumber = 'serialNumber',
  password = 'password',
  passwordConfirm = 'passwordConfirm',
}

type RegisterInputScreenProps = {
  infoType: InfoType;
  index: number;
  route: any;
  navigation: any;
};

const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

function RegisterInputScreen({
  infoType,
  index,
  route,
  navigation,
}: RegisterInputScreenProps): JSX.Element {
  const [userInfo, setUserInfo] = useRecoilState(registerInfoAtom);
  const [isReady, setIsReady] = useRecoilState(isReadyAtom);
  const titleContent = {
    nickName: '이름이 무엇인가요?',
    serialNumber: '군번이 무엇인가요?',
    password: '비밀번호를 입력해주세요',
    passwordConfirm: '비밀번호를 다시 한번 입력해주세요',
  };
  const placeholderContent = {
    nickName: '이름?',
    serialNumber: '군번',
    password: '비밀번호',
    passwordConfirm: '비밀번호 확인',
  };

  const getBorder = () => {
    if (infoType === InfoType.password && userInfo.password !== '') {
      return isReady[index] ? style.ready : style.notReady;
    } else if (
      infoType === InfoType.passwordConfirm &&
      userInfo.passwordConfirm !== ''
    ) {
      return isReady[index] ? style.ready : style.notReady;
    } else {
      return {};
    }
  };
  return (
    <View style={{height: '100%'}}>
      <Title1>{titleContent[infoType]}</Title1>
      <View style={{height: 32}} />
      <CustomInput
        onChangeText={text => {
          setUserInfo({
            ...userInfo,
            [infoType]: text,
          });
          if (
            infoType !== InfoType.password &&
            infoType !== InfoType.passwordConfirm
          ) {
            setIsReady({
              ...isReady,
              [index]: text !== '',
            });
          } else {
            if (infoType === InfoType.password) {
              setIsReady({
                ...isReady,
                [index]: passwordRegEx.test(text),
              });
            } else {
              setIsReady({
                ...isReady,
                [index]: userInfo[InfoType.password] == text,
              });
            }
          }
        }}
        value={userInfo[infoType]}
        style={{fontSize: 22}}
        wrapStyle={getBorder()}
        placeholder={placeholderContent[infoType]}
        secureTextEntry={
          infoType === InfoType.password ||
          infoType === InfoType.passwordConfirm
        }
      />
      {infoType === InfoType.password && (
        <HelperText
          type={isReady[index] || userInfo.password === '' ? 'info' : 'error'}>
          영문, 숫자, 특수문자 조합 8자리 이상
        </HelperText>
      )}
      {infoType === InfoType.passwordConfirm && (
        <HelperText
          type={
            isReady[index] || userInfo.passwordConfirm === '' ? 'info' : 'error'
          }>
          비밀번호를 확인해주세요!
        </HelperText>
      )}
    </View>
  );
}
const style = StyleSheet.create({
  ready: {
    borderColor: designToken.color.Green,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  notReady: {
    borderColor: designToken.color.Red,
    borderWidth: 2,
    borderStyle: 'solid',
  },
});

export default RegisterInputScreen;
