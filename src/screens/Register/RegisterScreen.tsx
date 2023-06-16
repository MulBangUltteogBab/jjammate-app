import {SafeAreaView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Wrap from '../../components/common/Wrap';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import Header from '../../components/common/Header';
import RegisterAgreeScreen from './RegisterAgreeScreen';
import CustomButton from '../../components/common/CustomButton';
import RegisterInfoScreen from './RegisterInfoScreen';
import RegisterInputScreen, {InfoType} from './RegisterInputScreen';
import {useRecoilValue} from 'recoil';
import {isReadyAtom} from '../../states/register';
import RegisterDepartmentScreen from './RegisterDepartmentScreen';
import RegisterCompleteScreen from './RegisterCompleteScreen';

const Stack = createStackNavigator();

function RegisterScreen({navigation}: any): JSX.Element {
  const [index, setIndex] = useState(0);
  const isReady = useRecoilValue(isReadyAtom);
  const [route, _] = useState([
    {target: 'RegisterAgreeScreen', buttonContent: '동의하고 가입하기'},
    {target: 'RegisterInfoScreen', buttonContent: '다음'},
    {target: 'RegisterInfoNickNameScreen', buttonContent: '다음'},
    {target: 'RegisterInfoSerialNumberScreen', buttonContent: '다음'},
    {target: 'RegisterInfoPasswordScreen', buttonContent: '다음'},
    {target: 'RegisterInfoPasswordConfirmScreen', buttonContent: '다음'},
    {target: 'RegisterInfoDepartmentScreen', buttonContent: '다음'},
    {target: 'RegisterCompleteScreen', buttonContent: '로그인하러가기'},
  ]);
  useEffect(() => {
    navigation.navigate(route[index].target);
  }, [index, navigation, route]);

  return (
    <SafeAreaView style={{height: '100%'}}>
      <Header
        marginBottom={32}
        onPress={() => {
          if (index === 0) {
            navigation.goBack();
          } else {
            setIndex(index - 1);
          }
        }}
      />
      <View style={{flex: 1}}>
        <Wrap style={{height: '100%'}}>
          <Stack.Navigator
            initialRouteName="RegisterAgreeScreen"
            screenOptions={{
              gestureDirection: 'horizontal',
              headerShown: false,
            }}>
            <Stack.Screen name="RegisterAgreeScreen">
              {props => <RegisterAgreeScreen {...props} index={0} />}
            </Stack.Screen>
            <Stack.Screen name="RegisterInfoScreen">
              {props => <RegisterInfoScreen {...props} index={1} />}
            </Stack.Screen>
            <Stack.Screen name="RegisterInfoNickNameScreen">
              {props => (
                <RegisterInputScreen
                  {...props}
                  infoType={InfoType.nickName}
                  index={2}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="RegisterInfoSerialNumberScreen">
              {props => (
                <RegisterInputScreen
                  {...props}
                  infoType={InfoType.serialNumber}
                  index={3}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="RegisterInfoPasswordScreen">
              {props => (
                <RegisterInputScreen
                  {...props}
                  infoType={InfoType.password}
                  index={4}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="RegisterInfoPasswordConfirmScreen">
              {props => (
                <RegisterInputScreen
                  {...props}
                  infoType={InfoType.passwordConfirm}
                  index={5}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="RegisterInfoDepartmentScreen">
              {props => <RegisterDepartmentScreen {...props} index={6} />}
            </Stack.Screen>
            <Stack.Screen
              name="RegisterCompleteScreen"
              component={RegisterCompleteScreen}
            />
          </Stack.Navigator>
        </Wrap>
      </View>
      <Wrap>
        <CustomButton
          title={route[index].buttonContent}
          onPress={() => {
            if (index < 7) {
              setIndex(index + 1);
            }
          }}
          activate={isReady[index]}
        />
      </Wrap>
    </SafeAreaView>
  );
}

export default RegisterScreen;
