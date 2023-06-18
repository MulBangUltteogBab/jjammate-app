import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeIcon from '../assets/icons/home.svg';
import SaladIcon from '../assets/icons/salad.svg';
import HeartIcon from '../assets/icons/heart.svg';
import UserIcon from '../assets/icons/user.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Caption from '../components/text/Caption';
import HomeScreen from './HomeScreen';
import designToken from '../assets/design-tokens';
import NutritionScreen from './NutritionScreen';

function BottomBar({state, descriptors, navigation}: any) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[style.AppBar, {paddingBottom: insets.bottom}]}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label = options.title;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={style.AppBarItem}>
            {index === 0 && (
              <HomeIcon
                fill={
                  isFocused
                    ? designToken.color.Green
                    : designToken.color.Grary.Gray400
                }
              />
            )}
            {index === 1 && (
              <SaladIcon
                fill={
                  isFocused
                    ? designToken.color.Green
                    : designToken.color.Grary.Gray400
                }
              />
            )}
            {index === 2 && (
              <HeartIcon
                fill={
                  isFocused
                    ? designToken.color.Green
                    : designToken.color.Grary.Gray400
                }
              />
            )}
            {index === 3 && (
              <UserIcon
                fill={
                  isFocused
                    ? designToken.color.Green
                    : designToken.color.Grary.Gray400
                }
              />
            )}
            <Caption
              style={[
                style.AppBarItemTitle,
                {
                  color: isFocused
                    ? designToken.color.Green
                    : designToken.color.Grary.Gray400,
                },
              ]}>
              {label}
            </Caption>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();
function MainScreen(): JSX.Element {
  //   const Width = Dimensions.get('window').width;
  //   const insets = useSafeAreaInsets();
  return (
    <View style={{height: '100%'}}>
      <Tab.Navigator
        tabBar={props => <BottomBar {...props} />}
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{title: '홈'}}
        />
        <Tab.Screen
          name="Nutrition"
          component={NutritionScreen}
          options={{title: '영양'}}
        />
        <Tab.Screen
          name="Exercise"
          component={HomeScreen}
          options={{title: '운동'}}
        />
        <Tab.Screen
          name="MyPage"
          component={HomeScreen}
          options={{title: '마이페이지'}}
        />
      </Tab.Navigator>
    </View>
  );
}

const style = StyleSheet.create({
  AppBar: {
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.06,
    // zIndex: 999,
    backgroundColor: '#fff',
    elevation: 2,
  },
  AppBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 9,
  },
  AppBarItemTitle: {
    marginTop: 4,
    fontSize: 12,
  },
});

export default MainScreen;
