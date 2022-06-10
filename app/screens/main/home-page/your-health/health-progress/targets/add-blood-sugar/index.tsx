/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import { InputWithUnits, ActivityIndicator } from 'components';
import GradientButton from 'components/linear-gradient-button';

import { userService } from 'services/user-service/user-service';

import {
  bloodSugarValidator,
  mgMmolConversion,
} from 'utils/functions/measurments';

import {
  getBloodSugarTargetsAction,
  getLatestTargetsAction,
} from 'store/home/home-actions';
import { IAppState } from 'store/IAppState';

import Styles from './styles';

const Index = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = Styles(colors);

  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState({
    fromfpg: '',
    tofpg: '',
    fromppg: '',
    toppg: '',
    selectedType: 0,
  });

  const updateState = (name: string, value: string | number) =>
    setState((prev) => ({ ...prev, [name]: value }));

  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({
    fromfpg: '',
    tofpg: '',
    fromppg: '',
    toppg: '',
  });

  //Redux hooks
  const { units, latestBloodSugar } = useSelector((reduxState: IAppState) => ({
    units: reduxState.home.bloodSugarUnits,
    latestBloodSugar: reduxState.home.latestBloodSugar,
  }));
  const dispatch = useDispatch();

  const unitsNames = useMemo<string[]>(
    () => units.map((unit) => unit.name),
    [units]
  );

  const onUnitChange = useCallback(
    (unit: string) => {
      const newIndex = units.findIndex((e) => e.name == unit);
      if (newIndex == state.selectedType) return;
      setState({
        selectedType: newIndex,
        fromfpg: Number(
          mgMmolConversion(+state.fromfpg, units[newIndex]?.name)
        ).toFixed(2),
        fromppg: Number(
          mgMmolConversion(+state.fromppg, units[newIndex]?.name)
        ).toFixed(2),
        tofpg: Number(
          mgMmolConversion(+state.tofpg, units[newIndex]?.name)
        ).toFixed(2),
        toppg: Number(
          mgMmolConversion(+state.toppg, units[newIndex]?.name)
        ).toFixed(2),
      });
    },
    [units, state]
  );

  const onSubmit = async () => {
    setLoading(true);
    if (!state.fromfpg || !state.tofpg || !state.fromppg || !state.toppg) {
      showMessage({
        message: 'Please fill all fields!',
        type: 'danger',
      });
      return;
    }
    const result = await userService.createNewTarget({
      range_type: 1,
      value_from: state.fromfpg,
      value_to: state.tofpg,
      unit_list_id: units[state.selectedType]?.id,
      ppg_value_from: state.fromppg,
      ppg_value_to: state.toppg,
      ppg_unit_id: units[state.selectedType]?.id,
    });
    setLoading(false);
    if (result) {
      dispatch(getLatestTargetsAction());
      dispatch(getBloodSugarTargetsAction());
      showMessage({
        message: result,
        type: 'success',
      });
      navigation.goBack();
      return;
    }
    showMessage({
      message: 'Something went wrong',
      type: 'danger',
    });
  };

  useEffect(() => {
    const currentUnit = units[state.selectedType]?.name;
    if (currentUnit && (currentUnit == 'mg/dL' || currentUnit == 'mmol/L')) {
      setErrors({
        fromfpg: bloodSugarValidator(currentUnit, +state.fromfpg, 'target'),
        fromppg: bloodSugarValidator(currentUnit, +state.fromppg, 'target'),
        toppg:
          bloodSugarValidator(currentUnit, +state.toppg, 'target') ||
          +state.toppg < +state.fromppg
            ? 'Please enter a reading higher than From'
            : '',
        tofpg:
          bloodSugarValidator(currentUnit, +state.tofpg, 'target') ||
          +state.tofpg < +state.fromfpg
            ? 'Please enter a reading higher than From'
            : '',
      });
    }
  }, [state, units]);

  useEffect(() => {
    setState({
      selectedType: units.findIndex(
        (e) => e.name == latestBloodSugar?.unit_name
      ),
      fromfpg: String(latestBloodSugar?.value_from),
      fromppg: String(latestBloodSugar?.ppg_value_from),
      tofpg: String(latestBloodSugar?.value_to),
      toppg: String(latestBloodSugar?.ppg_value_to),
    });
  }, [latestBloodSugar, units]);

  return (
    <ScrollView>
      <ActivityIndicator visible={loading} />
      <TitleWithBackWhiteBgLayout>
        <View style={styles.innerContainer}>
          <Text style={styles.firstHeading}>
            Set your new target blood sugar ranges
          </Text>
          <Text style={styles.subHeading}>
            Your doctor should help you set these ranges. if you leave these
            ranges blank we will use the default range of 80-130 mg/dL for
            fasting and 80-180 mg/dL for after meals as suggested by the ADA.
          </Text>
          <Text style={styles.secondHeading}>Fasting (FPG)</Text>
          <InputWithUnits
            small
            title="From"
            placeholder={'0'}
            value={state.fromfpg}
            onChangeText={(value: string) => updateState('fromfpg', value)}
            onUnitChange={onUnitChange}
            units={unitsNames}
            unit={unitsNames[state.selectedType]}
            error={errors.fromfpg}
          />
          <InputWithUnits
            small
            title="To"
            placeholder={'0'}
            value={state.tofpg}
            onChangeText={(value: string) => updateState('tofpg', value)}
            onUnitChange={onUnitChange}
            units={unitsNames}
            unit={unitsNames[state.selectedType]}
            error={errors.tofpg}
          />
          <Text style={styles.secondHeading}>After Meal (PPG)</Text>
          <InputWithUnits
            small
            title="From"
            placeholder={'0'}
            value={state.fromppg}
            onChangeText={(value: string) => updateState('fromppg', value)}
            onUnitChange={onUnitChange}
            units={unitsNames}
            error={errors.fromppg}
            unit={unitsNames[state.selectedType]}
          />
          <InputWithUnits
            small
            title="To"
            placeholder={'0'}
            value={state.toppg}
            onChangeText={(value: string) => updateState('toppg', value)}
            onUnitChange={onUnitChange}
            units={unitsNames}
            error={errors.toppg}
            unit={unitsNames[state.selectedType]}
          />
          <GradientButton
            text="Save"
            onPress={onSubmit}
            color={['#2C6CFC', '#2CBDFC']}
            style={styles.buttonContainer}
            disabled={
              !state.fromfpg ||
              !state.tofpg ||
              !state.fromppg ||
              !state.toppg ||
              Object.keys(errors).filter((key: string) => errors[key]).length >
                0
            }
          />
        </View>
      </TitleWithBackWhiteBgLayout>
    </ScrollView>
  );
};

export default Index;
