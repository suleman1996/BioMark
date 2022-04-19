import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import colors from '../../assets/colors/colors';

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
  Keyboardtype?: string
};


export default function textInput(props: Props) {
  const [text, setText] = React.useState('');
  return (
    <View style={[styles.container, {marginHorizontal: props.margin}]}>
      <TextInput
        // mode="outlined"
        // label={props.placeholder}
        placeholder={props?.placeholder}
        value={props?.value}
        activeUnderlineColor={colors?.blue}
        underlineColor={'FFFFFF'}
        placeholderTextColor={'#8493AE'}
        onChangeText={props?.onChange}
        secureTextEntry={props?.secureTextEntry}
        style={styles.textInput}
        keyboardShouldPersistTaps={'handled'}
        autoCapitalize="none"
        keyboardType={props?.Keyboardtype}
        autoCorrect={false}
        right={
          props?.eye && (
            <TextInput.Icon
              name={props?.eye}
              onPress={props?.onEyePress}
              style={{zIndex: 10}}
            />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderRadius: 10,
    overflow: 'hidden',
  },
  textInput: {
    backgroundColor: colors.inputBg,
    fontSize: 14,
    height: 45,
    borderRadius: 8,
  },
});
