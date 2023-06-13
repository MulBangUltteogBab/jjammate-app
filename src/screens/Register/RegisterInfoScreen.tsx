import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Title1 from '../../components/text/Title1';
import Body2 from '../../components/text/Body2';
import designToken from '../../assets/design-tokens';

function RegisterInfoScreen({navigation}: any): JSX.Element {
  return (
    <View style={style.container}>
      <Title1>사용자님의 신체정보가 필요해요!</Title1>
      <View>
        <Body2
          style={{color: designToken.color.Grary.Gray700, marginBottom: 25}}>
          성별
        </Body2>
        <View style={style.row}>
          <View style={style.flex}>
            <View style={style.iconWrap}>
              <Text style={style.icon}>🙆🏻‍♀️</Text>
            </View>
            <Body2 style={{color: designToken.color.Grary.Black, marginTop: 8}}>
              여성
            </Body2>
          </View>
          <View style={style.flex}>
            <View style={style.iconWrap}>
              <Text style={style.icon}>🙆🏻‍♂️</Text>
            </View>
            <Body2 style={{color: designToken.color.Grary.Black, marginTop: 8}}>
              남성
            </Body2>
          </View>
        </View>
      </View>
      <View />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    gap: 47,
  },
  row: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
    alignItems: 'center',
  },
  iconWrap: {
    backgroundColor: designToken.color.Grary.Gray100,
    padding: 34,
    borderRadius: 100,
  },
  icon: {
    fontSize: 48,
  },
});
export default RegisterInfoScreen;
