import React from 'react';
import { StyleSheet, View } from 'react-native';

import { TextInput } from 'react-native-paper';

import colors from 'assets/colors';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import fonts from 'assets/fonts';

type Props = {
  margin?: any;
  svg?: any;
  placeholder: string;
  value: string;
  secureTextEntry?: boolean;
  onChange: any;
  onBlur?: any;
  onEyePress?: any;
  eye?: any;
  keyboardType?: string;
  defaultValue?: string;
};

export default function (props: Props) {
  return (
    <View style={[styles.container, { marginHorizontal: props.margin }]}>
      <TextInput
        placeholder={props?.placeholder}
        value={props?.value}
        defaultValue={props?.defaultValue}
        activeUnderlineColor={'transparent'}
        selectionColor={colors.heading}
        caretHidden={false}
        underlineColor={'#FFFFFF'}
        placeholderTextColor={'#8493AE'}
        onChangeText={props?.onChange}
        secureTextEntry={props?.secureTextEntry}
        style={styles.textInput}
        keyboardShouldPersistTaps={'handled'}
        autoCapitalize="none"
        keyboardType={props?.keyboardType}
        autoCorrect={false}
        right={
          props?.eye && (
            <TextInput.Icon
              name={props?.eye}
              onPress={props?.onEyePress}
              style={{ zIndex: 10 }}
              color={colors.heading}
            />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  textInput: {
    backgroundColor: colors.inputBg,
    fontSize: responsiveFontSize(18),
    height: 45,
    borderRadius: 5,
    fontFamily: fonts.mulishRegular,
  },
});
