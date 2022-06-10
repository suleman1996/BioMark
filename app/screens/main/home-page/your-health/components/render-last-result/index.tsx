import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import makeStyles from './styles';

const RenderLastResult = ({ title, date, svg, onPress }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.recordKeepingView, { backgroundColor: colors.white }]}
    >
      {svg}
      <Text
        style={[
          styles.recordKeepinText,
          { marginTop: 10, color: colors.heading, fontWeight: 'bold' },
        ]}
      >
        {title}
      </Text>
      <Text style={[styles.date]}>Receive on {date}</Text>
    </TouchableOpacity>
  );
};
export default RenderLastResult;
