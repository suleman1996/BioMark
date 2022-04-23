import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import colors from '../../assets/colors/colors';

type Props = {
  marginHorizontal?: number;
  marginVertical?: number;
  disabled?: boolean;
  onPress: any;
  title?: string;
};

export default function button(props: Props) {
  const horizontal = props.marginHorizontal ? props.marginHorizontal : 20;
  const vertical = props.marginVertical ? props.marginVertical : 20;
  return (
    <View
      style={[
        styles.btnContainer,
        {marginHorizontal: horizontal, marginVertical: vertical},
      ]}>
      <Button
        mode="contained"
        uppercase={false}
        disabled={props.disabled}
        contentStyle={{height: 50}}
        labelStyle={{color: colors.whiteColor}}
        style={[
          styles.btn,
          {backgroundColor: props?.disabled ? '#8493AE60' : colors.blue},
        ]}
        onPress={props.onPress}>
        {props.title}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {},
  btn: {
    borderRadius: 8,
  },
});
