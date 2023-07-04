import React, {useState} from 'react';
import {Image, Modal, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import CardView from '../common/CardView';
import ArmIcon from '../../assets/icons/arm.svg';
import CoughingIcon from '../../assets/icons/coughing_alt.svg';
import LegIcon from '../../assets/icons/leg.svg';
import designToken from '../../assets/design-tokens';
import Body2 from '../text/Body2';
import Caption2 from '../text/Caption2';
import {ExerciseType} from '../../@types/exercise';
import Header from '../common/Header';
import Wrap from '../common/Wrap';
import ExplainModal from './ExplainModal';

const WeightCard = (exercise: ExerciseType) => {
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
          <View style={style.iconCover}>
            {exercise.icon === 'cough' && <CoughingIcon />}
            {exercise.icon === 'arm' && <ArmIcon />}
            {exercise.icon === 'leg' && <LegIcon />}
          </View>
          <View style={{gap: 8}}>
            <View style={[style.row, {gap: 4}]}>
              {exercise.tags.map((item: any, index: number) => {
                return (
                  <View style={style.tag} key={index}>
                    <Caption2 style={{color: designToken.color.Green}}>
                      {item}
                    </Caption2>
                  </View>
                );
              })}
            </View>
            <Body2 style={{color: designToken.color.Grary.Black}}>
              {exercise.title}
            </Body2>
          </View>
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
    justifyContent: 'flex-start',
    paddingVertical: 14,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
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
