import { StyleSheet, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';

import colors from 'assets/colors';

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
};

export default function (props: Props) {
  return (
    <View style={[styles.container, { marginHorizontal: props.margin }]}>
      <TextInput
        placeholder={props?.placeholder}
        value={props?.value}
        activeUnderlineColor={'transparent'}
        underlineColor={'FFFFFF'}
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
    fontSize: 14,
    height: 45,
    borderRadius: 8,
  },
});
