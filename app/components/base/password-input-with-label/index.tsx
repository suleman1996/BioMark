import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InputField from '../../input-field/input-field'
import { responsiveFontSize } from '../../../utils/functions/responsiveText';
import { GlobalFonts } from '../../../utils/theme/fonts';
import { GlobalColors } from '../../../utils/theme/globalColors';
import { heightToDp } from '../../../utils/functions/responsiveDimentions';
import TextInput from '../../input-field/text-input'

type Props = {
  label: string;
  placeholder: string;
  isSecure: boolean;
  password: string;
  setHidePassword: any;
  hidePassword: boolean;
  onChange: any
};

const PasswordInputWithLabel = ({
  label,
  placeholder,
  isSecure,
  password,
  setHidePassword,
  hidePassword,
  onChange,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.inputLablel]}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={isSecure}
        eye={!isSecure ? 'eye-off' : 'eye'}
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

const styles = StyleSheet.create({
  container: {
    marginTop: heightToDp(2),
  },
  label: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
  },
  inputLablel: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
  },
});