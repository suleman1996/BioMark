import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

import Check from '../../assets/svgs/tick-medication-icon';

import Styles from './styles';

type Props = {
  checked: boolean;
  setChecked: any;
};

const CheckBox = (props: Props) => {
  const { colors } = useTheme();
  const styles = Styles(colors);

  return (
    <TouchableOpacity
      onPress={() => props.setChecked(!props.checked)}
      style={[styles.checkbox, { borderColor: colors.blue }]}
    >
      {props.checked && <Check height={16} width={16} fill={colors.blue} />}
    </TouchableOpacity>
  );
};

export default CheckBox;
