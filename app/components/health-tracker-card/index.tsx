import { Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import SCREENS from 'navigation/constants';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';
import { getReduxNewMedicationTracker } from 'store/home/home-actions';
import fonts from 'assets/fonts';

const RenderHealthTrack = ({ item }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const styles = Styles(colors);
  const navigation = useNavigation();
  const getMedNewTracker = useSelector(
    (state: IAppState) => state.home.getNewMedicationTracker
  );
  useEffect(() => {
    dispatch(getReduxNewMedicationTracker());
  }, [dispatch]);

  console.log(item);

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
          dispatch(getReduxNewMedicationTracker());
          if (getMedNewTracker?.medication) {
            navigation.navigate(SCREENS.MEDICATION);
          } else {
            navigation.navigate(SCREENS.ADD_NEW_MEDICATION);
          }
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
      <Text
        style={[
          styles.healthTrackerHeading,
          { color: colors.lightGrey, fontFamily: fonts.mulishRegular },
        ]}
      >
        {item?.item?.subTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default RenderHealthTrack;
