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
  const [fromfpg, setFromfpg] = useState<string>('');
  const [tofpg, setTofpg] = useState<string>('');
  const [fromppg, setFromppg] = useState<string>('');
  const [toppg, setToppg] = useState<string>('');
  const [selectedType, setSelectedType] = useState<number>(0);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({
    fromfpg: '',
    tofpg: '',
    fromppg: '',
    toppg: '',
  });

  //Redux hooks
  const { units, latestBloodSugar } = useSelector((state: IAppState) => ({
    units: state.home.bloodSugarUnits,
    latestBloodSugar: state.home.latestBloodSugar,
  }));
  const dispatch = useDispatch();

  const unitsNames = useMemo<string[]>(
    () => units.map((unit) => unit.name),
    [units]
  );

  const onUnitChange = useCallback(
    (unit: string) => {
      const newIndex = units.findIndex((e) => e.name == unit);
      if (newIndex == selectedType) return;
      setSelectedType(newIndex);

      setFromfpg((prev) =>
        Number(mgMmolConversion(+prev, units[newIndex]?.name)).toFixed(2)
      );
      setTofpg((prev) =>
        Number(mgMmolConversion(+prev, units[newIndex]?.name)).toFixed(2)
      );
      setFromppg((prev) =>
        Number(mgMmolConversion(+prev, units[newIndex]?.name)).toFixed(2)
      );
      setToppg((prev) =>
        Number(mgMmolConversion(+prev, units[newIndex]?.name)).toFixed(2)
      );
    },
    [units, selectedType]
  );

  const onSubmit = async () => {
    setLoading(true);
    if (!fromfpg || !tofpg || !fromppg || !toppg) {
      showMessage({
        message: 'Please fill all fields!',
        type: 'danger',
      });
      return;
    }
    const result = await userService.createNewTarget({
      range_type: 1,
      value_from: fromfpg,
      value_to: tofpg,
      unit_list_id: units[selectedType]?.id,
      ppg_value_from: fromppg,
      ppg_value_to: toppg,
      ppg_unit_id: units[selectedType]?.id,
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
    if (units[selectedType]) {
      setErrors(
        bloodSugarValidator(
          {
            fromfpg: +fromfpg,
            tofpg: +tofpg,
            fromppg: +fromppg,
            toppg: +toppg,
          },
          units[selectedType]?.name
        )
      );
    }
  }, [fromfpg, tofpg, fromppg, toppg, selectedType, units]);

  useEffect(() => {
    setFromfpg(String(latestBloodSugar?.value_from));
    setTofpg(String(latestBloodSugar?.value_to));
    setFromppg(String(latestBloodSugar?.ppg_value_from));
    setToppg(String(latestBloodSugar?.ppg_value_to));
    setSelectedType(
      units.findIndex((e) => e.name == latestBloodSugar?.unit_name)
    );
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
            value={fromfpg}
            onChangeText={setFromfpg}
            onUnitChange={onUnitChange}
            units={unitsNames}
            unit={unitsNames[selectedType]}
            error={errors.fromfpg}
          />
          <InputWithUnits
            small
            title="To"
            placeholder={'0'}
            value={tofpg}
            onChangeText={setTofpg}
            onUnitChange={onUnitChange}
            units={unitsNames}
            unit={unitsNames[selectedType]}
            error={errors.tofpg}
          />
          <Text style={styles.secondHeading}>After Meal (PPG)</Text>
          <InputWithUnits
            small
            title="From"
            placeholder={'0'}
            onChangeText={setFromppg}
            value={fromppg}
            onUnitChange={onUnitChange}
            units={unitsNames}
            error={errors.fromppg}
            unit={unitsNames[selectedType]}
          />
          <InputWithUnits
            small
            title="To"
            placeholder={'0'}
            onChangeText={setToppg}
            value={toppg}
            onUnitChange={onUnitChange}
            units={unitsNames}
            error={errors.toppg}
            unit={unitsNames[selectedType]}
          />
          <GradientButton
            text="Save"
            onPress={onSubmit}
            color={['#2C6CFC', '#2CBDFC']}
            style={styles.buttonContainer}
            disabled={
              !fromfpg ||
              !tofpg ||
              !fromppg ||
              !toppg ||
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
