import React, {useEffect, useState} from 'react';
import {Image, Modal, StyleSheet, View} from 'react-native';
import Header from '../common/Header';
import {WorriorType} from '../../@types/exercise';
import {createStackNavigator} from '@react-navigation/stack';
import RunningIcon from '../../assets/icons/Running.svg';
type WorriorModalProps = {
  worrior: WorriorType;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const Stack = createStackNavigator();

const Timer = ({id}: any) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const limit = (id == 0 ? 21 : 2) * 60;
  useEffect(() => {
    const timer = setInterval(() => {
      if (isRunning && time < limit) setTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, time]);

  return (
    <View style={{height: '100%'}}>
      <View></View>
    </View>
  );
};

const WorriorModal = ({worrior, visible, setVisible}: WorriorModalProps) => {
  return (
    <Modal visible={visible}>
      <View>
        <Header
          title={worrior.title}
          onPress={() => {
            setVisible(false);
          }}
        />
        <Stack.Navigator
          initialRouteName="WorriorInfoScreen"
          screenOptions={{
            gestureDirection: 'horizontal',
            headerShown: false,
          }}>
          <Stack.Screen name="Timer">
            {props => <Timer id={worrior.id} />}
          </Stack.Screen>
          <Stack.Screen name="WorriorInfoScreen">
            {props => <View />}
          </Stack.Screen>
        </Stack.Navigator>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({});
export default WorriorModal;
