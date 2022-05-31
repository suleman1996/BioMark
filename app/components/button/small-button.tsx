import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { Button } from 'react-native-paper';

type Props = {
  disabled?: boolean;
  onPress: any;
  title: string;
  style: number;
};

export default function SmallButton(props: Props) {
  const { colors } = useTheme();

  return (
    <View>
      <TouchableOpacity>
        <Button
          mode="contained"
          uppercase={false}
          disabled={props.disabled}
          contentStyle={[{ height: 35 }, props.style]}
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
