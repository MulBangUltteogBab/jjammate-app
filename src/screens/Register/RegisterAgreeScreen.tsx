/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CheckBox from '../../components/CheckBox';
import Headline1 from '../../components/text/Headline1';
import Title1 from '../../components/text/Title1';
import Check from '../../components/Check';
import Body2 from '../../components/text/Body2';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {isReadyAtom, registerAgreeAtom} from '../../states/register';

type RegisterAgreeScreenProps = {
  index: number;
  route: any;
  navigation: any;
};

function RegisterAgreeScreen({
  index,
  route,
  navigation,
}: RegisterAgreeScreenProps): JSX.Element {
  const [registerAgree, setRegisterAgree] = useRecoilState(registerAgreeAtom);
  const [isReady, setIsReady] = useRecoilState(isReadyAtom);

  useEffect(() => {
    setIsReady(prevState => ({
      ...prevState,
      [index]: registerAgree.age && registerAgree.privacy && registerAgree.term,
    }));
  }, [index, registerAgree, setIsReady]);

  // useEffect(() => {
  //   update();
  // }, [update]);

  return (
    <View style={{height: '100%'}}>
      <Title1>약관동의가 필요해요!</Title1>
      <View style={{height: 109}} />
      <View style={style.row}>
        <CheckBox
          checked={
            registerAgree.age &&
            registerAgree.privacy &&
            registerAgree.term &&
            registerAgree.ad
          }
          onChange={() => {
            if (
              registerAgree.age &&
              registerAgree.privacy &&
              registerAgree.term &&
              registerAgree.ad
            ) {
              setRegisterAgree({
                age: false,
                term: false,
                privacy: false,
                ad: false,
              });
            } else {
              setRegisterAgree({
                age: true,
                term: true,
                privacy: true,
                ad: true,
              });
            }
          }}
          size={24}
        />
        <Headline1>모두 동의(선택 약관 포함)</Headline1>
      </View>
      <View style={{height: 56}} />
      <View style={{gap: 8}}>
        <View style={style.row}>
          <Check
            checked={registerAgree.age}
            onChange={() => {
              setRegisterAgree({...registerAgree, age: !registerAgree.age});
            }}
          />
          <Body2>[필수] 14세 이상</Body2>
        </View>
        <View style={style.row}>
          <Check
            checked={registerAgree.term}
            onChange={() => {
              setRegisterAgree({...registerAgree, term: !registerAgree.term});
            }}
          />
          <Body2>[필수] 이용약관 동의</Body2>
        </View>
        <View style={style.row}>
          <Check
            checked={registerAgree.privacy}
            onChange={() => {
              setRegisterAgree({
                ...registerAgree,
                privacy: !registerAgree.privacy,
              });
            }}
          />
          <Body2>[필수] 개인정보 처리 방침 동의</Body2>
        </View>
        <View style={style.row}>
          <Check
            checked={registerAgree.ad}
            onChange={() => {
              setRegisterAgree({...registerAgree, ad: !registerAgree.ad});
            }}
          />
          <Body2>[선택] 광고성 정보 수집 및 마케팅 활용 동의</Body2>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
});
export default RegisterAgreeScreen;
