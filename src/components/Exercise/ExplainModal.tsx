import React from 'react';
import {Modal, ScrollView, StyleSheet, View} from 'react-native';
import CardView from '../common/CardView';
import ArmIcon from '../../assets/icons/arm.svg';
import CoughingIcon from '../../assets/icons/coughing_alt.svg';
import LegIcon from '../../assets/icons/leg.svg';
import designToken from '../../assets/design-tokens';
import {Exercise} from '../../@types/exercise';
import Wrap from '../common/Wrap';
import CustomButton from '../common/CustomButton';
import Title2 from '../text/Title2';
import Headline2 from '../text/Headline2';
import Body1 from '../text/Body1';

type ExplainModalProps = {
  exercise: Exercise;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExplainModal = ({exercise, visible, setVisible}: ExplainModalProps) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={style.overlay}>
        <Wrap>
          <CardView style={style.overlayCard}>
            <View style={style.container}>
              <View style={style.iconCover}>
                {exercise.part === 'body' && (
                  <CoughingIcon width={42} height={42} />
                )}
                {exercise.part === 'arm' && <ArmIcon width={42} height={42} />}
                {exercise.part === 'leg' && <LegIcon width={42} height={42} />}
              </View>
              <View style={{gap: 8}}>
                <View style={[style.row, {gap: 4}]}>
                  <View style={style.tag}>
                    <Headline2 style={{color: designToken.color.Green}}>
                      {exercise.tag}
                    </Headline2>
                  </View>
                </View>
                <Title2 style={{color: designToken.color.Grary.Gray900}}>
                  {exercise.title}
                </Title2>
              </View>
            </View>
            <ScrollView
              style={{flex: 1, marginBottom: 10}}
              showsVerticalScrollIndicator={false}>
              <View style={{gap: 12, marginBottom: 10}}>
                {exercise.explains.map((item: any, index: number) => {
                  return (
                    <View style={style.explainCard} key={index}>
                      <Body1 style={{color: designToken.color.Grary.Gray900}}>
                        {index + 1}.
                      </Body1>
                      <Body1
                        style={{
                          color: designToken.color.Grary.Gray900,
                          flexShrink: 1,
                        }}>
                        {item}
                      </Body1>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <CustomButton
              title="닫기"
              onPress={() => {
                setVisible(false);
              }}
              activate={true}
            />
          </CardView>
        </Wrap>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  explainCard: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    gap: 8,
    backgroundColor: designToken.color.Grary.Gray100,
    borderRadius: 4,
  },
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
    // paddingVertical: 14,
    marginTop: 10,
    marginBottom: 24,
    paddingHorizontal: 10,
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
export default ExplainModal;
