import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';

import colors from 'assets/colors';

type Props = {
  disabled?: boolean;
  onPress: any;
  title: string;
};

export default function SmallButton(props: Props) {
  return (
    <View>
      <TouchableOpacity>
        <Button
          mode="contained"
          uppercase={false}
          disabled={props.disabled}
          contentStyle={{ height: 35 }}
          style={[
            styles.btn,
            { backgroundColor: props?.disabled ? colors.disable : colors.blue },
          ]}
          onPress={props.onPress}
        >
          {props.title}
        </Button>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 8,
  },
});
