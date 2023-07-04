import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Wrap from '../../components/common/Wrap';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import Title3 from '../../components/text/Title3';
import BellIcon from '../../assets/icons/bell.svg';
import designToken from '../../assets/design-tokens';
import WeightScreen from './WeightScreen';
import WarriorScreen from './WarriorScreen';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();

function ExerciseScreen(): JSX.Element {
  const [screen, setScreen] = useState<string | never>('weightScreen');
  const navigation = useNavigation();
  useEffect(() => {
    navigation.navigate(screen as never);
  }, [navigation, screen]);
  return (
    <SafeAreaView style={{height: '100%'}}>
      <Wrap
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 17,
          backgroundColor: designToken.color.Grary.White,
        }}>
        <View style={{flexDirection: 'row', gap: 16}}>
          <TouchableOpacity
            onPress={() => {
              setScreen('weightScreen');
            }}>
            <Title3
              style={{
                color:
                  screen === 'weightScreen'
                    ? designToken.color.Green
                    : designToken.color.Grary.Gray300,
              }}>
              웨이트
            </Title3>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setScreen('warriorScreen');
            }}>
            <Title3
              style={{
                color:
                  screen === 'warriorScreen'
                    ? designToken.color.Green
                    : designToken.color.Grary.Gray300,
              }}>
              특급전사
            </Title3>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <BellIcon fill={'rgba(89, 95, 114, 1)'} />
        </TouchableOpacity>
      </Wrap>
      <Stack.Navigator
        initialRouteName="weightScreen"
        screenOptions={{
          gestureDirection: 'horizontal',
          headerShown: false,
        }}>
        <Stack.Screen name="weightScreen" component={WeightScreen} />
        <Stack.Screen name="warriorScreen" component={WarriorScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

export default ExerciseScreen;
