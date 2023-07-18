import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PxItem from '../components/nutrition/PxItem';
import Header from '../components/common/Header';
import Wrap from '../components/common/Wrap';
import designToken from '../assets/design-tokens';
// import RNPickerSelect from 'react-native-picker-select';
import DownIcon from '../assets/icons/down.svg';
import Title3 from '../components/text/Title3';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomButton from '../components/common/CustomButton';
import Caption from '../components/text/Caption';
// import SettingIcon from '../assets/icons/setting.svg';

import CheckOn from '../assets/icons/check-on.svg';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
  getPxFoodsSelector,
  getPxFoodsTotalSelector,
  pxFoodsAtom,
  pxFoodsTotalAtom,
} from '../states/home';
import {useRecoilState, useRecoilValue} from 'recoil';
import {PxFood} from '../@types/nutrition';
import BackIcon from '../assets/icons/back.svg';
import SearchIcon from '../assets/icons/search.svg';
import Body1 from '../components/text/Body1';
import CustomInput from '../components/common/CustomInput';

type PxListScreenProps = {
  visible: boolean;
  back: () => void;
  isTotal?: boolean;
};
// const Slider = ({values, onChange, width}: any) => {
//   return (
//     <MultiSlider
//       min={0}
//       max={500}
//       values={values}
//       step={1}
//       sliderLength={width}
//       {...slideStyle}
//       customMarker={() => <View style={style.thumb} />}
//       onValuesChangeFinish={onChange}
//     />
//   );
// };

function PxListScreen({
  visible,
  back,
  isTotal = false,
}: PxListScreenProps): JSX.Element {
  // 정렬 기준
  const [filter, setFilter] = useState(0);
  const [filterVisible, setFilterVisible] = useState(false);
  const filterList = [
    {
      value: '추천순',
      func: function (a: PxFood, b: PxFood) {
        return a.amount - b.amount;
      },
    },
    {
      value: '칼로리 낮은 순',
      func: function (a: PxFood, b: PxFood) {
        return a.calorie - b.calorie;
      },
    },
    {
      value: '칼로리 높은 순',
      func: function (a: PxFood, b: PxFood) {
        return b.calorie - a.calorie;
      },
    },
    {
      value: '탄수화물 낮은 순',
      func: function (a: PxFood, b: PxFood) {
        return a.carbohydrate - b.carbohydrate;
      },
    },
    {
      value: '탄수화물 높은 순',
      func: function (a: PxFood, b: PxFood) {
        return b.carbohydrate - a.carbohydrate;
      },
    },
    {
      value: '단백질 낮은 순',
      func: function (a: PxFood, b: PxFood) {
        return a.protein - b.protein;
      },
    },
    {
      value: '단백질 높은 순',
      func: function (a: PxFood, b: PxFood) {
        return b.protein - a.protein;
      },
    },
    {
      value: '지방 낮은 순',
      func: function (a: PxFood, b: PxFood) {
        return a.fat - b.fat;
      },
    },
    {
      value: '지방 높은 순',
      func: function (a: PxFood, b: PxFood) {
        return b.fat - a.fat;
      },
    },
  ];

  const width = Dimensions.get('window').width * 0.9;
  const height = Dimensions.get('window').height;
  const insets = useSafeAreaInsets();

  const getPxFoodAPI = useRecoilValue(
    isTotal ? getPxFoodsTotalSelector : getPxFoodsSelector,
  );
  const [pxFoods, setPxfoods] = useRecoilState(
    isTotal ? pxFoodsTotalAtom : pxFoodsAtom,
  );

  useEffect(() => {
    pxFoods === undefined && setPxfoods(getPxFoodAPI);
  }, [getPxFoodAPI, pxFoods, setPxfoods]);

  const renderItem = ({item, index}: any) => {
    return (
      <View
        style={[
          {width: width / 2 - 12, marginBottom: 24},
          index % 2 === 0 && {marginRight: 24},
        ]}>
        <PxItem data={item} />
      </View>
    );
  };

  const [search, setSearch] = useState('');
  const [onSearch, setOnSearch] = useState(false);
  return (
    <Modal animationType="fade" visible={visible}>
      {filterVisible && <View style={style.overlayBackground} />}
      <Modal animationType="slide" visible={filterVisible} transparent={true}>
        <View style={style.overlay}>
          <TouchableWithoutFeedback
            onPress={() => {
              setFilterVisible(false);
            }}>
            <View style={{flex: 1, backgroundColor: 'transparent'}} />
          </TouchableWithoutFeedback>
          <View
            style={{
              paddingBottom: insets.bottom,
              backgroundColor: designToken.color.Grary.White,
            }}>
            <View>
              <View style={style.overlayTitle}>
                <Title3 style={style.gray700}>상세필터</Title3>
              </View>
              <Wrap style={{marginBottom: 10, marginTop: 30}}>
                {filterList.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={{
                        marginBottom: 30,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                      key={index}
                      onPress={() => {
                        setFilter(index);
                      }}>
                      <Title3
                        style={{
                          color:
                            filter === index
                              ? designToken.color.Green
                              : designToken.color.Grary.Gray500,
                        }}>
                        {item.value}
                      </Title3>
                      {filter === index && <CheckOn />}
                    </TouchableOpacity>
                  );
                })}
                <CustomButton
                  title="검색하기"
                  activate={true}
                  onPress={() => {
                    setFilterVisible(false);
                  }}
                />
              </Wrap>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={onSearch} animationType="slide">
        <View
          style={{
            backgroundColor: designToken.color.Grary.Gray100,
            height: '100%',
          }}>
          <SafeAreaView>
            <View style={{height: '100%'}}>
              <View
                style={{
                  backgroundColor: designToken.color.Grary.White,
                  borderBottomColor: designToken.color.Grary.Gray200,
                  borderBottomWidth: 1,
                  marginBottom: 15,
                }}>
                <Wrap
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                  }}>
                  <CustomInput
                    wrapStyle={{flex: 1, paddingVertical: 0, height: 50}}
                    left={<SearchIcon />}
                    onChangeText={text => {
                      setSearch(text);
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setOnSearch(false);
                    }}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 48,
                    }}>
                    <Caption>취소</Caption>
                  </TouchableOpacity>
                </Wrap>
              </View>
              <Wrap>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {search !== '' &&
                    pxFoods &&
                    pxFoods.pxfoods
                      .filter(item => {
                        return item.name.includes(search);
                      })
                      .map((item, index) => {
                        return (
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 13,
                            }}
                            onPress={() => {
                              setSearch(item.name);
                              setOnSearch(false);
                            }}
                            key={index}>
                            <View
                              style={{
                                backgroundColor: designToken.color.Grary.White,
                                padding: 7,
                                borderRadius: 100,
                              }}>
                              <SearchIcon width={20} height={20} />
                            </View>
                            <Body1
                              style={{color: designToken.color.Grary.Gray900}}>
                              {item.name}
                            </Body1>
                          </TouchableOpacity>
                        );
                      })}
                </ScrollView>
              </Wrap>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
      <SafeAreaView>
        {isTotal ? (
          <Wrap
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 18,
              marginTop: 10,
            }}>
            <TouchableOpacity onPress={back}>
              <BackIcon />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setOnSearch(true);
              }}
              style={{
                flex: 1,
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor: designToken.color.Grary.Gray100,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <SearchIcon />
              <Body1
                style={{
                  color:
                    search === ''
                      ? designToken.color.Grary.Gray600
                      : designToken.color.Grary.Gray900,
                }}>
                {search === '' ? 'PX 음식명을 입력해주세요' : search}
              </Body1>
            </TouchableOpacity>
          </Wrap>
        ) : (
          <Header onPress={back} title="PX 상품 추천" />
        )}
        <Wrap style={style.filterWrap}>
          <TouchableOpacity
            style={style.filter}
            onPress={() => {
              setFilterVisible(true);
            }}>
            <Caption style={style.gray700}>{filterList[filter].value}</Caption>
            <DownIcon />
          </TouchableOpacity>
        </Wrap>
        <Wrap style={{height: height - 150}}>
          <FlatList
            style={{paddingTop: 25}}
            data={
              pxFoods
                ? filter === 0
                  ? pxFoods.pxfoods.filter(item => {
                      return item.name.includes(search);
                    })
                  : [...pxFoods.pxfoods]
                      .filter(item => {
                        return item.name.includes(search);
                      })
                      .sort(filterList[filter].func)
                : []
            }
            renderItem={renderItem}
            keyExtractor={item => item.name}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </Wrap>
      </SafeAreaView>
    </Modal>
  );
}

const style = StyleSheet.create({
  black: {color: designToken.color.Grary.Black},
  filterWrap: {
    gap: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomColor: designToken.color.Grary.Gray100,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderColor: designToken.color.Grary.Gray200,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 6,
    // height: 26,
  },
  overlayBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.53)',
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  overlay: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  overlayTitle: {
    paddingVertical: 17,
    alignItems: 'center',
    borderBottomColor: designToken.color.Grary.Gray200,
    borderBottomWidth: 1,
  },
  gray700: {color: designToken.color.Grary.Gray700},
  thumb: {
    backgroundColor: designToken.color.Grary.White,
    borderWidth: 1,
    borderColor: designToken.color.Green,
    width: 23,
    height: 23,
    borderRadius: 100,
    zIndex: 100,
  },
  rail: {
    flex: 1,
    backgroundColor: designToken.color.Grary.Gray200,
    height: 4,
    borderRadius: 2,
  },
  selectedRail: {
    backgroundColor: designToken.color.Green,
    height: 4,
  },
  gray500: {
    color: designToken.color.Grary.Gray500,
  },
});

// const slideStyle = StyleSheet.create({
//   selectedStyle: {
//     backgroundColor: designToken.color.Green,
//     height: 4,
//   },
//   unselectedStyle: {
//     backgroundColor: designToken.color.Grary.Gray200,
//     height: 4,
//   },
// });
export default PxListScreen;
