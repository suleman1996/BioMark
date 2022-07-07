import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { TextInput } from 'components';

import { heightToDp } from 'utils/functions/responsive-dimensions';

import makeStyles from './styles';

type Props = {
  label: string;
  placeholder: string;
  isSecure: boolean;
  password: string;
  setHidePassword: any;
  hidePassword: boolean;
  onChange: any;
  marginTop?: number;
  labelStyle?: any;
};

const PasswordInputWithLabel = ({
  label,
  placeholder,
  isSecure,
  password,
  setHidePassword,
  hidePassword,
  onChange,
  marginTop,
  labelStyle,
}: Props) => {
  let otherStyles = [];

  if (marginTop) {
    otherStyles.push({ marginTop: heightToDp(marginTop) });
  }

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={[styles.inputLabel, labelStyle]}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={isSecure}
        eye={isSecure ? 'eye-off' : 'eye'}
        value={password}
        onEyePress={() => {
          setHidePassword(!hidePassword);
        }}
        onChange={onChange}
      />
    </View>
  );
};

export default PasswordInputWithLabel;
