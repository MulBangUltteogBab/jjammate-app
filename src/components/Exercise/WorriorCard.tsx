import React from 'react';
import {StyleSheet, View} from 'react-native';
import CardView from '../common/CardView';
import ArmIcon from '../../assets/icons/arm.svg';
import CoughingIcon from '../../assets/icons/coughing_alt.svg';
import LegIcon from '../../assets/icons/leg.svg';
import designToken from '../../assets/design-tokens';
import Body2 from '../text/Body2';
import {WorriorType} from '../../@types/exercise';
import Headline1 from '../text/Headline1';

const WorriorCard = (worrior: WorriorType) => {
  // console.log(String(worrior.record) !== '0');
  return (
    <CardView style={style.container}>
      <View style={style.row}>
        <View style={style.iconCover}>
          {worrior.icon === 'body' && <CoughingIcon />}
          {worrior.icon === 'arm' && <ArmIcon />}
          {worrior.icon === 'leg' && <LegIcon />}
        </View>
        <View style={{gap: 8}}>
          <Body2 style={{color: designToken.color.Grary.Black}}>
            {worrior.title}
          </Body2>
          <Body2 style={{color: designToken.color.Grary.Black}}>
            {String(worrior.record) !== '0' &&
              worrior.record !== '00:00' &&
              worrior.record + (worrior.icon === 'leg' ? '' : '개')}
          </Body2>
        </View>
      </View>
      {worrior.state &&
        String(worrior.record) !== '0' &&
        worrior.record != '00:00' && (
          <View
            style={{
              paddingHorizontal: 4,
              paddingVertical: 2,
              borderRadius: 4,
              marginRight: 12,
              backgroundColor:
                worrior.state > 3
                  ? 'rgba(255, 77, 77, 0.1)'
                  : 'rgba(33, 195, 137, 0.1)',
            }}>
            <Headline1
              style={{
                color:
                  worrior.state > 3
                    ? designToken.color.Red
                    : designToken.color.Green,
              }}>
              {worrior.state < 4
                ? worrior.state == 0
                  ? '특급'
                  : worrior.state + '급'
                : '불합격'}
            </Headline1>
          </View>
        )}
    </CardView>
  );
};

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
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
export default WorriorCard;
