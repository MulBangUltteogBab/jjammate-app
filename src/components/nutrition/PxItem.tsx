import React, {useState} from 'react';
import {Image, Modal, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Headline2 from '../text/Headline2';
import Caption from '../text/Caption';
import Caption2 from '../text/Caption2';
import designToken from '../../assets/design-tokens';
import {PxFood} from '../../@types/nutrition';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BackImage from '../../assets/icons/back.svg';
import Title3 from '../text/Title3';
import Wrap from '../common/Wrap';
import Headline1 from '../text/Headline1';
import NutrientRatio from './NutrientRatio';
import CustomButton from '../common/CustomButton';
import http from '../../utils/http';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {userCodeSelector} from '../../states/setting';
import showToast from '../../utils/Toast';
import {trigerAtom} from '../../states/utils';

type PxItemProps = {
  data: PxFood;
};
const PxItem = ({data}: PxItemProps) => {
  const [width, setWidth] = useState(0);
  const [isDetail, setIsDetail] = useState(false);
  const insets = useSafeAreaInsets();
  const code = useRecoilValue(userCodeSelector);
  const handleLayout = (event: any) => {
    const {width} = event.nativeEvent.layout;
    setWidth(width);
  };
  const imageUrl =
    http.defaults.baseURL + data.image.slice(1, data.image.length);
  const setTriger = useSetRecoilState(trigerAtom);
  return (
    <View style={{flex: 1}}>
      <Modal animationType="fade" visible={isDetail}>
        <View style={{height: '100%'}}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: insets.top + 16,
              zIndex: 3,
              marginLeft: '5%',
            }}
            onPress={() => {
              setIsDetail(false);
            }}>
            <BackImage />
          </TouchableOpacity>
          <Image
            source={{
              uri: imageUrl,
            }}
            style={[{width: '100%', height: 300}]}
          />
          <Wrap>
            <Title3
              style={{
                color: designToken.color.Grary.Gray900,
                paddingVertical: 24,
              }}>
              {data.name + ' '}
            </Title3>
            <View style={style.hr} />
            <View style={style.modalKcal}>
              <Headline1 style={style.gray900}>🔥 총 열량</Headline1>
              <Headline1 style={style.gray900}>{data.calorie} kcal</Headline1>
            </View>
            <NutrientRatio
              nutrition={{
                taken: {
                  carbohydrate: data.carbohydrate,
                  protein: data.protein,
                  fat: data.fat,
                },
                percent: {
                  carbohydrate: Math.round(
                    (data.carbohydrate /
                      Math.max(
                        1,
                        data.carbohydrate + data.protein + data.fat,
                      )) *
                      100,
                  ),
                  protein: Math.round(
                    (data.protein /
                      Math.max(
                        1,
                        data.carbohydrate + data.protein + data.fat,
                      )) *
                      100,
                  ),
                  fat: Math.round(
                    Math.max(
                      1,
                      data.fat / (data.carbohydrate + data.protein + data.fat),
                    ) * 100,
                  ),
                },
                total: {
                  carbohydrate: 0,
                  protein: 0,
                  fat: 0,
                },
              }}
              column={true}
            />
          </Wrap>
          <View
            style={{
              position: 'absolute',
              bottom: insets.bottom,
              width: '100%',
            }}>
            <Wrap style={{marginBottom: 10}}>
              <CustomButton
                title={'추가하기'}
                activate={true}
                onPress={async () => {
                  setIsDetail(false);
                  try {
                    await http.post('/diet/api/settakenfood/', {
                      ...code,
                      food: data.name,
                    });
                    setTriger(pre => pre + 1);
                    showToast('추가되었습니다.', 'success');
                  } catch (err) {
                    console.log(err);
                  }
                }}
              />
            </Wrap>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={{flex: 1}}
        onLayout={handleLayout}
        onPress={() => {
          setIsDetail(true);
        }}>
        <View style={{gap: 8, flex: 1, justifyContent: 'space-between'}}>
          <Image
            source={{uri: imageUrl}}
            style={[style.image, {width: width, height: width}]}
          />
          <Headline2 style={style.gray800}>{data.name}</Headline2>
          <Caption style={style.gray800}>{data.calorie}kcal</Caption>
          <View style={[style.row, {flexWrap: 'wrap'}]}>
            <View
              style={[style.tag, {backgroundColor: 'rgba(33, 195, 137, 0.2)'}]}>
              <Caption2
                style={[{color: designToken.color.Green}, {fontSize: 9}]}>
                탄 {Math.round(data.carbohydrate)}g
              </Caption2>
            </View>
            <View
              style={[style.tag, {backgroundColor: 'rgba(80, 126, 247, 0.2)'}]}>
              <Caption2
                style={[{color: designToken.color.Blue}, {fontSize: 9}]}>
                단 {Math.round(data.protein)}g
              </Caption2>
            </View>
            <View
              style={[
                style.tag,
                {backgroundColor: 'rgba(239, 142, 223, 0.2)'},
              ]}>
              <Caption2
                style={[{color: designToken.color.Pink}, {fontSize: 9}]}>
                지 {Math.round(data.fat)}g
              </Caption2>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  row: {
    gap: 4,
    flexDirection: 'row',
  },
  container: {
    gap: 8,
  },
  tag: {
    padding: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  image: {
    borderRadius: 12,
  },
  gray800: {
    color: designToken.color.Grary.Gray800,
  },
  hr: {
    height: 1,
    backgroundColor: designToken.color.Grary.Gray200,
  },
  gray900: {
    color: designToken.color.Grary.Gray900,
  },
  modalKcal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
  },
});
export default PxItem;
