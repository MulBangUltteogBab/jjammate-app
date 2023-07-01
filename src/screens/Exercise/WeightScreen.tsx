import {StyleSheet, View} from 'react-native';
import Title1 from '../../components/text/Title1';
import Wrap from '../../components/common/Wrap';
import Body2 from '../../components/text/Body2';
import {useState} from 'react';
import designToken from '../../assets/design-tokens';

function WeightScreen({navigation}: any): JSX.Element {
  const [day, setDay] = useState(1);
  return (
    <Wrap>
      <View style={[style.row, {alignItems: 'flex-end', gap: 7}]}>
        <Body2>운동 시작한지</Body2>
        <Title1 style={{color: designToken.color.Green}}>Day {day}</Title1>
      </View>
    </Wrap>
  );
}

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export default WeightScreen;
