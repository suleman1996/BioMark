import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import fonts from '../../assets/fonts';
import colors from '../../assets/colors';
import YourHealth from '../../assets/svgs/your-health';
import {Button} from 'react-native-paper';
// import styles from 'react-native-indicators/src/components/ball-indicator/styles';

type Props = {
  text: string;
  onPress: any;
};

export default function YourHealthBtn({text, onPress}: Props) {
  return (
    <View style={{flexDirection: 'column', alignItems: 'center'}}>
      <TouchableOpacity>
        <View style={styles.circleBtn}>
          <YourHealth />
        </View>
      </TouchableOpacity>
      <View>
        <Text
          style={{fontFamily: fonts.bold, fontSize: 15, color: colors.heading}}>
          Your Health
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circleBtn: {
    // borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 300,
    paddingHorizontal: 15,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 10,
    marginBottom: 5,
  },
});
