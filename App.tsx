/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import LaunchScreen from './src/screens/LaunchScreen';
import {setCustomText} from 'react-native-global-props';

function App(): JSX.Element {
  const customTextProps = {
    style: {
      fontFamily: 'SUIT-Regular',
    },
  };
  setCustomText(customTextProps);

  return (
    <SafeAreaView>
      <LaunchScreen />
    </SafeAreaView>
  );
}

export default App;
