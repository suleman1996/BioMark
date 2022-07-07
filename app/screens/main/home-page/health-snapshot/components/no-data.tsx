import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoData = () => {
  return (
    <View style={styles.noDataContainer}>
      <Text style={styles.noData}>No Data Found</Text>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  noDataContainer: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
  },
  noData: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#8493AE',
  },
});
