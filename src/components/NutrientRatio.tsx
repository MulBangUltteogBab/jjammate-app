import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Caption} from 'react-native-paper';
import designToken from '../assets/design-tokens';

type Nutrient = {
  value: number;
  percent: number;
};
type NutrientRatioProps = {
  carbohydrate: Nutrient;
  protein: Nutrient;
  fat: Nutrient;
};
const NutrientRatio = ({carbohydrate, protein, fat}: NutrientRatioProps) => {
  return (
    <View>
      <View style={style.container}>
        <View
          style={[
            style.stick,
            {
              backgroundColor: designToken.color.Green,
              flex: carbohydrate.percent,
            },
          ]}>
          <Caption style={style.stickPercent}>{carbohydrate.percent}%</Caption>
        </View>
        <View
          style={[
            style.stick,
            {backgroundColor: designToken.color.Blue, flex: protein.percent},
          ]}>
          <Caption style={style.stickPercent}>{protein.percent}%</Caption>
        </View>
        <View
          style={[
            style.stick,
            {backgroundColor: designToken.color.Pink, flex: fat.percent},
          ]}>
          <Caption style={style.stickPercent}>{fat.percent}%</Caption>
        </View>
      </View>
      <View style={style.infoArea}>
        <View style={style.boxWrap}>
          <View
            style={[
              style.box,
              {
                backgroundColor: designToken.color.Green,
              },
            ]}
          />
          <Caption style={style.gray700}>탄수화물</Caption>
          <Caption style={style.gray700}>{carbohydrate.value}g</Caption>
        </View>
        <View style={style.boxWrap}>
          <View
            style={[
              style.box,
              {
                backgroundColor: designToken.color.Blue,
              },
            ]}
          />
          <Caption style={style.gray700}>단백질</Caption>
          <Caption style={style.gray700}>{protein.value}g</Caption>
        </View>
        <View style={style.boxWrap}>
          <View
            style={[
              style.box,
              {
                backgroundColor: designToken.color.Pink,
              },
            ]}
          />
          <Caption style={style.gray700}>지방</Caption>
          <Caption style={style.gray700}>{fat.value}g</Caption>
        </View>
      </View>
    </View>
  );
};

export default NutrientRatio;

const style = StyleSheet.create({
  kcalWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 22,
    marginTop: 60,
    marginBottom: 40,
  },
  stick: {
    borderRadius: 90,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickPercent: {
    color: designToken.color.Grary.White,
  },
  gray700: {
    color: designToken.color.Grary.Gray700,
  },
  box: {
    height: 10,
    width: 10,
    borderRadius: 2,
  },
  boxWrap: {flexDirection: 'row', alignItems: 'center', gap: 4},
  infoArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  container: {flexDirection: 'row', marginBottom: 20},
});
