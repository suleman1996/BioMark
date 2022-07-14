import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

import Check from '../../assets/svgs/tick-medication-icon';

import Styles from './styles';

type Props = {
  checked: boolean;
  setChecked: any;
  style?: any;
  checkSizeHeight?: number;
  checkSizeWidth?: number;
};

const CheckBox = (props: Props) => {
  const { colors } = useTheme();
  const styles = Styles(colors);

  return (
    <TouchableOpacity
      onPress={() => props.setChecked(!props.checked)}
      style={[styles.checkbox, { borderColor: colors.blue }, props.style]}
    >
      {props.checked && (
        <Check
          height={props.checkSizeHeight ? props.checkSizeHeight : 16}
          width={props.checkSizeWidth ? props.checkSizeWidth : 16}
          fill={colors.blue}
        />
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;
