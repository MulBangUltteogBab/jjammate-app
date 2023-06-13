import React from 'react';
import {TouchableOpacity} from 'react-native';
import CheckBoxOn from '../assets/icons/checkbox-on.svg';
import CheckBoxOff from '../assets/icons/checkbox-off.svg';
import {NumberProp} from 'react-native-svg';
interface CheckBoxProps {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  size: NumberProp | undefined;
}

const CheckBox = ({checked, setChecked, size}: CheckBoxProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setChecked(!checked);
      }}>
      {checked ? (
        <CheckBoxOn height={size} width={size} />
      ) : (
        <CheckBoxOff height={size} width={size} />
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;
