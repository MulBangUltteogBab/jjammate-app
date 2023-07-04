import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Title1 from '../../components/text/Title1';
import Wrap from '../../components/common/Wrap';
import Body2 from '../../components/text/Body2';
import {useCallback, useEffect, useState} from 'react';
import designToken from '../../assets/design-tokens';
import WeightCard from '../../components/Exercise/WeightCard';
import CustomButton from '../../components/common/CustomButton';
import {ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ExerciseType} from '../../@types/exercise';
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
import CompleteIcon from '../../assets/icons/fi-sr-comment-check.svg';

function WeightScreen({navigation}: any): JSX.Element {
  const insets = useSafeAreaInsets();
  const [day, setDay] = useState(1);
  const [exercises, setExercise] = useState<ExerciseType[]>([
    {
      id: 1,
      title: '덤벨 벤치 프레스',
      tags: ['가슴', '덤벨'],
      icon: 'cough',
      explains: [
        '벤치 끝 쪽에 엉덩이를 대고 앉은 다음 양손에 덤벨을 잡습니다.',
        '그 상태에서 덤벨을 가슴 쪽으로 가져와 벤치에 눕습니다.',
        '누운 상태에서 견갑골을 벤치에 고정하고 양손에 든 덤벨을 위로 올립니다.',
        '덤벨을 너무 위로 올려 어깨가 들리지 않도록 하며 내릴때에는 가슴에 자극을 느끼며 흉곽을 펼치며 내려옵니다.',
      ],
      sets: ['15', '15', '15', '15'],
    },
    {
      id: 2,
      title: '덤벨 벤치 프레스',
      tags: ['가슴', '덤벨'],
      icon: 'arm',
      explains: ['세부사항1', '세부사항2'],
      sets: ['15', '15', '15', '15'],
    },
    {
      id: 3,
      title: '덤벨 벤치 프레스',
      tags: ['가슴', '덤벨'],
      icon: 'leg',
      explains: ['세부사항1', '세부사항2'],
      sets: ['15', '15', '15', '15'],
    },
  ]);
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

  useEffect(() => {
    const timer = setInterval(() => {
      if (onRest && time > 0) setTime(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [onRest, time]);
  return (
    <>
      <ExplainModal
        exercise={exercises[nowExcersie]}
        visible={explain}
        setVisible={setExplain}
      />
      <Modal visible={during}>
        {(restModal || visibleComplete) && (
          <View style={style.overlayBackground} />
        )}
        <Modal
          visible={visibleComplete}
          transparent={true}
          animationType="fade">
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Wrap>
              <View
                style={{
                  backgroundColor: designToken.color.Grary.White,
                  borderRadius: 24,
                  width: '100%',
                  paddingVertical: 19,
                  paddingHorizontal: 27,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <View style={{marginTop: 33}}>
                  <CompleteIcon />
                </View>
                <View style={{marginTop: 25, marginBottom: 47}}>
                  <Title3 style={{color: designToken.color.Grary.Gray800}}>
                    오늘의 운동을 완료했어요!
                  </Title3>
                </View>
                <CustomButton
                  title="운동으로 가기"
                  activate={true}
                  onPress={() => {
                    // 운동 완료
                    setNowSet(0);
                    setNowExcersie(0);
                    setVisibleComplete(false);
                    setOnRest(false);
                    setRestModal(false);
                    setDuring(false);
                  }}
                />
              </View>
            </Wrap>
          </View>
        </Modal>
        <Modal visible={restModal} transparent={true} animationType="slide">
          <View style={{flex: 1}} />
          <View
            style={{
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              backgroundColor: designToken.color.Grary.White,
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
                onPress={() => {
                  if (onRest) {
                    setRestModal(false);
                    if (nowSet === exercises[nowExcersie].sets.length - 1) {
                      setNowSet(0);
                      if (nowExcersie === exercises.length - 1) {
                        setVisibleComplete(true);
                      } else {
                        setNowExcersie(nowExcersie + 1);
                      }
                    } else {
                      setNowSet(nowSet + 1);
                    }
                    setOnRest(false);
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
          <View style={{backgroundColor: designToken.color.Grary.White}}>
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
                  {exercises[nowExcersie].icon === 'cough' && (
                    <CoughingIcon width={42} height={42} />
                  )}
                  {exercises[nowExcersie].icon === 'arm' && (
                    <ArmIcon width={42} height={42} />
                  )}
                  {exercises[nowExcersie].icon === 'leg' && (
                    <LegIcon width={42} height={42} />
                  )}
                </View>
                <View style={{gap: 8}}>
                  <View style={[style.row, {gap: 4}]}>
                    {exercises[nowExcersie].tags.map(
                      (item: any, index: number) => {
                        return (
                          <View style={style.tag} key={'tag' + index}>
                            <Headline2 style={{color: designToken.color.Green}}>
                              {item}
                            </Headline2>
                          </View>
                        );
                      },
                    )}
                  </View>
                  <Title2 style={{color: designToken.color.Grary.Gray900}}>
                    {exercises[nowExcersie].title}
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
                {exercises[nowExcersie].sets.map((item: any, index: number) => {
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
          <Wrap style={{marginBottom: 10}}>
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
            <Title1 style={{color: designToken.color.Green}}>Day {day}</Title1>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[style.scroll, {marginBottom: insets.bottom + 80}]}>
            <View style={style.cardWrap}>
              {exercises.map(exercise => {
                return (
                  <WeightCard key={'exercise' + exercise.id} {...exercise} />
                );
              })}
            </View>
            <CustomButton
              title="추천 운동 시작하기"
              onPress={() => {
                setDuring(true);
              }}
              activate={true}
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
