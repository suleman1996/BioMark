import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BarIndicator } from 'react-native-indicators';

import colors from 'assets/colors';

export default function ActivityIndicator({ visible = false }) {
  if (!visible) {
    return null;
  }

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
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
});
