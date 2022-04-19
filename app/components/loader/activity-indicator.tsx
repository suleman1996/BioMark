import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BarIndicator
} from 'react-native-indicators';
import colors from '../../assets/colors/colors';

export default function ActivityIndicator({visible = false}) {
  if (!visible) return null;
  return (
    <View style={styles.overLay}>
      <BarIndicator color={colors.blue} size={40} />
    </View>
  );
}

const styles = StyleSheet.create({
  overLay: {
    position: 'absolute',
    backgroundColor: '#ffffff90',
    height: '100%',
    width: '100%',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    // opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
});
