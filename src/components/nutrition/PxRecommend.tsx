import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Caption} from 'react-native-paper';
import designToken from '../../assets/design-tokens';
import PxListScreen from '../../screens/PxListScreen';
import Title3 from '../text/Title3';
import Wrap from '../common/Wrap';
import RightAllrow from '../../assets/icons/right.svg';
import PxItem from './PxItem';
import {getPxFoodsSelector, pxFoodsAtom} from '../../states/home';
import {useRecoilState, useRecoilValue} from 'recoil';
import {Dimensions} from 'react-native';

const PxRecommend = ({isTotal = false}: any) => {
  const getPxFoodAPI = useRecoilValue(getPxFoodsSelector);
  const [pxfoods, setPxfoods] = useRecoilState(pxFoodsAtom);
  const [pxListVisible, setPxListVisible] = useState(false);
  useEffect(() => {
    pxfoods === undefined && setPxfoods(getPxFoodAPI);
    // console.log(pxfoods. + '######');
  }, [getPxFoodAPI, pxfoods, setPxfoods]);
  const windowWidth = Dimensions.get('window').width;
  return (
    <View>
      <PxListScreen
        visible={pxListVisible}
        back={() => {
          setPxListVisible(false);
        }}
        isTotal={isTotal}
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
              {isTotal ? 'PX 음식 상품' : 'PX 상품 추천'}
            </Title3>
            <Caption style={{color: designToken.color.Grary.Gray700}}>
              {isTotal
                ? 'PX 음식 상품들의 리스트를 확인해보세요!'
                : 'BMI를 분석하여 최적의 상품을 추천해드려요'}
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
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            paddingRight: windowWidth * 0.1,
          }}>
          {pxfoods &&
            pxfoods.pxfoods
              .slice(0, Math.min(10, pxfoods.pxfoods.length))
              .map((food, index) => {
                return (
                  <View style={style.pxItem} key={index}>
                    <PxItem data={food} />
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
    flex: 1,
  },
});
