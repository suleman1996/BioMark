import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import SCREENS from 'navigation/constants';

const RenderHealthTrack = ({ item }) => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(SCREENS.BLOOD_SUGAR)}
      style={[styles.renderHealthView, { borderColor: item.item.color }]}
    >
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
    </TouchableOpacity>
  );
};

export default RenderHealthTrack;
