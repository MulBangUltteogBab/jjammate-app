/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CheckBox from '../../components/common/CheckBox';
import Headline1 from '../../components/text/Headline1';
import Title1 from '../../components/text/Title1';
import Check from '../../components/common/Check';
import Body2 from '../../components/text/Body2';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {isReadyAtom, registerInfoAtom} from '../../states/register';
import designToken from '../../assets/design-tokens';
import PolicyModal from '../../components/common/PolicyModal';

type RegisterAgreeScreenProps = {
  //현재 페이지 번호
  index: number;
  route: any;
  navigation: any;
};

function RegisterAgreeScreen({
  index,
  route,
  navigation,
}: RegisterAgreeScreenProps): JSX.Element {
  // 동의 여부
  const [registerInfo, setRegisterInfo] = useRecoilState(registerInfoAtom);
  // 각 페이지 상태
  const [isReady, setIsReady] = useRecoilState(isReadyAtom);
  const [onPolicy, setOnPolicy] = useState(false);

  return (
    <>
      <PolicyModal visible={onPolicy} setVisible={setOnPolicy} />
      <View style={{height: '100%'}}>
        <Title1>약관동의가 필요해요!</Title1>
        <View style={[{marginTop: 32}, style.row, {gap: 4}]}>
          <View style={style.row}>
            <Check
              checked={registerInfo.agreement}
              onChange={() => {
                setRegisterInfo({
                  ...registerInfo,
                  agreement: !registerInfo.agreement,
                });
                setIsReady(prevState => ({
                  ...prevState,
                  [index]: !registerInfo.agreement,
                }));
              }}
            />
            <Body2>[필수] 개인정보 처리 방침 동의</Body2>
          </View>
          <TouchableOpacity
            onPress={() => {
              setOnPolicy(true);
            }}
            style={{
              borderBottomColor: designToken.color.Grary.Gray700,
              borderBottomWidth: 1,
            }}>
            <Body2>보기</Body2>
          </TouchableOpacity>
        </View>
      </View>
    </>
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
