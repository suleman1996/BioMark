import React from 'react';
import { Checkbox } from 'react-native-paper';

import colors from 'assets/colors';

type Props = {
  checked: boolean;
  setChecked: any;
};

const CheckBox = (props: Props) => {
  return (
    <Checkbox
      status={props.checked ? 'checked' : 'unchecked'}
      onPress={() => {
        props.setChecked(!props.checked);
      }}
      uncheckedColor={colors.blue}
      color={colors.blue}
    />
  );
};

export default CheckBox;
