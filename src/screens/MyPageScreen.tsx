/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import Title3 from '../components/text/Title3';
import designToken from '../assets/design-tokens';
import Wrap from '../components/common/Wrap';
import CardView from '../components/common/CardView';
import Headline1 from '../components/text/Headline1';
import PencilIcon from '../assets/icons/pencil.svg';
import Headline2 from '../components/text/Headline2';
import MarkerIcon from '../assets/icons/marker.svg';
import {Caption} from 'react-native-paper';
import Body2 from '../components/text/Body2';
import PolicyModal from '../components/common/PolicyModal';
import LicenseModal from '../components/common/LicenseModal';
import Caption2 from '../components/text/Caption2';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {noticeSelector, userCodeSelector} from '../states/setting';
import {userInfoSelector} from '../states/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import UpdateUserInfoModal from '../components/Mypage/UpdateUserInfoModal';

const hexToRGB = (hex: any) => {
  hex = hex.replace('#', '');
  hex = '0x' + hex;
  const r = (hex >> 16) & 0xff;
  const g = (hex >> 8) & 0xff;
  const b = hex & 0xff;
  return `rgba(${r}, ${g}, ${b}, 0.1)`;
};
const bmiColors = [
  designToken.color.Blue,
  designToken.color.Green,
  '#FFAE18',
  designToken.color.Pink,
  designToken.color.Red,
];

const MyPageScreen = () => {
  const navigation = useNavigation();

  const setCode = useSetRecoilState(userCodeSelector);
  const [noticeSave, setNoticeSave] = useRecoilState(noticeSelector);
  const [notice, setNotice] = useState(noticeSave);

  const userInfo = useRecoilValue(userInfoSelector);

  const bmiLabels = ['저체중', '정상', '과체중', '비만', '고도비만'];
  const [bmiList, setBmiList] = useState([18.5, 23, 25, 30]);

  const [bmiIndex, setBmiIndex] = useState(0);
  const [onPolicy, setOnPolicy] = useState(false);
  const [onLicense, setOnLicense] = useState(false);

  const [onUpdate, setOnUpdate] = useState(false);
  useEffect(() => {
    for (let i = 0; i < bmiList.length; i++) {
      if (userInfo.bmi < bmiList[i]) {
        setBmiIndex(i);
        break;
      }
    }
    if (userInfo.bmi > bmiList[bmiList.length - 1]) {
      setBmiIndex(bmiList.length);
    }
  }, [bmiList, userInfo.bmi]);
  useEffect(() => {
    setNoticeSave(notice);
  }, [notice, setNoticeSave]);
  useEffect(() => {
    setNoticeSave(notice);
  }, [notice, setNoticeSave]);
  return (
    <>
      <UpdateUserInfoModal visible={onUpdate} setVisible={setOnUpdate} />
      <LicenseModal visible={onLicense} setVisible={setOnLicense} />
      <PolicyModal visible={onPolicy} setVisible={setOnPolicy} />
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: designToken.color.Grary.Gray100,
            height: '100%',
          }}>
          <CardView style={style.card}>
            <Title3
              style={{
                paddingVertical: 17,
                textAlign: 'center',
                backgroundColor: designToken.color.Grary.White,
                color: designToken.color.Grary.Gray700,
              }}>
              마이페이지
            </Title3>
            <Wrap style={{flexDirection: 'row', paddingVertical: 23, gap: 24}}>
              <Image
                source={require('../assets/images/Profile.png')}
                style={{width: 74, height: 74, borderRadius: 100}}
              />
              <View style={{gap: 8}}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                  <Headline1 style={style.gray900}>
                    {userInfo.username}
                  </Headline1>
                  {/* <PencilIcon /> */}
                </View>
                <Headline1 style={style.gray900}>
                  {userInfo.department}
                </Headline1>
                <Headline1 style={style.gray900}>
                  {userInfo.military_serial_number}
                </Headline1>
              </View>
            </Wrap>
          </CardView>
          <View
            style={{
              marginTop: 27,
              backgroundColor: designToken.color.Grary.White,
              marginBottom: 42,
            }}>
            <Wrap
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
                marginBottom: 30,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 14,
                }}>
                <Headline2 style={{color: designToken.color.Grary.Black}}>
                  BMI
                </Headline2>

                <Headline2
                  style={{
                    opacity: 1,
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                    color: bmiColors[bmiIndex],
                    backgroundColor: hexToRGB(bmiColors[bmiIndex]),
                  }}>
                  {bmiLabels[bmiIndex] +
                    ' ' +
                    Math.round(userInfo.bmi * 100) / 100}
                </Headline2>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setOnUpdate(true);
                }}>
                <PencilIcon width={16} height={16} />
              </TouchableOpacity>
            </Wrap>
            <Wrap>
              <View style={{flexDirection: 'row'}}>
                {bmiColors.map((color, index) => {
                  return (
                    <View key={index} style={{flex: 1, alignItems: 'center'}}>
                      {index === bmiIndex && (
                        <MarkerIcon fill={bmiColors[bmiIndex]} />
                      )}
                    </View>
                  );
                })}
              </View>
              <View style={{flexDirection: 'row', marginTop: 3}}>
                {bmiColors.map((color, index) => {
                  return (
                    <View
                      key={index}
                      style={[
                        {
                          backgroundColor: color,
                          flex: 1,
                          height: 12,
                        },
                        index === 0 && {
                          borderTopLeftRadius: 8,
                          borderBottomLeftRadius: 8,
                        },
                        index === 4 && {
                          borderTopRightRadius: 8,
                          borderBottomRightRadius: 8,
                        },
                      ]}
                    />
                  );
                })}
              </View>
              <View
                style={{flexDirection: 'row', marginTop: 7, marginBottom: 15}}>
                {bmiColors.map((color, index) => {
                  return (
                    <View key={index} style={{flex: 1, alignItems: 'center'}}>
                      <Caption2
                        style={{color: designToken.color.Grary.Gray800}}>
                        {bmiLabels[index]}
                      </Caption2>
                    </View>
                  );
                })}
              </View>
            </Wrap>
          </View>
          <Wrap style={{marginBottom: 13}}>
            <Caption style={style.gray700}>설정</Caption>
          </Wrap>
          <View style={{backgroundColor: designToken.color.Grary.White}}>
            <Wrap
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 47,
                alignItems: 'center',
              }}>
              <Body2 style={style.gray900}>알림설정</Body2>
              <Switch
                value={notice}
                onChange={() => setNotice(previousState => !previousState)}
                trackColor={{
                  false: designToken.color.Grary.Gray200,
                  true: designToken.color.Green,
                }}
                thumbColor={
                  notice
                    ? designToken.color.Green
                    : designToken.color.Grary.Gray500
                }
              />
            </Wrap>
            <View
              style={{
                backgroundColor: designToken.color.Grary.Gray200,
                height: 1,
              }}
            />
            <TouchableOpacity
              style={style.touch}
              onPress={async () => {
                // await AsyncStorage.removeItem('military_serial_number');
                setCode({
                  military_serial_number: '',
                });
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'LaunchScreen'}],
                  }),
                );
                // navigation.navigate('LaunchScreen' as never);
              }}>
              <Wrap>
                <Body2 style={style.gray900}>로그아웃</Body2>
              </Wrap>
            </TouchableOpacity>
          </View>

          <Wrap style={{marginBottom: 13, marginTop: 23}}>
            <Caption style={style.gray700}>설정</Caption>
          </Wrap>
          <View>
            <TouchableOpacity
              style={style.touch}
              onPress={() => {
                setOnPolicy(true);
              }}>
              <Wrap>
                <Body2 style={style.gray900}>개인정보처리방침</Body2>
              </Wrap>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.touch}
              onPress={() => {
                setOnLicense(true);
              }}>
              <Wrap>
                <Body2 style={style.gray900}>오픈소스 라이센스</Body2>
              </Wrap>
            </TouchableOpacity>
            <View style={style.touch}>
              <Wrap>
                <Body2 style={style.gray900}>버전 정보 v0.0.0</Body2>
              </Wrap>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const style = StyleSheet.create({
  card: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  gray900: {
    color: designToken.color.Grary.Gray900,
  },
  gray700: {
    color: designToken.color.Grary.Gray700,
  },
  touch: {
    backgroundColor: designToken.color.Grary.White,
    borderBottomColor: designToken.color.Grary.Gray200,
    borderBottomWidth: 1,
    height: 47,
    justifyContent: 'center',
  },
});
export default MyPageScreen;
