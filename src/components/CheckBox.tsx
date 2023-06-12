import React from 'react';
import {TouchableOpacity} from 'react-native';
import CheckBoxOn from '../assets/icons/checkbox-on.svg';
import CheckBoxOff from '../assets/icons/checkbox-off.svg';
interface CheckBoxProps {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckBox = ({checked, setChecked}: CheckBoxProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setChecked(!checked);
      }}>
      {checked ? <CheckBoxOn /> : <CheckBoxOff />}
    </TouchableOpacity>
  );
};

export default CheckBox;
