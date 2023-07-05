import React from 'react';
import {FlatList, Modal, View} from 'react-native';
import Wrap from './Wrap';
import Header from './Header';
import Body2 from '../text/Body2';
import {License} from '../../assets/license';
import designToken from '../../assets/design-tokens';
import Title3 from '../text/Title3';

const LicenseModal = ({visible, setVisible}: any) => {
  const renderItem = ({item}: any) => {
    return (
      <View
        style={{
          borderBottomColor: designToken.color.Grary.Gray200,
          borderBottomWidth: 1,
          marginBottom: 15,
        }}>
        <Wrap style={{gap: 8}}>
          <Title3>{item.libraryName}</Title3>
          <Body2>{item.version}</Body2>
          <Body2>{item._license}</Body2>
          <Body2>{item._description}</Body2>
          <Body2>{item._licenseContent}</Body2>
        </Wrap>
      </View>
    );
  };
  return (
    <Modal visible={visible}>
      <Header
        title="라이센스"
        onPress={() => {
          setVisible(false);
        }}
      />
      <FlatList
        data={License}
        renderItem={renderItem}
        keyExtractor={item => String(item.libraryName)}
        showsVerticalScrollIndicator={false}
      />
    </Modal>
  );
};

export default LicenseModal;
