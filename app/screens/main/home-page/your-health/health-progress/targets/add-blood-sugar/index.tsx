/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { Tip } from 'react-native-tip';
import Icon from 'react-native-vector-icons/Ionicons';
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
    if (
      !latestBloodSugar?.unit_name &&
      !latestBloodSugar?.value_from &&
      !latestBloodSugar?.ppg_value_from &&
      !latestBloodSugar?.value_to &&
      !latestBloodSugar?.ppg_value_to
    )
      return;
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
    <View style={styles.container}>
      <ActivityIndicator visible={loading} />
      <TitleWithBackWhiteBgLayout>
        <ScrollView style={styles.innerContainer}>
          <Text style={styles.firstHeading}>
            Set your new target blood sugar ranges
          </Text>
          <Text style={styles.subHeading}>
            Your doctor should help you set these ranges. if you leave these
            ranges blank we will use the default range of 80-130 mg/dL for
            fasting and 80-180 mg/dL for after meals as suggested by the ADA.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={styles.secondHeading}>Fasting (FPG)</Text>
            <Tip
              //title=""
              body="FPG (Fasting Plasma Glucose) is the measure of your blood sugar level after fasting or not having anything to eat or drink for at least 8 hours. This test is usually done first thing in the morning, before breakfast."
              bodyStyle={{ color: '#fff' }}
              tipContainerStyle={{
                backgroundColor: colors.shineBlue,
                width: '60%',
              }}
              overlayOpacity={0.001}
              style={{
                marginTop: 12,
                marginLeft: 10,
              }}
            >
              <View style={{ height: 20, width: 20 }}>
                <Icon
                  name="ios-information-circle-outline"
                  size={18}
                  color={colors.blue}
                />
              </View>
            </Tip>
          </View>
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
            textAlign={'left'}
            labelStyle={styles.inputLabelStyle}
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
            textAlign={'left'}
            labelStyle={{ ...styles.inputLabelStyle, marginTop: 20 }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 30,
            }}
          >
            <Text style={styles.secondHeading}>After Meal (PPG)</Text>
            <Tip
              //title=""
              body="PPG (Postprandial Plasma Glucose) is the measure of your blood sugar level after a meal. Measuring PPG can keep track of blood sugar spikes, which can determine if your mealtime insulin is working."
              bodyStyle={{ color: '#fff' }}
              tipContainerStyle={{
                backgroundColor: colors.shineBlue,
                width: '60%',
              }}
              overlayOpacity={0.001}
              style={{
                marginTop: 12,
                marginLeft: 10,
              }}
            >
              <View style={{ height: 20, width: 20 }}>
                <Icon
                  name="ios-information-circle-outline"
                  size={18}
                  color={colors.blue}
                />
              </View>
            </Tip>
          </View>
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
            textAlign={'left'}
            labelStyle={styles.inputLabelStyle}
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
            textAlign={'left'}
            labelStyle={{ ...styles.inputLabelStyle, marginTop: 20 }}
          />
        </ScrollView>
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
            Object.keys(errors).filter((key: string) => errors[key]).length > 0
          }
        />
      </TitleWithBackWhiteBgLayout>
    </View>
  );
};

export default Index;
