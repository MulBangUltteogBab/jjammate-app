import React, {useState} from 'react';
import {Modal, TouchableOpacity} from 'react-native';
import BellIcon from '../../assets/icons/bell.svg';
import {View} from 'react-native';
import Title1 from '../text/Title1';

const Notice = () => {
  const [visible, _] = useState(false);
  return (
    <>
      <Modal visible={visible}>
        <View style={{height: '100%'}}>
          <Title1>test</Title1>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          //   setVisible(true);
        }}>
        <BellIcon fill={'white'} />
      </TouchableOpacity>
    </>
  );
};

// const style = StyleSheet.create({});
export default Notice;
