import React from 'react';
import { View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

import makeStyles from './styles';

type Props = {
  margin?: any;
  svg?: any;
  placeholder?: string;
  value: any;
  secureTextEntry?: boolean;
  onChange: any;
  onBlur?: any;
  onEyePress?: any;
  eye?: any;
  keyboardType?: any;
  defaultValue?: string;
  containerStyle?: any;
};

export default function (props: Props) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View
      style={[
        styles.container,
        props.containerStyle,
        { marginHorizontal: props.margin },
      ]}
    >
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
        onBlur={props?.onBlur}
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
