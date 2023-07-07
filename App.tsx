/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import Toast from 'react-native-toast-message';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {View} from 'react-native';
import LaunchScreen from './src/screens/LaunchScreen';
import {setCustomText} from 'react-native-global-props';
import {RecoilRoot, useRecoilValue} from 'recoil';
import LoginScreen from './src/screens/LoginScreen';
import designToken from './src/assets/design-tokens';
import RegisterScreen from './src/screens/Register/RegisterScreen';
import {
  DefaultTheme as PaperDefaultThme,
  Provider as PaperProvider,
} from 'react-native-paper';
import MainScreen from './src/screens/MainScreen';
import {autoLoginState} from './src/states/setting';
const Stack = createNativeStackNavigator();

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: designToken.color.Grary.White,
    primary: designToken.color.Green,
  },
};

const ThemePaper = {
  ...PaperDefaultThme,
  colors: {
    ...PaperDefaultThme.colors,
    background: designToken.color.Grary.White,
    primary: designToken.color.Green,
  },
};

function App(): JSX.Element {
  const customTextProps = {
    style: {
      fontFamily: 'SUIT-Regular',
    },
  };
  setCustomText(customTextProps);
  useEffect(() => {
    const init = async () => {};
    init().finally(async () => {
      await RNBootSplash.hide({fade: true, duration: 500});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <PaperProvider theme={ThemePaper}>
      <RecoilRoot>
        <View style={{height: '100%'}}>
          <NavigationContainer theme={Theme}>
            <Stack.Navigator
              // initialRouteName="LaunchScreen"
              initialRouteName="LaunchScreen"
              screenOptions={{
                headerShown: false,
                animation: 'fade',
                headerShadowVisible: false,
              }}>
              <Stack.Screen name="LaunchScreen" component={LaunchScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen name="MainScreen" component={MainScreen} />
            </Stack.Navigator>
          </NavigationContainer>
          <Toast />
        </View>
      </RecoilRoot>
    </PaperProvider>
  );
}

export default App;
