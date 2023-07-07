import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Caption} from 'react-native-paper';
import designToken from '../../assets/design-tokens';
import {Nutrition} from '../../@types/nutrition';

type NutrientRatioProps = {
  nutrition: Nutrition;
  // 아래 태그들 세로배치
  column?: boolean;
};
const NutrientRatio = ({nutrition, column = false}: NutrientRatioProps) => {
  return (
    <View>
      <View style={style.container}>
        <View
          style={[
            style.stick,
            {
              backgroundColor: designToken.color.Green,
              flex: Math.max(nutrition.percent.carbohydrate, 1),
            },
          ]}>
          <Caption style={style.stickPercent}>
            {nutrition.percent.carbohydrate}%
          </Caption>
        </View>
        <View
          style={[
            style.stick,
            {
              backgroundColor: designToken.color.Blue,
              flex: Math.max(nutrition.percent.protein, 1),
            },
          ]}>
          <Caption style={style.stickPercent}>
            {nutrition.percent.protein}%
          </Caption>
        </View>
        <View
          style={[
            style.stick,
            {
              backgroundColor: designToken.color.Pink,
              flex: Math.max(nutrition.percent.fat, 1),
            },
          ]}>
          <Caption style={style.stickPercent}>{nutrition.percent.fat}%</Caption>
        </View>
      </View>
      <View style={column ? style.infoAreaColumn : style.infoArea}>
        <View
          style={[style.boxWrap, column && {justifyContent: 'space-between'}]}>
          <View style={[style.boxWrap, column && {gap: 12}]}>
            <View
              style={[style.box, {backgroundColor: designToken.color.Green}]}
            />
            <Caption style={style.gray700}>탄수화물</Caption>
          </View>
          <Caption style={style.gray700}>
            {nutrition.taken.carbohydrate}g
          </Caption>
        </View>
        <View
          style={[style.boxWrap, column && {justifyContent: 'space-between'}]}>
          <View style={[style.boxWrap, column && {gap: 12}]}>
            <View
              style={[style.box, {backgroundColor: designToken.color.Blue}]}
            />
            <Caption style={style.gray700}>단백질</Caption>
          </View>
          <Caption style={style.gray700}>{nutrition.taken.protein}g</Caption>
        </View>
        <View
          style={[style.boxWrap, column && {justifyContent: 'space-between'}]}>
          <View style={[style.boxWrap, column && {gap: 12}]}>
            <View
              style={[style.box, {backgroundColor: designToken.color.Pink}]}
            />
            <Caption style={style.gray700}>지방</Caption>
          </View>
          <Caption style={style.gray700}>{nutrition.taken.fat}g</Caption>
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
  boxWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 30,
  },
  infoAreaColumn: {
    gap: 8,
  },
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});
