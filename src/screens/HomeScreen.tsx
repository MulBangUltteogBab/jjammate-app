import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import designToken from '../assets/design-tokens';
import BellIcon from '../assets/icons/bell.svg';
import Wrap from '../components/common/Wrap';
import LargeTitle from '../components/text/LargeTitle';
import HomeLogo from '../assets/icons/home-logo.svg';
import Caption from '../components/text/Caption';
import Title3 from '../components/text/Title3';
import {ProgressCircle} from 'react-native-svg-charts';
import Headline2 from '../components/text/Headline2';
import Body2 from '../components/text/Body2';
import RightAllrow from '../assets/icons/right.svg';
import NutrientRatio from '../components/NutrientRatio';
function HomeScreen(): JSX.Element {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{
        backgroundColor: designToken.color.Green,
        paddingTop: insets.top,
      }}>
      <Wrap style={{alignItems: 'flex-end', paddingVertical: 19}}>
        <TouchableOpacity>
          <BellIcon />
        </TouchableOpacity>
      </Wrap>
      <Wrap style={{paddingBottom: 31, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <LargeTitle style={{color: designToken.color.Grary.White}}>
            {'뭐시기님!\n'}어서오세요.
          </LargeTitle>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <HomeLogo style={{marginRight: 10}} />
        </View>
      </Wrap>
      <View style={style.contentArea}>
        <View style={style.card}>
          <Wrap>
            <View style={{flexDirection: 'row'}}>
              <View style={style.kcalWrap}>
                <Title3>1256</Title3>
                <Caption>섭취 칼로리</Caption>
              </View>
              <View style={style.kcalWrap}>
                <View style={{width: '100%'}}>
                  <View style={style.progressCircle}>
                    <ProgressCircle
                      style={{
                        height: 80,
                        width: 80,
                      }}
                      progress={0.7}
                      progressColor={designToken.color.Green}
                      backgroundColor={designToken.color.Grary.Gray100}
                      startAngle={-Math.PI * 0.7}
                      endAngle={Math.PI * 0.7}
                      strokeWidth={8}
                    />
                  </View>
                  <Title3 style={{textAlign: 'center'}}>{1235}</Title3>
                </View>
                <Caption>잔여 칼로리</Caption>
              </View>
              <View style={style.kcalWrap}>
                <Title3>1256</Title3>
                <Caption>소비 칼로리</Caption>
              </View>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: designToken.color.Grary.Gray200,
                marginBottom: 20,
              }}
            />
            <View>
              <Headline2
                style={{
                  color: designToken.color.Grary.Gray700,
                  marginBottom: 16,
                }}>
                오늘 먹은 탄단지
              </Headline2>
              <NutrientRatio
                carbohydrate={{value: 1234, percent: 55}}
                protein={{value: 1234, percent: 30}}
                fat={{value: 1234, percent: 15}}
              />
            </View>
          </Wrap>
        </View>
        <View style={[style.card]}>
          <Wrap>
            <Title3
              style={{
                color: designToken.color.Grary.Gray800,
                marginTop: 28,
                marginBottom: 20,
              }}>
              오늘의 부대 식단
            </Title3>
          </Wrap>
          <ScrollView horizontal style={{paddingLeft: '5%'}}>
            <View style={{flexDirection: 'row', gap: 8}}>
              <View style={style.menuCard}>
                <Headline2 style={style.timeCard}>🌥️ 조식</Headline2>
                <View style={{gap: 4}}>
                  <Body2>test</Body2>
                  <Body2>test</Body2>
                  <Body2>test</Body2>
                  <Body2>test</Body2>
                </View>
              </View>
              <View style={style.menuCard}>
                <Headline2 style={style.timeCard}>☀ 중식</Headline2>
              </View>
              <View style={style.menuCard}>
                <Headline2 style={style.timeCard}>🌙 석식</Headline2>
              </View>
            </View>
          </ScrollView>
          <Wrap style={{paddingBottom: insets.bottom + 50}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Title3 style={{color: designToken.color.Grary.Gray800}}>
                  PX 상품 추천
                </Title3>
                <Caption style={{color: designToken.color.Grary.Gray700}}>
                  BMI를 분석하여 최적의 상품을 추천해드려요
                </Caption>
              </View>
              <TouchableOpacity>
                <RightAllrow />
              </TouchableOpacity>
            </View>
          </Wrap>
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  contentArea: {
    backgroundColor: designToken.color.Grary.Gray100,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    gap: 14,
  },
  card: {
    backgroundColor: designToken.color.Grary.White,
    borderRadius: 24,
  },
  kcalWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 22,
    marginTop: 60,
    marginBottom: 40,
  },
  progressCircle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  menuCard: {
    borderRadius: 16,
    backgroundColor: designToken.color.Grary.White,
    shadowColor: 'rgba(73, 73, 73)',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    marginBottom: 100,
    elevation: 3,
    paddingVertical: 16,
    paddingHorizontal: 14,
    minHeight: 213,
    width: 146,
    // flexDirection: 'column',
  },
  timeCard: {
    padding: 4,
    backgroundColor: designToken.color.Grary.Gray100,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 11,
  },
});
export default HomeScreen;
