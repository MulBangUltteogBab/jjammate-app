/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Title1 from '../../components/text/Title1';
import CustomInput from '../../components/common/CustomInput';
import {useRecoilState} from 'recoil';
import {isReadyAtom, registerInfoAtom} from '../../states/register';
import {HelperText} from 'react-native-paper';
import designToken from '../../assets/design-tokens';
import SearchIcon from '../../assets/icons/search.svg';
import Body2 from '../../components/text/Body2';

type RegisterDepartmentScreenProps = {
  index: number;
  route: any;
  navigation: any;
};
function RegisterDepartmentScreen({
  index,
  route,
  navigation,
}: RegisterDepartmentScreenProps): JSX.Element {
  // 유저 정보 상태
  const [userInfo, setUserInfo] = useRecoilState(registerInfoAtom);
  // 각 페이지 완료 상태
  const [isReady, setIsReady] = useRecoilState(isReadyAtom);
  // 부대 리스트
  const [dataList, setDataList] = useState<string[]>([
    'test1',
    'test2',
    'test3',
    'test4',
  ]);
  return (
    <View style={{height: '100%'}}>
      <Title1>소속부대가 어디인가요?</Title1>
      <View style={{height: 32}} />
      <CustomInput
        style={{fontSize: 22}}
        placeholder="소속부대"
        right={
          <TouchableOpacity>
            <SearchIcon />
          </TouchableOpacity>
        }
        onChangeText={text => {
          setUserInfo({
            ...userInfo,
            department: text,
          });
          setIsReady({
            ...isReady,
            [index]: false,
          });
          if (text.length > 2) {
            //api 호출
            /*
            try{
                const {data} = axios.get(`endpoint/${text}`)
                setDataList(data);
            }catch(err){
                console.log(err)
            }
            */
          }
        }}
        wrapStyle={
          userInfo.department.length > 0 ? style.inputActive : style.input
        }
        value={userInfo.department}
      />
      <View style={style.itemWrap}>
        {dataList.length > 0 &&
          dataList
            .slice(0, dataList.length < 5 ? dataList.length : 5)
            .map(value => {
              return (
                <TouchableOpacity
                  key={value}
                  style={[
                    style.item,
                    userInfo.department === value
                      ? style.selected
                      : style.nonSelected,
                  ]}
                  onPress={() => {
                    setUserInfo({
                      ...userInfo,
                      department: value,
                    });
                    setIsReady({
                      ...isReady,
                      [index]: true,
                    });
                  }}>
                  <Body2 style={{color: designToken.color.Grary.Gray900}}>
                    {value}
                  </Body2>
                </TouchableOpacity>
              );
            })}
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  itemWrap: {
    marginTop: 20,
    gap: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: designToken.color.Grary.Gray100,
  },
  inputActive: {
    borderWidth: 2,
    borderColor: designToken.color.Green,
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 15.5,
    borderRadius: 10,
  },
  nonSelected: {
    backgroundColor: designToken.color.Grary.Gray100,
    borderWidth: 1,
    borderColor: designToken.color.Grary.Gray100,
  },
  selected: {
    backgroundColor: 'rgba(33, 195, 137, 0.2)',
    borderWidth: 1,
    borderColor: designToken.color.Green,
  },
});

export default RegisterDepartmentScreen;
