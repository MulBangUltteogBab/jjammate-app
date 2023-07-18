import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Title1 from '../../components/text/Title1';
import Wrap from '../../components/common/Wrap';
import Body2 from '../../components/text/Body2';
import {useEffect, useState} from 'react';
import designToken from '../../assets/design-tokens';
import WeightCard from '../../components/Exercise/WeightCard';
import CustomButton from '../../components/common/CustomButton';
import {ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '../../components/common/Header';
import Headline2 from '../../components/text/Headline2';
import Title2 from '../../components/text/Title2';
import ArmIcon from '../../assets/icons/arm.svg';
import CoughingIcon from '../../assets/icons/coughing_alt.svg';
import LegIcon from '../../assets/icons/leg.svg';
import ExplainModal from '../../components/Exercise/ExplainModal';
import Title3 from '../../components/text/Title3';
import CheckIcon from '../../assets/icons/check-on.svg';
import {ProgressCircle} from 'react-native-svg-charts';
import CompleteModal from '../../components/common/CompleteModal';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {
  exerciseAtom,
  exerciseDaysSelector,
  exerciseSelector,
} from '../../states/exercise';
import {userCodeSelector} from '../../states/setting';
import http from '../../utils/http';
import {trigerAtom} from '../../states/utils';

function WeightScreen(): JSX.Element {
  const code = useRecoilValue(userCodeSelector);

  const insets = useSafeAreaInsets();
  const day = useRecoilValue(exerciseDaysSelector);
  const getExercise = useRecoilValue(exerciseSelector);
  const [exercises, setExercises] = useRecoilState(exerciseAtom);

  const [during, setDuring] = useState(false);
  const [nowExcersie, setNowExcersie] = useState(0);
  const [nowSet, setNowSet] = useState(0);

  const [explain, setExplain] = useState(false);

  const [restModal, setRestModal] = useState(false);
  const [onRest, setOnRest] = useState(false);

  const [time, setTime] = useState(30);
  const restTimes = [30, 60, 90, 120];
  const [selectedRestTime, setSelectedRestTime] = useState(0);
  const [visibleComplete, setVisibleComplete] = useState(false);

  const [complete, setComplete] = useState(false);

  const setTriger = useSetRecoilState(trigerAtom);
  useEffect(() => {
    if (exercises) {
      for (let i = 0; i < exercises.data.length; i++) {
        if (exercises.data[i].done) {
          if (i === exercises.data.length - 1) {
            setComplete(true);
          } else {
            setNowExcersie(i + 1);
          }
        }
      }
    } else {
      setExercises(getExercise);
    }
  }, [exercises, getExercise, setExercises]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (onRest && time > 0) {
        setTime(prev => prev - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [onRest, time]);

  return (
    <>
      <Modal visible={during}>
        {exercises && exercises.data.length > 0 && (
          <ExplainModal
            exercise={exercises.data[nowExcersie]}
            visible={explain}
            setVisible={setExplain}
          />
        )}
        <CompleteModal
          onPress={async () => {
            // 운동 완료
            setComplete(true);
            setNowSet(0);
            setNowExcersie(0);
            setVisibleComplete(false);
            setOnRest(false);
            setRestModal(false);
            setDuring(false);
            setTriger(pre => pre + 1);
          }}
          visible={visibleComplete}
        />
        {restModal && <View style={style.overlayBackground} />}
        <Modal visible={restModal} transparent={true} animationType="slide">
          <View style={{flex: 1}} />
          <View
            style={{
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              backgroundColor: designToken.color.Grary.White,
              paddingBottom: insets.bottom,
            }}>
            <View style={style.barWrap}>
              <View style={style.grayBar} />
            </View>
            <Wrap>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 12,
                  justifyContent: 'space-between',
                }}>
                {restTimes.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={'restTime' + index}
                      style={[
                        {
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 18,
                        },
                        selectedRestTime === index
                          ? {
                              backgroundColor: 'rgba(33, 195, 137, 0.2)',
                              borderWidth: 1,
                              borderColor: designToken.color.Green,
                            }
                          : {
                              borderWidth: 1,
                              borderColor: designToken.color.Grary.Gray100,
                              backgroundColor: designToken.color.Grary.Gray100,
                            },
                      ]}
                      onPress={() => {
                        setSelectedRestTime(index);
                        setTime(item);
                      }}>
                      <Title2
                        style={
                          selectedRestTime === index
                            ? {color: designToken.color.Green}
                            : {color: designToken.color.Grary.Gray800}
                        }>{`${String(Math.floor(item / 60)).padStart(
                        2,
                        '0',
                      )}:${String(item % 60).padStart(2, '0')}`}</Title2>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Wrap>
            <View style={style.progressWrap}>
              <View style={style.timeWrap}>
                <Text style={style.timer}>{`${String(
                  Math.floor(time / 60),
                ).padStart(2, '0')}:${String(time % 60).padStart(
                  2,
                  '0',
                )}`}</Text>
              </View>
              <ProgressCircle
                style={{height: 240}}
                progress={time / restTimes[selectedRestTime]}
                progressColor={designToken.color.Green}
              />
            </View>
            <Wrap style={{marginBottom: 10}}>
              <CustomButton
                title={onRest ? '휴식 종료' : '휴식 시작'}
                activate={true}
                onPress={async () => {
                  if (onRest) {
                    if (nowSet === 3) {
                      setNowSet(0);
                      try {
                        const {data} = await http.post(
                          '/exercise/api/setexercise/',
                          {
                            ...code,
                            index: exercises.data[nowExcersie].id,
                          },
                        );
                        console.log(data);
                        setExercises({
                          data: exercises.data.map((item, index) => {
                            if (index === nowExcersie) {
                              return {
                                ...item,
                                done: true,
                              };
                            }
                            return item;
                          }),
                        });
                      } catch (err) {
                        console.log(
                          err + '    ' + '/exercise/api/setexercise/',
                        );
                      }
                      if (nowExcersie === exercises.data.length - 1) {
                        setVisibleComplete(true);
                      } else {
                        setNowExcersie(nowExcersie + 1);
                      }
                    } else {
                      setNowSet(nowSet + 1);
                    }
                    setOnRest(false);
                    setRestModal(false);
                    setTime(restTimes[selectedRestTime]);
                  } else {
                    setOnRest(true);
                  }
                }}
              />
            </Wrap>
          </View>
        </Modal>
        <View
          style={{
            backgroundColor: designToken.color.Grary.Gray100,
            height: '100%',
          }}>
          <View
            style={{
              backgroundColor: designToken.color.Grary.White,
              paddingTop: insets.top,
            }}>
            <Header
              onPress={() => {
                setDuring(false);
              }}
            />
          </View>
          <Wrap>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={style.container}>
                <View style={style.iconCover}>
                  {exercises &&
                    exercises.data.length > 0 &&
                    exercises.data[nowExcersie].part === 'body' && (
                      <CoughingIcon width={42} height={42} />
                    )}
                  {exercises &&
                    exercises.data.length > 0 &&
                    exercises.data[nowExcersie].part === 'arm' && (
                      <ArmIcon width={42} height={42} />
                    )}
                  {exercises &&
                    exercises.data.length > 0 &&
                    exercises.data[nowExcersie].part === 'leg' && (
                      <LegIcon width={42} height={42} />
                    )}
                </View>
                <View style={{gap: 8}}>
                  <View style={[style.row, {gap: 4}]}>
                    <View style={style.tag}>
                      <Headline2 style={{color: designToken.color.Green}}>
                        {exercises &&
                          exercises.data.length > 0 &&
                          exercises.data[nowExcersie].tag}
                      </Headline2>
                    </View>
                  </View>
                  <Title2 style={{color: designToken.color.Grary.Gray900}}>
                    {exercises &&
                      exercises.data.length > 0 &&
                      exercises.data[nowExcersie].title}
                  </Title2>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setExplain(true);
                }}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: designToken.color.Grary.Gray500,
                }}>
                <Body2 style={{color: designToken.color.Grary.Gray500}}>
                  설명보기
                </Body2>
              </TouchableOpacity>
            </View>
          </Wrap>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginBottom: 10, flex: 1}}>
            <Wrap>
              <View style={{gap: 12}}>
                {[10, 10, 10, 10].map((item: any, index: number) => {
                  return (
                    <View
                      key={'set' + index}
                      style={[
                        style.setItem,
                        nowSet > index && style.doneSet,
                        nowSet == index && style.nowSet,
                      ]}>
                      <View
                        style={{
                          gap: 16,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Title3 style={{color: designToken.color.Green}}>
                          {index + 1}세트
                        </Title3>
                        <Title2
                          style={{color: designToken.color.Grary.Gray900}}>
                          {item}회
                        </Title2>
                      </View>
                      {nowSet > index && <CheckIcon width={18} height={18} />}
                    </View>
                  );
                })}
              </View>
            </Wrap>
          </ScrollView>
          <Wrap style={{marginBottom: insets.bottom + 10}}>
            <CustomButton
              title={String(nowSet + 1) + '세트 완료'}
              activate={true}
              onPress={() => {
                setRestModal(true);
              }}
            />
          </Wrap>
        </View>
      </Modal>
      <View style={style.section}>
        <Wrap>
          <View
            style={[
              style.row,
              {alignItems: 'flex-end', gap: 7, marginTop: 16},
            ]}>
            <Body2>운동 시작한지</Body2>
            <Title1 style={{color: designToken.color.Green}}>
              Day {day.days}
            </Title1>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[style.scroll, {marginBottom: insets.bottom + 80}]}>
            <View style={style.cardWrap}>
              {exercises &&
                exercises.data.map(exercise => {
                  return <WeightCard key={exercise.title} {...exercise} />;
                })}
            </View>
            <CustomButton
              title={complete ? '오늘의 운동 완료' : '추천 운동 시작하기'}
              onPress={() => {
                setDuring(true);
              }}
              activate={!complete}
            />
            <View style={{height: 10}} />
          </ScrollView>
        </Wrap>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  timer: {
    color: designToken.color.Grary.Gray900,
    fontFamily: 'SUIT-Regular',
    fontSize: 48,
  },
  timeWrap: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  barWrap: {
    alignItems: 'center',
    marginTop: 13,
    marginBottom: 24,
  },
  grayBar: {
    height: 5,
    width: 90,
    backgroundColor: designToken.color.Grary.Gray200,
  },
  progressWrap: {
    marginBottom: 135,
    marginTop: 69,
  },
  overlayBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.54)',
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  doneSet: {
    backgroundColor: 'rgba(33, 195, 137, 0.2)',
  },
  nowSet: {
    borderWidth: 1,
    borderColor: designToken.color.Green,
  },
  setItem: {
    padding: 17,
    backgroundColor: designToken.color.Grary.White,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    height: '100%',
    backgroundColor: designToken.color.Grary.Gray100,
  },
  row: {
    flexDirection: 'row',
  },
  scroll: {
    marginTop: 23,
  },
  cardWrap: {
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: 'rgba(33, 195, 137, 0.1)',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  container: {
    justifyContent: 'flex-start',
    // paddingVertical: 14,
    marginVertical: 33,
    // marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  iconCover: {
    backgroundColor: 'rgba(33, 195, 137, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: 56,
    borderRadius: 100,
  },
});

export default WeightScreen;
