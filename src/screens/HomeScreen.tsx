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
import NutrientRatio from '../components/nutrition/NutrientRatio';
import PxRecommend from '../components/nutrition/PxRecommend';

function HomeScreen(): JSX.Element {
  const insets = useSafeAreaInsets();

  return (
    <View>
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
              <View style={{marginBottom: 30}}>
                <Headline2
                  style={{
                    color: designToken.color.Grary.Gray700,
                    marginBottom: 16,
                  }}>
                  오늘 먹은 탄단지
                </Headline2>
                <NutrientRatio
                  carbohydrate={{value: 1234, total: 2000, percent: 55}}
                  protein={{value: 1234, total: 2000, percent: 30}}
                  fat={{value: 1234, total: 2000, percent: 15}}
                />
              </View>
            </Wrap>
          </View>
          <View style={[style.card, {paddingBottom: insets.bottom + 50}]}>
            <Wrap>
              <Title3
                style={{
                  color: designToken.color.Grary.Gray800,
                  marginTop: 28,
                }}>
                오늘의 부대 식단
              </Title3>
            </Wrap>
            <ScrollView
              horizontal
              style={{paddingLeft: '5%'}}
              showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 8,
                  paddingBottom: 34,
                  paddingTop: 20,
                }}>
                <View style={style.menuCard}>
                  <View style={style.timeCard}>
                    <Headline2 style={{color: designToken.color.Grary.Gray700}}>
                      🌥️ 조식
                    </Headline2>
                  </View>
                  <View style={{gap: 4}}>
                    <Body2>test</Body2>
                    <Body2>test</Body2>
                    <Body2>test</Body2>
                    <Body2>test</Body2>
                  </View>
                </View>
                <View style={style.menuCard}>
                  <View style={style.timeCard}>
                    <Headline2 style={{color: designToken.color.Grary.Gray700}}>
                      ☀ 중식
                    </Headline2>
                  </View>
                </View>
                <View style={style.menuCard}>
                  <View style={style.timeCard}>
                    <Headline2 style={{color: designToken.color.Grary.Gray700}}>
                      🌙 석식
                    </Headline2>
                  </View>
                </View>
              </View>
            </ScrollView>
            <PxRecommend />
          </View>
        </View>
      </ScrollView>
    </View>
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
    // width: 60,
    // alignItems: 'center',
    marginBottom: 11,
  },
});
export default HomeScreen;
