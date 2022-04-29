import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import TextInput from 'components/input-field/text-input';

type Props = {
  label: string;
  placeholder: string;
  isSecure: boolean;
  password: string;
  setHidePassword: any;
  hidePassword: boolean;
  onChange: any;
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
      <Text style={[styles.inputLabel]}>{label}</Text>
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
  inputLabel: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
  },
});
