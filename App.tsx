/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';

import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import LaunchScreen from './src/screens/LaunchScreen';
import {setCustomText} from 'react-native-global-props';
import {RecoilRoot} from 'recoil';
import LoginScreen from './src/screens/LoginScreen';
import designToken from './src/assets/design-tokens';

const Stack = createNativeStackNavigator();

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: designToken.color.Grary.White,
    primary: designToken.color.Green,
  },
};

function App(): JSX.Element {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true, duration: 500});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  const customTextProps = {
    style: {
      fontFamily: 'SUIT-Regular',
    },
  };
  setCustomText(customTextProps);

  return (
    <RecoilRoot>
      <SafeAreaView style={{height: '100%'}}>
        <NavigationContainer theme={Theme}>
          <Stack.Navigator
            initialRouteName="LaunchScreen"
            screenOptions={{
              headerShown: false,
              animation: 'fade',
              headerShadowVisible: false,
            }}>
            <Stack.Screen name="LaunchScreen" component={LaunchScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </RecoilRoot>
  );
}

export default App;
