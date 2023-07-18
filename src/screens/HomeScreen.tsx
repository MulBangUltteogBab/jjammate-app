import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import designToken from '../assets/design-tokens';
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
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  dietAtom,
  getDietSelector,
  kcalSelector,
  nutritionSelector,
} from '../states/home';
import {userInfoSelector} from '../states/user';
import CardView from '../components/common/CardView';
import Headline1 from '../components/text/Headline1';
import Notice from '../components/common/Notice';
import {Shadow} from 'react-native-shadow-2';

function HomeScreen(): JSX.Element {
  // 노치 같은 영역 너비, 높이 받기
  const insets = useSafeAreaInsets();
  const kcalStatus = useRecoilValue(kcalSelector);
  const nutritionStatus = useRecoilValue(nutritionSelector);
  const userInfo = useRecoilValue(userInfoSelector);
  const getDietAPI = useRecoilValue(getDietSelector);
  const [diet, setDiet] = useRecoilState(dietAtom);
  useEffect(() => {
    diet === undefined && setDiet(getDietAPI);
  }, [diet, getDietAPI, setDiet]);
  return (
    <View>
      <ScrollView
        style={{
          backgroundColor: designToken.color.Green,
          paddingTop: insets.top,
        }}>
        <Wrap style={{alignItems: 'flex-end', paddingVertical: 19}}>
          <Notice />
        </Wrap>
        <Wrap style={{paddingBottom: 31, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <LargeTitle style={{color: designToken.color.Grary.White}}>
              {userInfo.username + '님!\n어서오세요.'}
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
                  <Title3>{kcalStatus.taken}</Title3>
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
                    <Title3 style={{textAlign: 'center'}}>
                      {Math.max(0, kcalStatus.remain)}
                    </Title3>
                  </View>
                  <Caption>잔여 칼로리</Caption>
                </View>
                <View style={style.kcalWrap}>
                  <Title3>{kcalStatus.burned}</Title3>
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
                <NutrientRatio nutrition={nutritionStatus} />
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
            {diet ? (
              <ScrollView
                horizontal
                style={{paddingLeft: '5%'}}
                showsHorizontalScrollIndicator={false}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 12,
                    paddingBottom: 34,
                    paddingTop: 20,
                    paddingRight: 40,
                  }}>
                  <Shadow
                    style={{flex: 1}}
                    offset={[1, 1]}
                    startColor={'rgba(73, 73, 73, 0.1)'}
                    distance={4}>
                    <View style={style.menuCard}>
                      <View style={style.timeCard}>
                        <Headline2
                          style={{color: designToken.color.Grary.Gray700}}>
                          🌥️ 조식
                        </Headline2>
                      </View>
                      <View style={{gap: 4}}>
                        {diet.breakfast.map((menu, index) => (
                          <Body2 key={index}>{menu.name}</Body2>
                        ))}
                      </View>
                    </View>
                  </Shadow>
                  <Shadow
                    style={{flex: 1}}
                    offset={[1, 1]}
                    startColor={'rgba(73, 73, 73, 0.1)'}
                    distance={4}>
                    <View style={style.menuCard}>
                      <View style={style.timeCard}>
                        <Headline2
                          style={{color: designToken.color.Grary.Gray700}}>
                          ☀ 중식
                        </Headline2>
                      </View>
                      <View style={{gap: 4}}>
                        {diet.lunch.map((menu, index) => (
                          <Body2 key={index}>{menu.name}</Body2>
                        ))}
                      </View>
                    </View>
                  </Shadow>
                  <Shadow
                    style={{flex: 1}}
                    offset={[1, 1]}
                    startColor={'rgba(73, 73, 73, 0.1)'}
                    distance={4}>
                    <View style={style.menuCard}>
                      <View style={style.timeCard}>
                        <Headline2
                          style={{color: designToken.color.Grary.Gray700}}>
                          🌙 석식
                        </Headline2>
                      </View>
                      <View style={{gap: 4}}>
                        {diet.dinner.map((menu, index) => (
                          <Body2 key={index}>{menu.name}</Body2>
                        ))}
                      </View>
                    </View>
                  </Shadow>
                </View>
              </ScrollView>
            ) : (
              <Wrap style={{marginVertical: 20}}>
                <CardView style={{height: 100, justifyContent: 'center'}}>
                  <Headline1
                    style={{
                      color: designToken.color.Grary.Gray900,
                      textAlign: 'center',
                    }}>
                    식단정보가 없습니다.
                  </Headline1>
                </CardView>
              </Wrap>
            )}
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
    flex: 1,
    borderRadius: 16,
    backgroundColor: designToken.color.Grary.White,
    paddingVertical: 16,
    paddingHorizontal: 14,
    minHeight: 213,
    width: 170,
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
