import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import fonts from 'assets/fonts';
import colors from 'assets/colors';

import { YourHealth } from 'assets/svgs/index';

export default function YourHealthBtn() {
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <TouchableOpacity>
        <View style={styles.circleBtn}>
          <YourHealth />
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
          Your Health
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circleBtn: {
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
