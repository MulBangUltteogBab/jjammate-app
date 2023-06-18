import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Caption} from 'react-native-paper';
import designToken from '../../assets/design-tokens';
import PxListScreen from '../../screens/PxListScreen';
import Title3 from '../text/Title3';
import Wrap from '../common/Wrap';
import RightAllrow from '../../assets/icons/right.svg';
import {PxItemType} from '../../@types/nutrition';
import PxItem from './PxItem';

const PxRecommend = () => {
  const [pxListVisible, setPxListVisible] = useState(false);
  const [pxItems, setPxItems] = useState<PxItemType[]>([]);
  useEffect(() => {
    setPxItems([
      {
        id: '0',
        name: 'test',
        url: '',
        kcal: 1234,
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
      {
        id: '1',
        name: 'test',
        url: '',
        kcal: 1234,
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
      {
        id: '2',
        name: 'test',
        url: '',
        kcal: 1234,
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
    ]);
  }, []);
  return (
    <View>
      <PxListScreen
        visible={pxListVisible}
        back={() => {
          setPxListVisible(false);
        }}
      />
      <Wrap>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 26,
          }}>
          <View>
            <Title3 style={{color: designToken.color.Grary.Gray800}}>
              PX 상품 추천
            </Title3>
            <Caption style={{color: designToken.color.Grary.Gray700}}>
              BMI를 분석하여 최적의 상품을 추천해드려요
            </Caption>
          </View>
          <TouchableOpacity
            onPress={() => {
              setPxListVisible(true);
            }}>
            <RightAllrow />
          </TouchableOpacity>
        </View>
      </Wrap>
      <ScrollView
        horizontal
        style={{paddingLeft: '5%'}}
        showsHorizontalScrollIndicator={false}>
        <View style={{flexDirection: 'row', gap: 8}}>
          {pxItems.map(data => {
            return (
              <View style={style.pxItem} key={data.id}>
                <PxItem data={data} />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default PxRecommend;

const style = StyleSheet.create({
  pxItem: {
    width: 140,
  },
});
