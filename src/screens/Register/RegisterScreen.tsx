import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import designToken from '../assets/design-tokens';
import Wrap from '../../components/Wrap';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from '../../components/Header';

const Stack = createNativeStackNavigator();

function RegisterScreen({navigation}: any): JSX.Element {
  return (
    <View>
      <Wrap>
        <Stack.Navigator
          screenOptions={{
            animation: 'slide_from_right',
            header: () => <Header />,
          }}>
          <Stack.Screen name="Type" component={} />
        </Stack.Navigator>
      </Wrap>
    </View>
  );
}

const style = StyleSheet.create({});
export default RegisterScreen;
