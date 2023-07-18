import {StyleSheet, View} from 'react-native';
import Title1 from '../../components/text/Title1';
import designToken from '../../assets/design-tokens';
import Body2 from '../../components/text/Body2';
import {Key, useEffect, useState} from 'react';
import React from 'react';
import WorriorCard from '../../components/Exercise/WorriorCard';
import Wrap from '../../components/common/Wrap';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import CustomButton from '../../components/common/CustomButton';
import Title3 from '../../components/text/Title3';
import Caption2 from '../../components/text/Caption2';
import {LineChart, XAxis} from 'react-native-svg-charts';
import CardView from '../../components/common/CardView';
import {Caption} from 'react-native-paper';
import {Circle, Text} from 'react-native-svg';
import WorriorModal from '../../components/Exercise/WorriorModal';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {
  exerciseDaysSelector,
  getWorriorSelector,
  weekRecordSelector,
} from '../../states/exercise';
import {trigerAtom} from '../../states/utils';

const Dots = ({x, y, data}: any) => {
  return (
    <>
      {data?.map((value: any, index: Key | null | undefined) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={4}
          stroke={designToken.color.Green}
          fill={designToken.color.Green}
        />
      ))}
    </>
  );
};
const Labels = ({x, y, data}: any) => {
  return (
    <>
      {data?.map((value: any, index: Key | null | undefined) => (
        <Text
          key={index}
          x={x(index) - 5}
          y={y(value) - 15}
          fontSize={10}
          fontFamily="SUIT-Regular"
          fill={designToken.color.Green}>
          {value}
        </Text>
      ))}
    </>
  );
};

// export type WorriorType = {
//   id: number;
//   title: string;
//   state: string;
//   count: number;
//   icon: string;
//   time: number;
// };

function WarriorScreen(): JSX.Element {
  const [complete, setComplete] = useState(false);
  const day = useRecoilValue(exerciseDaysSelector);
  const weekRecord = useRecoilValue(weekRecordSelector);
  const [now, setNow] = useState(0);
  const [visible, setVisible] = useState(false);
  const [nowChart, setNowChart] = useState(0);
  const datas = [
    Object.entries(weekRecord.record).map(([_, value]) => {
      const tmp = value.run.split(':');
      return Number(tmp[0]) * 60 + Number(tmp[1]);
    }),
    Object.entries(weekRecord.record).map(([_, value]) => value.situp),
    Object.entries(weekRecord.record).map(([_, value]) => value.pushup),
  ];

  const worriors = useRecoilValue(getWorriorSelector);
  // const refreshWorriors = recoilfre
  // const [worriors, setWorrios] = useRecoilState(WorriorAtom);
  const xaxis = Object.entries(weekRecord.record).map(([key, _]) => key);

  const setTriger = useSetRecoilState(trigerAtom);
  // useEffect(() => {
  //   (worriors === undefined || worriors.length === 0) && setWorrios(getWorrior);
  // }, [getWorrior, setWorrios, worriors]);

  useEffect(() => {
    if (worriors) {
      for (let i = 0; i < 3; i++) {
        if (worriors[i].record != '00:00' && worriors[i].record != '0') {
          if (i === 2) {
            console.log(now);
            setComplete(true);
          } else {
            setNow(i + 1);
          }
        }
      }
    }
  }, [now, worriors]);

  console.log(worriors);
  return (
    <>
      {worriors && (
        <WorriorModal
          next={() => {
            // setWorrios(getWorrior);
            if (now < 2) {
              setNow(now + 1);
            } else {
              setComplete(true);
            }
            setTriger(pre => pre + 1);
          }}
          worrior={worriors[now]}
          visible={visible}
          setVisible={setVisible}
        />
      )}
      <View
        style={{
          backgroundColor: designToken.color.Grary.Gray100,
          height: '100%',
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Wrap>
            <View
              style={{
                alignItems: 'flex-end',
                gap: 7,
                marginTop: 16,
                flexDirection: 'row',
                marginBottom: 23,
              }}>
              <Body2>운동 시작한지</Body2>
              <Title1 style={{color: designToken.color.Green}}>
                Day {day.days}
              </Title1>
            </View>
            <View style={style.cardWrap}>
              {worriors &&
                worriors.map((item, index) => {
                  return <WorriorCard {...item} key={index} />;
                })}
            </View>
            <CustomButton
              title={
                now > 0
                  ? complete
                    ? '오늘 운동 완료'
                    : '운동 계속하기'
                  : '운동 시작하기'
              }
              activate={!complete}
              onPress={() => {
                setVisible(true);
              }}
            />
            <View style={{marginTop: 29, marginBottom: 17}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  marginBottom: 16,
                }}>
                <Title3 style={{color: designToken.color.Grary.Gray800}}>
                  나의 운동 기록
                </Title3>
                <Caption2 style={{color: designToken.color.Grary.Gray700}}>
                  최근 7일 기록입니다.
                </Caption2>
              </View>
              <CardView style={{paddingVertical: 20, paddingHorizontal: 10}}>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: designToken.color.Grary.Gray100,
                      padding: 5,
                      borderRadius: 4,
                      gap: 7,
                    }}>
                    {['뜀걸음', '윗몸일으키기', '팔굽혀펴기'].map(
                      (item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setNowChart(index);
                            }}>
                            {index === nowChart ? (
                              <CardView
                                style={{
                                  paddingVertical: 8,
                                  width: 90,
                                  alignItems: 'center',
                                  borderRadius: 4,
                                }}>
                                <Caption
                                  style={{
                                    color: designToken.color.Grary.Gray900,
                                  }}>
                                  {item}
                                </Caption>
                              </CardView>
                            ) : (
                              <View
                                style={{
                                  paddingVertical: 8,
                                  width: 90,
                                  alignItems: 'center',
                                }}>
                                <Caption
                                  style={{
                                    color: designToken.color.Grary.Gray500,
                                  }}>
                                  {item}
                                </Caption>
                              </View>
                            )}
                          </TouchableOpacity>
                        );
                      },
                    )}
                  </View>
                </View>
                <LineChart
                  animate={true}
                  style={{height: 200}}
                  data={datas[nowChart]}
                  svg={{stroke: designToken.color.Green, strokeWidth: 2}}
                  contentInset={{left: 20, right: 20, top: 20, bottom: 20}}>
                  <Dots />
                  <Labels />
                </LineChart>
                <XAxis
                  data={datas[nowChart]}
                  formatLabel={(_, index) => {
                    if (xaxis[index]) {
                      return xaxis[index].split('-').slice(1, 3).join('.');
                    } else {
                      return index;
                    }
                  }}
                  style={{marginTop: 10}}
                  contentInset={{left: 20, right: 20}}
                />
              </CardView>
            </View>
          </Wrap>
        </ScrollView>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  cardWrap: {
    gap: 8,
    marginBottom: 16,
  },
});
export default WarriorScreen;
