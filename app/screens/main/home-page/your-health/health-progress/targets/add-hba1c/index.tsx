/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import { ActivityIndicator, InputWithUnits } from 'components';
import GradientButton from 'components/linear-gradient-button';

import { userService } from 'services/user-service/user-service';
import { TargetUnit } from 'types/api';

import {
  getHBA1CTargetsAction,
  getLatestTargetsAction,
} from 'store/home/home-actions';
import { IAppState } from 'store/IAppState';

import { hba1cValidator } from 'utils/functions/measurments';

import Styles from './styles';
import { useTranslation } from 'react-i18next';

const units: TargetUnit[] = [{ id: 3, name: '%' }];

const Index = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = Styles(colors);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { latestHba1c } = useSelector((state: IAppState) => ({
    latestHba1c: state.home.latestHba1c,
  }));

  const [goalValue, setGoalValue] = useState('6');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<number>(0);
  const [errors, setErrors] = useState({
    goal: '',
  });

  const unitsNames = units.map((unit) => unit.name);

  const onUnitChange = useCallback(
    (unit: string) => {
      const newIndex = units.findIndex((e) => e.name == unit);
      if (newIndex == selectedType) return;
      setSelectedType(newIndex);
    },
    [selectedType]
  );

  const onSubmit = async () => {
    setLoading(true);
    if (!goalValue) {
      showMessage({
        message: 'Please fill all fields!',
        type: 'danger',
      });
      return;
    }
    const result = await userService.createNewTarget({
      range_type: 3,
      goal_value: goalValue,
      unit_list_id: 3,
    });
    setLoading(false);
    if (result) {
      dispatch(getLatestTargetsAction());
      dispatch(getHBA1CTargetsAction());
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
    setErrors({ goal: hba1cValidator(+goalValue, units[selectedType].name) });
  }, [goalValue, selectedType]);

  useEffect(() => {
    if (!latestHba1c?.goal_value) return;
    setGoalValue(Number(latestHba1c?.goal_value).toFixed(1));
  }, [latestHba1c]);

  return (
    <TitleWithBackWhiteBgLayout>
      <ActivityIndicator visible={loading} />

      <ScrollView style={styles.innerContainer}>
        <Text style={styles.firstHeading}>
          {t('pages.hba1cTargetInput.title')}
        </Text>
        <Text style={styles.subHeading}>
          {t('pages.hba1cTargetInput.subtitle')}
        </Text>
        <InputWithUnits
          small
          title={t('pages.hba1cTargetInput.goal')}
          placeholder={'0.0'}
          onChangeText={setGoalValue}
          value={goalValue}
          unit={unitsNames[selectedType]}
          units={unitsNames}
          onUnitChange={onUnitChange}
          error={errors.goal}
          textAlign={'left'}
          labelStyle={styles.inputLabelStyle}
        />
      </ScrollView>
      <GradientButton
        onPress={onSubmit}
        text={t('pages.bloodSugarTargetInput.save')}
        color={['#2C6CFC', '#2CBDFC']}
        disabled={!goalValue || errors.goal}
        style={styles.buttonContainer}
      />
    </TitleWithBackWhiteBgLayout>
  );
};

export default Index;
