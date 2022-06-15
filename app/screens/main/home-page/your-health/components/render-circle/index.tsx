import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import makeStyles from './styles';

const RenderCircle = ({ svg, title, onPress, Image }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity style={styles.circle} onPress={onPress}>
        {svg ? svg : Image}
      </TouchableOpacity>
      <Text style={styles.circleText}>{title}</Text>
    </View>
  );
};
export default RenderCircle;
