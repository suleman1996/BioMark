import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BarIndicator
} from 'react-native-indicators';
import colors from '../../assets/colors/colors';
import { heightToDp, widthToDp } from '../../utils/functions/responsiveDimentions';
import { GlobalColors } from '../../utils/theme/globalColors';

export default function SelectedButton({}) {

  return (
    <View style={styles.view}></View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: widthToDp(30),
    height: heightToDp(7),
    backgroundColor: GlobalColors.darkPrimary,
  },
});
