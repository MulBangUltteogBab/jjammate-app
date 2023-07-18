import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import designToken from '../assets/design-tokens';
import Colors from '../assets/Colors';
import Title3 from '../components/text/Title3';
import Wrap from '../components/common/Wrap';
import Headline2 from '../components/text/Headline2';
import CalendarIcon from '../assets/icons/calendar.svg';
import CardView from '../components/common/CardView';
import Body2 from '../components/text/Body2';
import NutrientRatio from '../components/nutrition/NutrientRatio';
import {ProgressCircle} from 'react-native-svg-charts';
import Caption from '../components/text/Caption';
import PxRecommend from '../components/nutrition/PxRecommend';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Slick from 'react-native-slick';
import PlusIcon from '../assets/icons/plus.svg';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import PencilIcon from '../assets/icons/pencil.svg';
import {getDietSelector, kcalSelector, nutritionSelector} from '../states/home';
import {Menu} from '../@types/nutrition';
import {getTakenFoodsSelector} from '../states/nutrition';
import Header from '../components/common/Header';
import CancelIcon from '../assets/icons/cancel.svg';
import http from '../utils/http';
import {userCodeSelector} from '../states/setting';
import PxListScreen from './PxListScreen';
import {trigerAtom} from '../states/utils';

function NutritionScreen(): JSX.Element {
  const code = useRecoilValue(userCodeSelector);
  const kcalStatus = useRecoilValue(kcalSelector);
  const nutritionStatus = useRecoilValue(nutritionSelector);

  const [slickHeight, setSlickHeight] = useState(0);
  const insets = useSafeAreaInsets();
  // 선택 날짜
  const nowDate = new Date();
  const date =
    String(nowDate.getFullYear()) +
    '.' +
    String(nowDate.getMonth() + 1) +
    '.' +
    String(nowDate.getDate());

  const [menuCards, setMenuCards] = useState<JSX.Element[]>([]);

  const diet = useRecoilValue(getDietSelector);

  const taken = useRecoilValue(getTakenFoodsSelector);

  const [onTakenModal, setOnTakenModal] = useState(false);
  const [pxListVisible, setPxListVisible] = useState(false);

  const setTriger = useSetRecoilState(trigerAtom);
  useEffect(() => {
    const renderMenuCard = (menus: Menu[], type: string) => {
      const sumCalorie = Math.round(
        menus.reduce((acc: number, cur: Menu) => {
          return acc + Number(cur.calorie);
        }, 0),
      );
      const sumCarbohydrate = Math.round(
        menus.reduce((acc: number, cur: Menu) => {
          return acc + Number(cur.carbohydrate);
        }, 0),
      );
      const sumProtein = Math.round(
        menus.reduce((acc: number, cur: Menu) => {
          return acc + Number(cur.protein);
        }, 0),
      );
      const sumFat = Math.round(
        menus.reduce((acc: number, cur: Menu) => {
          return acc + Number(cur.fat);
        }, 0),
      );
      interface MenuNames {
        [key: string]: number;
      }
      let menuNames = {} as MenuNames;
      if (type === 'snack') {
        menus.forEach((menu: Menu) => {
          menuNames[menu.name] = menuNames[menu.name]
            ? menuNames[menu.name] + 1
            : 1;
        });
      }
      return (
        <Wrap
          onLayout={event => {
            const {height} = event.nativeEvent.layout;
            if (height > slickHeight) {
              setSlickHeight(height);
            }
          }}
          key={type}
          style={{
            minHeight: slickHeight,
          }}>
          <CardView style={[style.menuCard, {minHeight: slickHeight}]}>
            <View
              key={type}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={style.typeCard}>
                <Headline2 style={Colors.Gray700}>
                  {(type === 'breakfast' && '🌥️ 조식') ||
                    (type === 'lunch' && '☀ 중식') ||
                    (type === 'dinner' && '🌙 석식') ||
                    (type === 'snack' && '🧁 간식')}
                </Headline2>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  gap: 4,
                }}>
                <Body2 style={Colors.Gray700}>총</Body2>
                <Headline2 style={Colors.Green}>{sumCalorie}</Headline2>
                <Body2 style={Colors.Gray700}>kcal</Body2>
              </View>
            </View>
            <View style={style.hr} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{gap: 4, flex: 1}}>
                {type !== 'snack'
                  ? menus.map((menu: Menu, index: number) => {
                      return (
                        <Body2 style={Colors.Gray700} key={index}>
                          {menu.name}
                        </Body2>
                      );
                    })
                  : Object.keys(menuNames).map(
                      (menuName: string, index: number) => {
                        return (
                          <Body2 style={Colors.Gray700} key={index}>
                            {menuName + '  ' + menuNames[menuName] + '개'}
                          </Body2>
                        );
                      },
                    )}
              </View>
              <View
                style={{
                  justifyContent: 'flex-end',
                  gap: 11,
                }}>
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
                  <Caption style={Colors.Gray700}>{sumCarbohydrate}g</Caption>
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
                  <Caption style={Colors.Gray700}>{sumProtein}g</Caption>
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
                  <Caption style={Colors.Gray700}>{sumFat}g</Caption>
                </View>
              </View>
            </View>
          </CardView>
        </Wrap>
      );
    };

    diet !== undefined &&
      setMenuCards([
        renderMenuCard(diet.breakfast, 'breakfast'),
        renderMenuCard(diet.lunch, 'lunch'),
        renderMenuCard(diet.dinner, 'dinner'),
        taken &&
          renderMenuCard(
            taken.taken.map(food => {
              return {
                name: food.name,
                calorie: food.calorie,
                carbohydrate: food.carbohydrate,
                protein: food.protein,
                fat: food.fat,
                amount: food.amount,
              } as Menu;
            }),
            'snack',
          ),
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
              }}
              onPress={() => {
                setPxListVisible(true);
              }}>
              <Caption style={Colors.Gray500}>식단 추가하기</Caption>
              <PlusIcon />
            </TouchableOpacity>
          </CardView>
        </Wrap>,
      ]);
  }, [diet, slickHeight, taken]);
  return (
    <>
      <PxListScreen
        visible={pxListVisible}
        back={() => {
          setPxListVisible(false);
        }}
        isTotal={true}
      />
      <Modal visible={onTakenModal}>
        <SafeAreaView style={{flex: 1}}>
          <Header
            title="오늘 먹은 음식"
            onPress={() => {
              setOnTakenModal(false);
            }}
          />
          <ScrollView style={{flex: 1}}>
            <View>
              {taken &&
                taken.taken.length > 0 &&
                taken.taken.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        borderBottomColor: designToken.color.Grary.Gray100,
                        borderBottomWidth: 1,
                        paddingVertical: 14,
                      }}>
                      <Wrap
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 12,
                            alignItems: 'center',
                          }}>
                          <Image
                            source={{
                              uri:
                                http.defaults.baseURL +
                                item.image.slice(1, item.image.length),
                            }}
                            style={{width: 72, height: 72, borderRadius: 8}}
                          />
                          <View style={{gap: 4}}>
                            <Headline2 style={{color: designToken.color.Green}}>
                              {item.name}
                            </Headline2>
                            <Body2
                              style={{color: designToken.color.Grary.Gray500}}>
                              {item.amount}g
                            </Body2>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                          }}>
                          <Caption style={Colors.Gray700}>
                            {item.calorie}kcal
                          </Caption>
                          <TouchableOpacity
                            onPress={async () => {
                              try {
                                http.delete('/diet/api/settakenfood/', {
                                  data: {
                                    ...code,
                                    food: item.name,
                                  },
                                });
                              } catch (err) {
                                console.log(err);
                              }
                              setTriger(pre => pre + 1);
                            }}>
                            <CancelIcon width={20} height={20} />
                          </TouchableOpacity>
                        </View>
                      </Wrap>
                    </View>
                  );
                })}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
      <SafeAreaView style={{height: '100%'}}>
        <View style={style.appBar}>
          <Title3 style={Colors.Gray700}>영양</Title3>
        </View>
        <ScrollView
          style={{flex: 1, backgroundColor: designToken.color.Grary.Gray100}}>
          <View
            style={{
              gap: 30,
              paddingTop: 20,
              paddingBottom: insets.bottom + 20,
            }}>
            <Wrap>
              <View style={style.row}>
                <Headline2 style={Colors.Gray700}>{date}</Headline2>
                <TouchableOpacity>
                  <CalendarIcon />
                </TouchableOpacity>
              </View>
              <CardView
                style={{paddingVertical: 20, paddingHorizontal: 15, gap: 20}}>
                <View style={[style.row, {marginBottom: 0}]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 4,
                      alignItems: 'center',
                    }}>
                    <Title3 style={Colors.Green}>{kcalStatus.taken}</Title3>
                    <Body2 style={Colors.Gray700}>/</Body2>
                    <Body2 style={Colors.Gray700}>
                      {kcalStatus.total}
                      kcal
                    </Body2>
                  </View>
                  {/* <TouchableOpacity>
                  <RightIcon />
                </TouchableOpacity> */}
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
                        {nutritionStatus.taken.carbohydrate}
                      </Title3>
                      <Caption style={[Colors.Gray900, {marginBottom: 10}]}>
                        /{nutritionStatus.total.carbohydrate}
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
                        {nutritionStatus.taken.protein}
                      </Title3>
                      <Caption style={[Colors.Gray900, {marginBottom: 10}]}>
                        /{nutritionStatus.total.protein}
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
                        {nutritionStatus.taken.fat}
                      </Title3>
                      <Caption style={[Colors.Gray900, {marginBottom: 10}]}>
                        /{nutritionStatus.total.fat}
                      </Caption>
                      <Caption style={Colors.Gray700}>지방</Caption>
                    </View>
                  </View>
                </View>
                <NutrientRatio nutrition={nutritionStatus} />
              </CardView>
            </Wrap>
            <View>
              <Wrap
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 16,
                }}>
                <Title3 style={{color: designToken.color.Grary.Gray700}}>
                  오늘의 식단
                </Title3>
                <TouchableOpacity
                  onPress={() => {
                    setOnTakenModal(true);
                  }}>
                  <PencilIcon />
                </TouchableOpacity>
              </Wrap>
              <Slick
                style={{height: slickHeight + 15, paddingVertical: 10}}
                loop={false}
                showsPagination={false}>
                {menuCards}
              </Slick>
            </View>
            <PxRecommend isTotal={true} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
