/* eslint-disable @typescript-eslint/no-unused-vars */
import {Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Title1 from '../../components/text/Title1';
import Body2 from '../../components/text/Body2';
import designToken from '../../assets/design-tokens';
import CustomInput from '../../components/common/CustomInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {isReadyAtom, registerInfoAtom} from '../../states/register';

type RegisterInfoScreenProps = {
  index: number;
  route: any;
  navigation: any;
};

function RegisterInfoScreen({
  index,
  navigation,
  route,
}: RegisterInfoScreenProps): JSX.Element {
  // 유저 정보
  const [userInfo, setUserInfo] = useRecoilState(registerInfoAtom);
  // 키보드 감지
  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  // 각 페이지 완료 상태
  const [isReady, setIsReady] = useRecoilState(isReadyAtom);
  useEffect(() => {
    setIsReady(prevState => ({
      ...prevState,
      [index]:
        userInfo.sex !== '' &&
        userInfo.age !== 0 &&
        userInfo.height !== 0 &&
        userInfo.weight !== 0,
    }));
  }, [userInfo, setIsReady, index]);
  return (
    <KeyboardAwareScrollView ref={scrollRef}>
      <View style={style.container}>
        <Title1>사용자님의 신체정보가 필요해요!</Title1>
        <View>
          <Body2
            style={{
              color: designToken.color.Grary.Gray700,
              marginBottom: 25,
            }}>
            성별
          </Body2>
          <View style={style.row}>
            <View style={style.flex}>
              <TouchableOpacity
                style={
                  userInfo.sex === 'f' ? style.iconWrapSeleted : style.iconWrap
                }
                onPress={() => {
                  setUserInfo({...userInfo, sex: 'f'});
                }}>
                <Text style={style.icon}>🙆🏻‍♀️</Text>
              </TouchableOpacity>
              <Body2
                style={{color: designToken.color.Grary.Black, marginTop: 8}}>
                여성
              </Body2>
            </View>
            <View style={style.flex}>
              <TouchableOpacity
                style={
                  userInfo.sex === 'm' ? style.iconWrapSeleted : style.iconWrap
                }
                onPress={() => {
                  setUserInfo({...userInfo, sex: 'm'});
                }}>
                <Text style={style.icon}>🙆🏻‍♂️</Text>
              </TouchableOpacity>
              <Body2
                style={{color: designToken.color.Grary.Black, marginTop: 8}}>
                남성
              </Body2>
            </View>
          </View>
        </View>
        <View style={{gap: 32}}>
          <View style={[style.row, {gap: 8}]}>
            <View style={style.inputWrap}>
              <Body2 style={style.body2}>나이</Body2>
              <CustomInput
                onFocus={event => {
                  scrollRef.current?.scrollToFocusedInput(event.target);
                }}
                onBlur={() => {
                  Keyboard.dismiss();
                }}
                right={
                  <Body2 style={{color: designToken.color.Grary.Gray600}}>
                    세
                  </Body2>
                }
                keyboardType="number-pad"
                onChangeText={text => {
                  if (!Number.isInteger(text)) {
                    setUserInfo({
                      ...userInfo,
                      age: Number(text),
                    });
                  }
                }}
                value={String(userInfo.age)}
              />
            </View>
            <View style={style.inputWrap}>
              <Body2 style={style.body2}>키</Body2>
              <CustomInput
                onFocus={event => {
                  scrollRef.current?.scrollToFocusedInput(event.target);
                }}
                onBlur={() => {
                  Keyboard.dismiss();
                }}
                right={
                  <Body2 style={{color: designToken.color.Grary.Gray600}}>
                    cm
                  </Body2>
                }
                keyboardType="number-pad"
                onChangeText={text => {
                  if (!Number.isInteger(text)) {
                    setUserInfo({
                      ...userInfo,
                      height: Number(text),
                    });
                  }
                }}
                value={String(userInfo.height)}
              />
            </View>
          </View>
          <View style={[style.row, {gap: 8}]}>
            <View style={style.inputWrap}>
              <Body2 style={style.body2}>몸무게</Body2>
              <CustomInput
                onFocus={event => {
                  scrollRef.current?.scrollToFocusedInput(event.target);
                }}
                onBlur={() => {
                  Keyboard.dismiss();
                }}
                right={
                  <Body2 style={{color: designToken.color.Grary.Gray600}}>
                    kg
                  </Body2>
                }
                keyboardType="number-pad"
                onChangeText={text => {
                  if (!Number.isInteger(text)) {
                    setUserInfo({
                      ...userInfo,
                      weight: Number(text),
                    });
                  }
                }}
                value={String(userInfo.weight)}
              />
            </View>
            <View style={style.inputWrap} />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const style = StyleSheet.create({
  inputWrap: {
    flex: 1,
    gap: 12,
  },
  body2: {
    color: designToken.color.Grary.Gray700,
    // width: '100%',
  },
  container: {
    gap: 47,
    // paddingBottom: 100,
  },
  row: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
    alignItems: 'center',
  },
  iconWrap: {
    backgroundColor: designToken.color.Grary.Gray100,

    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: designToken.color.Grary.Gray100,
    padding: 34,
    borderRadius: 100,
  },
  iconWrapSeleted: {
    backgroundColor: 'rgba(33, 195, 137, 0.2)',
    // opacity: 0.2,
    padding: 34,
    borderRadius: 100,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: designToken.color.Green,
  },
  icon: {
    fontSize: 48,
  },
});
export default RegisterInfoScreen;
