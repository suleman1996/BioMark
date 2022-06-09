import { Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { getReduxNewMedicationTracker } from 'store/home/home-actions';

const RenderHealthTrackDemo = ({ item }) => {
  const { colors } = useTheme();
  console.log('iii', item);

  const dispatch = useDispatch();
  const styles = Styles(colors);

  useEffect(() => {
    dispatch(getReduxNewMedicationTracker());
  }, [dispatch]);

  return (
    <TouchableOpacity
      disabled={true}
      style={[styles.renderHealthView, { borderColor: item?.color }]}
    >
      <Text style={[styles.healthTrackerHeading]}>{item?.title}</Text>
      <Text
        style={[
          styles.healthTrackerHeading,
          { marginVertical: 5, fontSize: 16, color: item?.item?.color },
        ]}
      >
        {item?.value}
      </Text>
      <Text style={[styles.healthTrackerHeading, { color: colors.lightGrey }]}>
        {item?.subTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default RenderHealthTrackDemo;
