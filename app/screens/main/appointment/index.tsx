import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import makeStyles from './styles';

const AppointmentScreen = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon</Text>
    </View>
  );
};

export default AppointmentScreen;
