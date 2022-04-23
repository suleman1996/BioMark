import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import colors from '../../assets/colors';

type Props = {
  title: string;
};

export default function Choicebtn(props: Props) {
  return (
    <View style={styles.btnContainer}>
      <Button
        // mode="contained"
        // disabled={props.disabled}
        color={colors.heading}
        uppercase={false}
        contentStyle={{ height: 40, width: 100 }}
        style={styles.btn}
        onPress={() => console.log('Pressed')}
      >
        {props.title}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 8,
    // borderWidth: 1,
    marginTop: 3,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 5,
  },
  btnContainer: {
    borderRadius: 3,
  },
});
