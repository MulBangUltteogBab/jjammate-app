import React from 'react';
import {Modal, ScrollView} from 'react-native';
import Wrap from './Wrap';
import Header from './Header';
import Body2 from '../text/Body2';
import {Policy} from '../../assets/policy';
type PolicyModalProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const PolicyModal = ({visible, setVisible}: PolicyModalProps) => {
  return (
    <Modal visible={visible}>
      <Header
        title="이용약관"
        onPress={() => {
          setVisible(false);
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Wrap>
          <Body2>{Policy}</Body2>
        </Wrap>
      </ScrollView>
    </Modal>
  );
};

export default PolicyModal;
