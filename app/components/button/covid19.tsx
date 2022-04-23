import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Covid19 from '../../assets/svgs/covid-19';
import fonts from '../../assets/fonts';
import { Button } from 'react-native-paper';
import colors from '../../assets/colors';
// import styles from 'react-native-indicators/src/components/ball-indicator/styles';

type Props = {
  text: string;
  onPress: any;
};

export default function Covid19Btn({ text, onPress }: Props) {
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <TouchableOpacity>
        <View style={styles.circleBtn}>
          <Covid19 />
        </View>
      </TouchableOpacity>
      <View>
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: 15,
            color: colors.heading,
          }}
        >
          COVID-19
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
