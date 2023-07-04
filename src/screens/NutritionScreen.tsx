import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import designToken from '../assets/design-tokens';
import Colors from '../assets/Colors';
import Title3 from '../components/text/Title3';
import Wrap from '../components/common/Wrap';
import Headline2 from '../components/text/Headline2';
import CalendarIcon from '../assets/icons/calendar.svg';
import CardView from '../components/common/CardView';
import Body2 from '../components/text/Body2';
import RightIcon from '../assets/icons/right.svg';
import NutrientRatio from '../components/nutrition/NutrientRatio';
import {ProgressCircle} from 'react-native-svg-charts';
import Caption from '../components/text/Caption';
import PxRecommend from '../components/nutrition/PxRecommend';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Slick from 'react-native-slick';
import PlusIcon from '../assets/icons/plus.svg';

function NutritionScreen(): JSX.Element {
  const [slickHeight, setSlickHeight] = useState(0);
  const insets = useSafeAreaInsets();
  // 선택 날짜
  const [nowDate, __] = useState('2023.06.13');
  // 영양 정보
  const [nutrition, _] = useState({
    currentKcal: 1234,
    totalKcal: 2345,
    detail: {
      carbohydrate: {
        value: 1234,
        total: 2000,
        percent: 55,
      },
      protein: {
        value: 1234,
        total: 2000,
        percent: 30,
      },
      fat: {
        value: 1234,
        total: 2000,
        percent: 15,
      },
    },
  });
  // 식단 정보
  const [menuList, ___] = useState([
    {
      id: '0',
      type: 'breakfast',
      kcal: 1234,
      carbohydrate: 1234,
      protein: 1234,
      fat: 1234,
      list: ['밥', '감자국', '멸치볶음', '맛김', '닭순살야채조림', '김치'],
    },
    {
      id: '1',
      type: 'lunch',
      kcal: 1234,
      carbohydrate: 1234,
      protein: 1234,
      fat: 1234,
      list: ['밥', '감자국', '멸치볶음', '맛김', '닭순살야채조림', '김치'],
    },
    {
      id: '2',
      type: 'dinner',
      kcal: 1234,
      carbohydrate: 1234,
      protein: 1234,
      fat: 1234,
      list: ['밥', '감자국', '멸치볶음', '맛김', '닭순살야채조림', '김치'],
    },
    {
      id: '3',
      type: 'snack',
      kcal: 1234,
      carbohydrate: 1234,
      protein: 1234,
      fat: 1234,
      list: ['꼬깔콘', '참치캔', '컵라면'],
    },
  ]);
  let menuCards = menuList.map((menu: any) => {
    return (
      <Wrap
        onLayout={event => {
          const {height} = event.nativeEvent.layout;
          if (height > slickHeight) {
            setSlickHeight(height);
            console.log(height);
          }
        }}
        key={menu.id}
        style={{
          minHeight: slickHeight,
        }}>
        <CardView style={[style.menuCard, {minHeight: slickHeight}]}>
          <View
            key={menu.id}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={style.typeCard}>
              <Headline2 style={Colors.Gray700}>
                {(menu.type === 'breakfast' && '🌥️ 조식') ||
                  (menu.type === 'lunch' && '☀ 중식') ||
                  (menu.type === 'dinner' && '🌙 석식') ||
                  (menu.type === 'snack' && '🧁 간식')}
              </Headline2>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                gap: 4,
              }}>
              <Body2 style={Colors.Gray700}>총</Body2>
              <Headline2 style={Colors.Green}>{menu.kcal}</Headline2>
              <Body2 style={Colors.Gray700}>kcal</Body2>
            </View>
          </View>
          <View style={style.hr} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{gap: 4}}>
              {menu.list.map((data: string) => {
                return <Body2 style={Colors.Gray700}>{data}</Body2>;
              })}
            </View>
            <View style={{justifyContent: 'flex-end', gap: 11}}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 4,
                  alignItems: 'center',
                }}>
                <View
                  style={[
                    style.square,
                    {backgroundColor: designToken.color.Green},
                  ]}
                />
                <Caption style={Colors.Gray700}>탄수화물</Caption>
                <Caption style={Colors.Gray700}>
                  {menu.carbohydrate.value}
                </Caption>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 4,
                  alignItems: 'center',
                }}>
                <View
                  style={[
                    style.square,
                    {backgroundColor: designToken.color.Blue},
                  ]}
                />
                <Caption style={Colors.Gray700}>단백질</Caption>
                <Caption style={Colors.Gray700}>{menu.protein.value}</Caption>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 4,
                  alignItems: 'center',
                }}>
                <View
                  style={[
                    style.square,
                    {backgroundColor: designToken.color.Pink},
                  ]}
                />
                <Caption style={Colors.Gray700}>지방</Caption>
                <Caption style={Colors.Gray700}>{menu.fat.value}</Caption>
              </View>
            </View>
          </View>
        </CardView>
      </Wrap>
    );
  });
  menuCards.push(
    <Wrap
      key={'add'}
      style={{
        minHeight: slickHeight,
      }}>
      <CardView
        style={[
          style.menuCard,
          {
            minHeight: slickHeight,
            justifyContent: 'center',
          },
        ]}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            minHeight: slickHeight - 50,
          }}>
          <Caption style={Colors.Gray500}>식단 추가하기</Caption>
          <PlusIcon />
        </TouchableOpacity>
      </CardView>
    </Wrap>,
  );
  return (
    <SafeAreaView style={{height: '100%'}}>
      <View style={style.appBar}>
        <Title3 style={Colors.Gray700}>영양</Title3>
      </View>
      <ScrollView
        style={{flex: 1, backgroundColor: designToken.color.Grary.Gray100}}>
        <View
          style={{gap: 30, paddingTop: 20, paddingBottom: insets.bottom + 20}}>
          <Wrap>
            <View style={style.row}>
              <Headline2 style={Colors.Gray700}>{nowDate}</Headline2>
              <TouchableOpacity>
                <CalendarIcon />
              </TouchableOpacity>
            </View>
            <CardView
              style={{paddingVertical: 20, paddingHorizontal: 15, gap: 20}}>
              <View style={[style.row, {marginBottom: 0}]}>
                <View
                  style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
                  <Title3 style={Colors.Green}>{nutrition.currentKcal}</Title3>
                  <Body2 style={Colors.Gray700}>/</Body2>
                  <Body2 style={Colors.Gray700}>{nutrition.totalKcal}</Body2>
                </View>
                <TouchableOpacity>
                  <RightIcon />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={style.circleWrap}>
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
                  <View style={style.circleInfo}>
                    <Title3 style={[Colors.Gray900, {marginBottom: 5}]}>
                      {nutrition.detail.carbohydrate.value}
                    </Title3>
                    <Caption style={[Colors.Gray900, {marginBottom: 10}]}>
                      /{nutrition.detail.carbohydrate.total}
                    </Caption>
                    <Caption style={Colors.Gray700}>탄수화물</Caption>
                  </View>
                </View>
                <View style={style.circleWrap}>
                  <View style={style.progressCircle}>
                    <ProgressCircle
                      style={{
                        height: 80,
                        width: 80,
                      }}
                      progress={0.7}
                      progressColor={designToken.color.Blue}
                      backgroundColor={designToken.color.Grary.Gray100}
                      startAngle={-Math.PI * 0.7}
                      endAngle={Math.PI * 0.7}
                      strokeWidth={8}
                    />
                  </View>
                  <View style={style.circleInfo}>
                    <Title3 style={[Colors.Gray900, {marginBottom: 5}]}>
                      {nutrition.detail.protein.value}
                    </Title3>
                    <Caption style={[Colors.Gray900, {marginBottom: 10}]}>
                      /{nutrition.detail.protein.total}
                    </Caption>
                    <Caption style={Colors.Gray700}>단백질</Caption>
                  </View>
                </View>
                <View style={style.circleWrap}>
                  <View style={style.progressCircle}>
                    <ProgressCircle
                      style={{
                        height: 80,
                        width: 80,
                      }}
                      progress={0.7}
                      progressColor={designToken.color.Pink}
                      backgroundColor={designToken.color.Grary.Gray100}
                      startAngle={-Math.PI * 0.7}
                      endAngle={Math.PI * 0.7}
                      strokeWidth={8}
                    />
                  </View>
                  <View style={style.circleInfo}>
                    <Title3 style={[Colors.Gray900, {marginBottom: 5}]}>
                      {nutrition.detail.fat.value}
                    </Title3>
                    <Caption style={[Colors.Gray900, {marginBottom: 10}]}>
                      /{nutrition.detail.fat.total}
                    </Caption>
                    <Caption style={Colors.Gray700}>지방</Caption>
                  </View>
                </View>
              </View>
              <NutrientRatio {...nutrition.detail} />
            </CardView>
          </Wrap>
          <Slick
            style={{height: slickHeight + 15, paddingVertical: 10}}
            loop={false}
            showsPagination={false}>
            {menuCards}
          </Slick>
          <PxRecommend />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  typeCard: {
    padding: 4,
    backgroundColor: designToken.color.Grary.Gray100,
    borderRadius: 8,
  },
  menuCard: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    gap: 11,
  },
  hr: {
    height: 1,
    backgroundColor: designToken.color.Grary.Gray100,
  },
  progressCircle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  appBar: {
    borderBottomColor: designToken.color.Grary.Gray200,
    borderBottomWidth: 1,
    paddingVertical: 17,
    alignItems: 'center',
  },
  circleWrap: {
    flex: 1,
  },
  circleInfo: {
    paddingTop: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    borderRadius: 2,
    width: 10,
    height: 10,
  },
});
export default NutritionScreen;
