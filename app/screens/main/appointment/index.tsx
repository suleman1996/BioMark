import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

type Props = {};

const AppointmentScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon</Text>
    </View>
  );
};

export default AppointmentScreen;
