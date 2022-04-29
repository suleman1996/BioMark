import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';

import colors from 'assets/colors';
import fonts from 'assets/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';

type Props = {
  margin?: any;
  svg: any;
  placeholder: string;
  value: string;
  secureTextEntry?: boolean;
  onChange: any;
  onBlur?: any;
  onEyePress?: any;
  eye?: any;
  onFocus?: any;
};

export default function InputField(props: Props) {
  return (
    <View
      style={[styles.loginInputContainer, { marginHorizontal: props.margin }]}
    >
      <View style={styles.inputRow}>
        {props.svg}
        <TextInput
          onFocus={props.onFocus}
          placeholder={props.placeholder}
          placeholderTextColor={colors.placeHolder}
          value={props.value}
          style={styles.textFieldStyle}
          secureTextEntry={props.secureTextEntry}
          onChangeText={props.onChange}
          onBlur={props.onBlur}
        />
        <TouchableOpacity onPress={props.onEyePress}>
          {props.eye}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginInputContainer: {
    backgroundColor: colors.inputBg,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  labelStyle: {
    color: 'rgba(41, 56, 89, 0.48)',
    marginHorizontal: 5,
    marginVertical: 3,
    fontSize: 15,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  textFieldStyle: {
    fontSize: responsiveFontSize(17),
    width: '100%',
    color: '#3D3D3D',
    fontFamily: fonts.regular,
  },
});
