/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
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
  const [value, setValue] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');
  const [selectedType, setSelectedType] = useState<number>(0);
  const [errors, setErrors] = useState({
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

  const onUnitChange = useCallback(
    (unit: string) => {
      const newIndex = units.findIndex((e) => e.name == unit);
      if (newIndex == selectedType) return;
      setSelectedType(newIndex);

      setValue((prev) =>
        Number(mgMmolConversion(+prev, units[newIndex]?.name)).toFixed(2)
      );
      setValue2((prev) =>
        Number(mgMmolConversion(+prev, units[newIndex]?.name)).toFixed(2)
      );
      setValue3((prev) =>
        Number(mgMmolConversion(+prev, units[newIndex]?.name)).toFixed(2)
      );
      setValue4((prev) =>
        Number(mgMmolConversion(+prev, units[newIndex]?.name)).toFixed(2)
      );
    },
    [units, selectedType]
  );

  const onSubmit = async () => {
    setLoading(true);
    if (!value || !value2 || !value3 || !value4) {
      showMessage({
        message: 'Please fill all fields!',
        type: 'danger',
      });
      return;
    }
    const result = await userService.createNewTarget({
      range_type: 1,
      value_from: value,
      value_to: value2,
      unit_list_id: units[selectedType]?.id,
      ppg_value_from: value3,
      ppg_value_to: value4,
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
            fromfpg: +value,
            tofpg: +value2,
            fromppg: +value3,
            toppg: +value4,
          },
          units[selectedType]?.name
        )
      );
    }
  }, [value, value2, value3, value4, selectedType, units]);

  useEffect(() => {
    setValue(String(latestBloodSugar?.value_from));
    setValue2(String(latestBloodSugar?.value_to));
    setValue3(String(latestBloodSugar?.ppg_value_from));
    setValue4(String(latestBloodSugar?.ppg_value_to));
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
            value={value}
            onChangeText={setValue}
            onUnitChange={onUnitChange}
            units={units.map((unit) => unit.name)}
            unit={units[selectedType]?.name}
            error={errors.fromfpg}
          />
          <InputWithUnits
            small
            title="To"
            placeholder={'0'}
            value={value2}
            onChangeText={setValue2}
            onUnitChange={onUnitChange}
            units={units.map((unit) => unit.name)}
            unit={units[selectedType]?.name}
            error={errors.tofpg}
          />
          <Text style={styles.secondHeading}>After Meal (PPG)</Text>
          <InputWithUnits
            small
            title="From"
            placeholder={'0'}
            onChangeText={setValue3}
            value={value3}
            onUnitChange={onUnitChange}
            units={units.map((unit) => unit.name)}
            error={errors.fromppg}
            unit={units[selectedType]?.name}
          />
          <InputWithUnits
            small
            title="To"
            placeholder={'0'}
            onChangeText={setValue4}
            value={value4}
            onUnitChange={onUnitChange}
            units={units.map((unit) => unit.name)}
            error={errors.toppg}
            unit={units[selectedType]?.name}
          />
          <GradientButton
            text="Save"
            onPress={onSubmit}
            color={['#2C6CFC', '#2CBDFC']}
            style={styles.buttonContainer}
            disabled={
              !value ||
              !value2 ||
              !value3 ||
              !value4 ||
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
