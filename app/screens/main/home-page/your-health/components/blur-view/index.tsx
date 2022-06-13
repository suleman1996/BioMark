import { View } from 'react-native';
import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import makeStyles from './styles';

const BlurView = ({ title }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.blurView}>
      <Text style={styles.highlightstext}>{title}</Text>
    </View>
  );
};
export default BlurView;
