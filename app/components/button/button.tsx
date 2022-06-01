import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { Button as PaperButton } from 'react-native-paper';

// import colors from 'assets/colors';

type Props = {
  marginHorizontal?: number;
  marginVertical?: number;
  disabled?: boolean;
  onPress: any;
  title?: string;
  svg: any;
};

export default function Button(props: Props) {
  const { colors } = useTheme();

  const horizontal = props.marginHorizontal ? props.marginHorizontal : 20;
  const vertical = props.marginVertical ? props.marginVertical : 20;

  return (
    <View
      style={[
        styles.btnContainer,
        { marginHorizontal: horizontal, marginVertical: vertical },
      ]}
    >
      <TouchableOpacity>
        <PaperButton
          icon={() => (props?.svg ? props.svg : null)}
          mode="contained"
          uppercase={false}
          disabled={props.disabled}
          contentStyle={{ height: 50 }}
          style={[
            styles.btn,
            {
              backgroundColor: props?.disabled ? colors.disable : colors.blue,
            },
          ]}
          labelStyle={{ color: colors.white }}
          onPress={props.onPress}
        >
          {props.title}
        </PaperButton>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {},
  btn: {
    borderRadius: 8,
  },
});
