/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Title1 from '../text/Title1';
import Body2 from '../text/Body2';
import designToken from '../../assets/design-tokens';
import CustomInput from '../common/CustomInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {isReadyAtom, registerInfoAtom} from '../../states/register';
import CustomButton from '../common/CustomButton';
import Wrap from '../common/Wrap';
import {userInfoSelector} from '../../states/user';
import Header from '../common/Header';
import http from '../../utils/http';
import {userCodeSelector} from '../../states/setting';
import {trigerAtom} from '../../states/utils';

function UpdateUserInfoModal({visible, setVisible}: any): JSX.Element {
  // 유저 정보
  const setTriger = useSetRecoilState(trigerAtom);
  const code = useRecoilValue(userCodeSelector);
  const user = useRecoilValue(userInfoSelector);
  const [userInfo, setUserInfo] = useState({
    height: 0,
    weight: 0,
  });

  useEffect(() => {
    setUserInfo({
      height: user.height,
      weight: user.weight,
    });
  }, [user]);
  // 키보드 감지
  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  return (
    <Modal visible={visible}>
      <View style={{height: '100%', justifyContent: 'space-between'}}>
        <Header
          title="회원정보 수정"
          onPress={() => {
            setVisible(false);
          }}
        />
        <Wrap>
          <KeyboardAwareScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}>
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
                        user.sex === 'f'
                          ? style.iconWrapSeleted
                          : style.iconWrap
                      }>
                      <Text style={style.icon}>🙆🏻‍♀️</Text>
                    </TouchableOpacity>
                    <Body2
                      style={{
                        color: designToken.color.Grary.Black,
                        marginTop: 8,
                      }}>
                      여성
                    </Body2>
                  </View>
                  <View style={style.flex}>
                    <TouchableOpacity
                      style={
                        user.sex === 'm'
                          ? style.iconWrapSeleted
                          : style.iconWrap
                      }>
                      <Text style={style.icon}>🙆🏻‍♂️</Text>
                    </TouchableOpacity>
                    <Body2
                      style={{
                        color: designToken.color.Grary.Black,
                        marginTop: 8,
                      }}>
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
                      editable={false}
                      selectTextOnFocus={false}
                      value={user.age !== 0 ? String(user.age) : ''}
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
                      value={
                        userInfo.height !== 0 ? String(userInfo.height) : ''
                      }
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
                      value={
                        userInfo.weight !== 0 ? String(userInfo.weight) : ''
                      }
                    />
                  </View>
                  <View style={style.inputWrap} />
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </Wrap>
        <Wrap style={{marginBottom: 10}}>
          <CustomButton
            title="저장"
            activate={true}
            onPress={async () => {
              try {
                await http.post('/common/api/modify/', {
                  ...code,
                  ...userInfo,
                });
                setTriger(pre => pre + 1);
              } catch (err) {
                console.log(err);
              }
              setVisible(false);
            }}
          />
        </Wrap>
      </View>
    </Modal>
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
export default UpdateUserInfoModal;
