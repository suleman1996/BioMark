import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import colors from '../../assets/colors';

type Props = {
  disabled?: boolean;
  onPress: any;
  title: string;
};

export default function button(props: Props) {
  return (
    <View style={styles.btnContainer}>
      <Button
        mode="contained"
        uppercase={false}
        disabled={props.disabled}
        contentStyle={{height: 45, width: '100%'}}
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
  btnContainer: {
    // zIndex: 999,
    // position: 'absolute',
  },
  btn: {
    borderRadius: 8,
  },
});
