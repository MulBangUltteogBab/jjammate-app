import React from 'react';
import {Modal, StyleSheet, View, ViewProps} from 'react-native';
import designToken from '../../assets/design-tokens';
import Wrap from './Wrap';
import CustomButton from './CustomButton';
import Title3 from '../text/Title3';
import CompleteIcon from '../../assets/icons/fi-sr-comment-check.svg';

const CompleteModal = ({
  visible,
  onPress,
  title = '오늘의 운동을 완료했어요!',
}: any) => {
  return (
    <>
      {visible && (
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.54)',
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: 1,
          }}
        />
      )}
      <Modal visible={visible} transparent={true} animationType="fade">
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
                  {title}
                </Title3>
              </View>
              <CustomButton
                title="운동으로 가기"
                activate={true}
                onPress={onPress}
              />
            </View>
          </Wrap>
        </View>
      </Modal>
    </>
  );
};

export default CompleteModal;
