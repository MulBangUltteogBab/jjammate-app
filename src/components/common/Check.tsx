import React from 'react';
import {TouchableOpacity} from 'react-native';
import CheckOn from '../../assets/icons/check-on.svg';
import CheckOff from '../../assets/icons/check-off.svg';
interface CheckProps {
  checked: boolean;
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?: () => void;
}

const Check = ({checked, setChecked, onChange}: CheckProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (setChecked) {
          setChecked(!checked);
        } else if (onChange) {
          onChange();
        }
      }}>
      {checked ? <CheckOn /> : <CheckOff />}
    </TouchableOpacity>
  );
};

export default Check;
