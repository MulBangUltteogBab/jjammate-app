import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import CardView from '../common/CardView';
import ArmIcon from '../../assets/icons/arm.svg';
import BodyIcon from '../../assets/icons/coughing_alt.svg';
import LegIcon from '../../assets/icons/leg.svg';
import designToken from '../../assets/design-tokens';
import Body2 from '../text/Body2';
import Caption2 from '../text/Caption2';
import {Exercise} from '../../@types/exercise';
import ExplainModal from './ExplainModal';
import Headline1 from '../text/Headline1';

const WeightCard = (exercise: Exercise) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <ExplainModal
        visible={visible}
        setVisible={setVisible}
        exercise={exercise}
      />
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}>
        <CardView style={style.container}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 18}}>
            <View style={style.iconCover}>
              {exercise.part === 'body' && <BodyIcon />}
              {exercise.part === 'arm' && <ArmIcon />}
              {exercise.part === 'leg' && <LegIcon />}
            </View>
            <View style={{gap: 8}}>
              <View style={[style.row, {gap: 4}]}>
                <View style={style.tag}>
                  <Caption2 style={{color: designToken.color.Green}}>
                    {exercise.tag}
                  </Caption2>
                </View>
              </View>
              <Body2 style={{color: designToken.color.Grary.Black}}>
                {exercise.title}
              </Body2>
            </View>
          </View>
          {exercise.done && (
            <View
              style={{
                backgroundColor: 'rgba(33, 195, 137, 0.1)',
                paddingHorizontal: 6,
                paddingVertical: 4,
                borderRadius: 4,
              }}>
              <Headline1 style={{color: designToken.color.Green}}>
                완료
              </Headline1>
            </View>
          )}
        </CardView>
      </TouchableOpacity>
    </>
  );
};

const style = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.54)',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayCard: {
    height: 550,
    borderRadius: 24,
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  tag: {
    backgroundColor: 'rgba(33, 195, 137, 0.1)',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  row: {
    flexDirection: 'row',
  },
  container: {
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCover: {
    backgroundColor: 'rgba(33, 195, 137, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 48,
    borderRadius: 100,
  },
});
export default WeightCard;
