import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Wrap from '../../components/Wrap';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import Header from '../../components/Header';
import RegisterAgreeScreen from './RegisterAgreeScreen';
import CustomButton from '../../components/CustomButton';
import RegisterInfoScreen from './RegisterInfoScreen';

const Stack = createStackNavigator();

function RegisterScreen({navigation}: any): JSX.Element {
  const [index, setIndex] = useState(0);

  const [route, _] = useState([
    {target: 'RegisterAgreeScreen', buttonContent: '동의하고 가입하기'},
    {target: 'RegisterInfoScreen', buttonContent: '다음'},
    {target: '', buttonContent: '다음'},
    {target: '', buttonContent: '다음'},
    {target: '', buttonContent: '다음'},
    {target: '', buttonContent: '다음'},
    {target: '', buttonContent: '로그인하러가기'},
  ]);
  useEffect(() => {
    navigation.navigate(route[index].target);
  }, [index, navigation, route]);
  return (
    <View style={{height: '100%'}}>
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
            <Stack.Screen
              name="RegisterAgreeScreen"
              component={RegisterAgreeScreen}
            />
            <Stack.Screen
              name="RegisterInfoScreen"
              component={RegisterInfoScreen}
            />
          </Stack.Navigator>
        </Wrap>
      </View>
      <Wrap>
        <CustomButton
          title={route[index].buttonContent}
          onPress={() => {
            setIndex(index + 1);
          }}
          activate={true}
        />
      </Wrap>
    </View>
  );
}

const style = StyleSheet.create({});
export default RegisterScreen;
