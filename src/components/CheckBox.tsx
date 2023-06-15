import React from 'react';
import {TouchableOpacity} from 'react-native';
import CheckBoxOn from '../assets/icons/checkbox-on.svg';
import CheckBoxOff from '../assets/icons/checkbox-off.svg';
import {NumberProp} from 'react-native-svg';
interface CheckBoxProps {
  checked: boolean;
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  size?: NumberProp | undefined;
  onChange?: () => void;
}

const CheckBox = ({
  checked,
  setChecked,
  size = 16,
  onChange,
}: CheckBoxProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (setChecked) {
          setChecked(!checked);
        } else if (onChange) {
          onChange();
        }
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
