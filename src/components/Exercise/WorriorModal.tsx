import React, {useEffect, useState} from 'react';
import {Modal, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from '../common/Header';
import {WorriorType} from '../../@types/exercise';
import RunningIcon from '../../assets/icons/Running.svg';
import Title1 from '../text/Title1';
import Wrap from '../common/Wrap';
import CustomButton from '../common/CustomButton';
import designToken from '../../assets/design-tokens';
import CompleteModal from '../common/CompleteModal';
import CustomInput from '../common/CustomInput';
type WorriorModalProps = {
  worrior: WorriorType;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Timer = ({id = 0, onComplete}: any) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const limit = (id === 0 ? 21 : 2) * 60;
  useEffect(() => {
    const timer = setInterval(() => {
      if (isRunning && time < limit) {
        setTime(prev => prev + 1);
      }
      if (time >= limit) {
        setIsRunning(false);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, limit, time]);

  return (
    <>
      <Wrap style={{height: '100%'}}>
        <View style={{flexDirection: 'row', marginTop: 96, width: '100%'}}>
          <View style={{flex: time, alignItems: 'flex-end'}}>
            <RunningIcon />
          </View>
          <View style={{flex: limit - time}} />
        </View>
        <View style={{marginTop: 7, marginBottom: 35}}>
          <View
            style={{
              height: 6,
              borderRadius: 6,
              backgroundColor: designToken.color.Grary.Gray100,
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: time,
                backgroundColor: designToken.color.Green,
                height: 6,
                borderRadius: 6,
              }}
            />
            <View style={{flex: limit - time}} />
          </View>
        </View>
        <Text style={style.timeText}>
          {String(Math.floor(time / 60)).padStart(2, '0')}:
          {String(time % 60).padStart(2, '0')}
        </Text>
        {time > 0 && !isRunning && (
          <CustomButton
            activate={true}
            activateStyle={style.recordButton}
            titleColor={designToken.color.Green}
            title="초기화"
            onPress={() => {
              setTime(0);
            }}
          />
        )}
        <CustomButton
          title={isRunning ? '중단' : time > 0 ? '기록하기' : '시작'}
          activate={true}
          onPress={() => {
            if (isRunning) {
              setIsRunning(false);
            } else {
              if (time > 0) {
                // setComplete(true);
                onComplete();
              } else {
                setIsRunning(true);
              }
            }
          }}
          activateStyle={isRunning ? style.stopButton : {}}
        />
        {/* </View> */}
      </Wrap>
    </>
  );
};

const Input = ({onComplete}: any) => {
  return (
    <View style={{flex: 1}}>
      <Wrap>
        <Title1
          style={{color: designToken.color.Grary.Gray900, marginVertical: 32}}>
          개수를 입력해주세요
        </Title1>
        <CustomInput
          style={{
            fontFamily: 'SUIT-Regular',
            fontSize: 22,
            color: designToken.color.Grary.Gray900,
          }}
          right={
            <Title1 style={{color: designToken.color.Grary.Black}}>개</Title1>
          }
        />
      </Wrap>
      <View style={{flex: 1}} />
      <Wrap style={{marginBottom: 10}}>
        <CustomButton
          activate={true}
          onPress={() => {
            onComplete();
            //api 호출
          }}
          title="완료"
        />
      </Wrap>
    </View>
  );
};

const WorriorModal = ({worrior, visible, setVisible}: WorriorModalProps) => {
  const [onInput, setOnInput] = useState(false);
  const [complete, setComplete] = useState(false);
  return (
    <Modal visible={visible}>
      <CompleteModal
        visible={complete}
        title="운동으로 가기"
        onPress={() => {
          setComplete(false);
          setVisible(false);
          setOnInput(false);
        }}
      />
      <SafeAreaView style={{height: '100%'}}>
        <Header
          title={worrior.title}
          onPress={() => {
            setVisible(false);
          }}
        />
        {!onInput && (
          <Timer
            id={worrior.id}
            onComplete={
              worrior.id != 0 ? () => setComplete(true) : () => setOnInput(true)
            }
          />
        )}
        {onInput && <Input onComplete={() => setComplete(true)} />}
      </SafeAreaView>
    </Modal>
  );
};

const style = StyleSheet.create({
  timeText: {
    color: designToken.color.Grary.Black,
    fontFamily: 'SUIT-Bold',
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 35,
  },
  stopButton: {
    backgroundColor: designToken.color.Red,
  },
  recordButton: {
    backgroundColor: designToken.color.Grary.White,
    borderColor: designToken.color.Green,
    borderWidth: 1,
    marginBottom: 8,
  },
});
export default WorriorModal;
