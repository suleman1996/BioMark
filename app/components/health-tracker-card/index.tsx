import { View, Text } from 'react-native';
import React from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';

const RenderHealthTrack = ({ item }) => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  return (
    <View style={[styles.renderHealthView, { borderColor: item.item.color }]}>
      <Text style={[styles.healthTrackerHeading]}>{item.item.title}</Text>
      <Text
        style={[
          styles.healthTrackerHeading,
          { marginVertical: 5, fontSize: 16, color: item.item.color },
        ]}
      >
        {item.item.value}
      </Text>
      <Text style={[styles.healthTrackerHeading, { color: colors.lightGrey }]}>
        {item.item.subTitle}
      </Text>
    </View>
  );
};

export default RenderHealthTrack;
