import React, {useState} from 'react';
import {Image, Modal, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Headline2 from '../text/Headline2';
import Caption from '../text/Caption';
import Caption2 from '../text/Caption2';
import designToken from '../../assets/design-tokens';
import {PxItemType} from '../../@types/nutrition';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BackImage from '../../assets/icons/back.svg';
import Title3 from '../text/Title3';
import Wrap from '../common/Wrap';
import Headline1 from '../text/Headline1';
import NutrientRatio from './NutrientRatio';
import CustomButton from '../common/CustomButton';

type PxItemProps = {
  data: PxItemType;
};
const PxItem = ({data}: PxItemProps) => {
  const [width, setWidth] = useState(0);
  const [isDetail, setIsDetail] = useState(false);
  const insets = useSafeAreaInsets();
  const handleLayout = (event: any) => {
    const {width} = event.nativeEvent.layout;
    setWidth(width);
  };

  return (
    <View>
      <Modal animationType="fade" visible={isDetail}>
        <View style={{height: '100%'}}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: insets.top + 16,
              zIndex: 3,
              marginLeft: '5%',
            }}
            onPress={() => {
              setIsDetail(false);
            }}>
            <BackImage />
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/test-item.png')}
            style={[{width: '100%', height: 300}]}
          />
          <Wrap>
            <Title3
              style={{
                color: designToken.color.Grary.Gray900,
                paddingVertical: 24,
              }}>
              {data.name + ' '}
            </Title3>
            <View style={style.hr} />
            <View style={style.modalKcal}>
              <Headline1 style={style.gray900}>🔥 총 열량</Headline1>
              <Headline1 style={style.gray900}>{data.kcal} kcal</Headline1>
            </View>
            <NutrientRatio
              carbohydrate={data.carbohydrate}
              protein={data.protein}
              fat={data.fat}
              column={true}
            />
          </Wrap>
          <View
            style={{
              position: 'absolute',
              bottom: insets.bottom,
              width: '100%',
            }}>
            <Wrap style={{marginBottom: 10}}>
              <CustomButton
                title={'추가하기'}
                activate={true}
                onPress={() => {
                  setIsDetail(false);
                }}
              />
            </Wrap>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onLayout={handleLayout}
        onPress={() => {
          setIsDetail(true);
        }}>
        <View style={{gap: 8}}>
          <Image
            source={require('../../assets/images/test-item.png')}
            style={[style.image, {width: width, height: width}]}
          />
          <Headline2 style={style.gray800}>{data.name}</Headline2>
          <Caption style={style.gray800}>{data.kcal}kcal</Caption>
          <View style={style.row}>
            <View
              style={[style.tag, {backgroundColor: 'rgba(33, 195, 137, 0.2)'}]}>
              <Caption2 style={{color: designToken.color.Green}}>
                {data.carbohydrate.value}
              </Caption2>
            </View>
            <View
              style={[style.tag, {backgroundColor: 'rgba(80, 126, 247, 0.2)'}]}>
              <Caption2 style={{color: designToken.color.Blue}}>
                {data.protein.value}
              </Caption2>
            </View>
            <View
              style={[
                style.tag,
                {backgroundColor: 'rgba(239, 142, 223, 0.2)'},
              ]}>
              <Caption2 style={{color: designToken.color.Pink}}>
                {data.fat.value}
              </Caption2>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  row: {
    gap: 4,
    flexDirection: 'row',
  },
  container: {
    gap: 8,
  },
  tag: {
    padding: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  image: {
    borderRadius: 12,
  },
  gray800: {
    color: designToken.color.Grary.Gray800,
  },
  hr: {
    height: 1,
    backgroundColor: designToken.color.Grary.Gray200,
  },
  gray900: {
    color: designToken.color.Grary.Gray900,
  },
  modalKcal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
  },
});
export default PxItem;
