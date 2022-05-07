import React from 'react';
import { Text, View } from 'react-native';

import { TextInput } from 'components';

import { heightToDp } from 'utils/functions/responsive-dimensions';

import { styles } from './styles';

type Props = {
  label: string;
  placeholder: string;
  isSecure: boolean;
  password: string;
  setHidePassword: any;
  hidePassword: boolean;
  onChange: any;
  marginTop?: number;
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
}: Props) => {
  let otherStyles = [];
  if (marginTop) {
    otherStyles.push({ marginTop: heightToDp(marginTop) });
  }
  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={[styles.inputLabel]}>{label}</Text>
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
