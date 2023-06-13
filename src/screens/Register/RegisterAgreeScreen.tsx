import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CheckBox from '../../components/CheckBox';
import Headline1 from '../../components/text/Headline1';
import Title1 from '../../components/text/Title1';
import Check from '../../components/Check';
import Body2 from '../../components/text/Body2';

function RegisterAgreeScreen(): JSX.Element {
  const [checkAll, useCheckAll] = useState(false);
  return (
    <View style={{height: '100%'}}>
      <Title1>약관동의가 필요해요!</Title1>
      <View style={{height: 109}} />
      <View style={style.row}>
        <CheckBox checked={checkAll} setChecked={useCheckAll} size={24} />
        <Headline1>모두 동의(선택 약관 포함)</Headline1>
      </View>
      <View style={{height: 56}} />
      <View style={{gap: 8}}>
        <View style={style.row}>
          <Check checked={checkAll} setChecked={useCheckAll} />
          <Body2>[필수] 14세 이상</Body2>
        </View>
        <View style={style.row}>
          <Check checked={checkAll} setChecked={useCheckAll} />
          <Body2>[필수] 이용약관 동의</Body2>
        </View>
        <View style={style.row}>
          <Check checked={checkAll} setChecked={useCheckAll} />
          <Body2>[필수] 개인정보 처리 방침 동의</Body2>
        </View>
        <View style={style.row}>
          <Check checked={checkAll} setChecked={useCheckAll} />
          <Body2>[선택] 광고성 정보 수집 및 마케팅 활용 동의</Body2>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
});
export default RegisterAgreeScreen;
