import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PxItem from '../components/nutrition/PxItem';
import {PxItemType} from '../@types/nutrition';
import Header from '../components/common/Header';
import Wrap from '../components/common/Wrap';
import designToken from '../assets/design-tokens';
import RNPickerSelect from 'react-native-picker-select';
import DownIcon from '../assets/icons/down.svg';
import Title3 from '../components/text/Title3';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomButton from '../components/common/CustomButton';
import Caption from '../components/text/Caption';
import SettingIcon from '../assets/icons/setting.svg';
import Headline2 from '../components/text/Headline2';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Body2 from '../components/text/Body2';
import Caption2 from '../components/text/Caption2';

type PxListScreenProps = {
  visible: boolean;
  back: () => void;
};
const Slider = ({values, onChange, width}: any) => {
  return (
    <MultiSlider
      min={0}
      max={500}
      values={values}
      step={1}
      sliderLength={width}
      {...slideStyle}
      customMarker={() => <View style={style.thumb} />}
      onValuesChangeFinish={onChange}
    />
  );
};

function PxListScreen({visible, back}: PxListScreenProps): JSX.Element {
  const [pxItems, setPxItems] = useState<PxItemType[]>([]);
  const [filter, setFilter] = useState('추천순');
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterDetail, setFilterDetail] = useState({
    carbohydrate: [0, 500],
    protein: [0, 500],
    fat: [0, 500],
  });
  const width = Dimensions.get('window').width * 0.9;
  const insets = useSafeAreaInsets();
  useEffect(() => {
    setPxItems([
      {
        id: '0',
        name: 'test',
        url: '',
        kcal: 1234,
        carbohydrate: {
          value: 1234,
          percent: 55,
        },
        protein: {
          value: 1234,
          percent: 30,
        },
        fat: {
          value: 1234,
          percent: 15,
        },
      },
      {
        id: '1',
        name: 'test',
        url: '',
        kcal: 1234,
        carbohydrate: {
          value: 1234,
          percent: 55,
        },
        protein: {
          value: 1234,
          percent: 30,
        },
        fat: {
          value: 1234,
          percent: 15,
        },
      },
      {
        id: '2',
        name: 'test',
        url: '',
        kcal: 1234,
        carbohydrate: {
          value: 1234,
          percent: 55,
        },
        protein: {
          value: 1234,
          percent: 30,
        },
        fat: {
          value: 1234,
          percent: 15,
        },
      },
    ]);
  }, []);

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
              <Wrap>
                <View style={{gap: 35, marginTop: 20, marginBottom: 50}}>
                  <View>
                    <Headline2 style={[style.black, {marginBottom: 12}]}>
                      탄수화물
                    </Headline2>
                    <Body2 style={style.black}>
                      {filterDetail.carbohydrate[0]}g ~{' '}
                      {filterDetail.carbohydrate[1]}g
                    </Body2>
                    <Slider
                      onChange={(values: any) => {
                        setFilterDetail({
                          ...filterDetail,
                          carbohydrate: values,
                        });
                      }}
                      width={width}
                      values={filterDetail.carbohydrate}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        position: 'absolute',
                        width: '100%',
                        bottom: 0,
                      }}>
                      <Caption2 style={style.gray500}>
                        {filterDetail.carbohydrate[0]}g
                      </Caption2>
                      <Caption2 style={style.gray500}>
                        {filterDetail.carbohydrate[1]}g
                      </Caption2>
                    </View>
                  </View>
                  <View>
                    <Headline2 style={[style.black, {marginBottom: 12}]}>
                      단백질
                    </Headline2>
                    <Body2 style={style.black}>
                      {filterDetail.protein[0]}g ~ {filterDetail.protein[1]}g
                    </Body2>
                    <Slider
                      onChange={(values: any) => {
                        setFilterDetail({
                          ...filterDetail,
                          protein: values,
                        });
                      }}
                      width={width}
                      values={filterDetail.protein}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        position: 'absolute',
                        width: '100%',
                        bottom: 0,
                      }}>
                      <Caption2 style={style.gray500}>
                        {filterDetail.carbohydrate[0]}g
                      </Caption2>
                      <Caption2 style={style.gray500}>
                        {filterDetail.carbohydrate[1]}g
                      </Caption2>
                    </View>
                  </View>
                  <View>
                    <Headline2 style={[style.black, {marginBottom: 12}]}>
                      지방
                    </Headline2>
                    <Body2 style={style.black}>
                      {filterDetail.fat[0]}g ~ {filterDetail.fat[1]}g
                    </Body2>
                    <Slider
                      onChange={(values: any) => {
                        setFilterDetail({
                          ...filterDetail,
                          fat: values,
                        });
                      }}
                      width={width}
                      values={filterDetail.fat}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        position: 'absolute',
                        width: '100%',
                        bottom: 0,
                      }}>
                      <Caption2 style={style.gray500}>
                        {filterDetail.fat[0]}g
                      </Caption2>
                      <Caption2 style={style.gray500}>
                        {filterDetail.fat[1]}g
                      </Caption2>
                    </View>
                  </View>
                </View>
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
      <SafeAreaView>
        <Header onPress={back} title="PX 상품 추천" />
        <Wrap style={style.filterWrap}>
          <TouchableOpacity
            style={style.filter}
            onPress={() => {
              setFilterVisible(true);
            }}>
            <Caption style={style.gray700}>상세 필터</Caption>
            <SettingIcon />
          </TouchableOpacity>
          <View style={style.filter}>
            <RNPickerSelect
              onValueChange={value => {
                setFilter(value);
              }}
              value={filter}
              placeholder={{label: '추천순', value: '추천순'}}
              items={[
                {label: '칼로리 낮은 순', value: '칼로리 낮은 순'},
                {label: '칼로리 높은 순', value: '칼로리 높은 순'},
                {label: '탄수화물 낮은 순', value: '탄수화물 높은 순'},
                {label: '탄수화물 높은 순', value: '탄수화물 낮은 순'},
                {label: '단백질 높은 순', value: '단백질 높은 순'},
                {label: '단백질 높은 순', value: '단백질 낮은 순'},
                {label: '지방 높은 순', value: '지방 높은 순'},
                {label: '지방 높은 순', value: '지방 낮은 순'},
              ]}
            />
            <DownIcon />
          </View>
        </Wrap>
        <Wrap>
          <FlatList
            style={{paddingTop: 25}}
            data={pxItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
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

const slideStyle = StyleSheet.create({
  selectedStyle: {
    backgroundColor: designToken.color.Green,
    height: 4,
  },
  unselectedStyle: {
    backgroundColor: designToken.color.Grary.Gray200,
    height: 4,
  },
});
export default PxListScreen;
