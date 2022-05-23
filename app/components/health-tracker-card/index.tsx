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
  console.log('item', item.item.title);

  return (
    <TouchableOpacity
      onPress={() => {
        if (item?.item?.title === 'Blood Sugar') {
          navigation.navigate(SCREENS.BLOOD_SUGAR);
        } else if (item?.item?.title === 'Blood Pressure') {
          navigation.navigate(SCREENS.BLOOD_PRESSURE);
        } else if (item?.item?.title === 'Weight') {
          navigation.navigate(SCREENS.WEIGHT);
        } else if (item?.item?.title === 'HbA1c') {
          navigation.navigate(SCREENS.HBA1C);
        } else if (item?.item?.title === 'Medication') {
          navigation.navigate(SCREENS.MEDICATION);
        } else {
          alert('Under Development');
        }
      }}
      style={[styles.renderHealthView, { borderColor: item?.item?.color }]}
    >
      <Text style={[styles.healthTrackerHeading]}>{item?.item?.title}</Text>
      <Text
        style={[
          styles.healthTrackerHeading,
          { marginVertical: 5, fontSize: 16, color: item?.item?.color },
        ]}
      >
        {item?.item?.value}
      </Text>
      <Text style={[styles.healthTrackerHeading, { color: colors.lightGrey }]}>
        {item?.item?.subTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default RenderHealthTrack;
