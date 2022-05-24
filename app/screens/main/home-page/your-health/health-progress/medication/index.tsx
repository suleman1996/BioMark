import { View, Text } from 'react-native';
import React from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';

const Index = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  return (
    <View style={styles.container}>
      <Text>Medication</Text>
    </View>
  );
};

export default Index;
