/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { Tip } from 'react-native-tip';
import Info from 'react-native-vector-icons/AntDesign';
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
import SCREENS from 'navigation/constants';

import Styles from './styles';
import { useTranslation } from 'react-i18next';

const Index = ({ route }) => {
  const { t } = useTranslation();
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
      if (route?.params?.fromEmptyValue) {
        navigation.navigate(SCREENS.BLOOD_SUGAR);
      } else {
        navigation.goBack();
      }

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
            {t('pages.bloodSugarTargetInput.title')}
          </Text>
          <Text style={styles.subHeading}>
            {t('pages.bloodSugarTargetInput.subtitle')}
          </Text>
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={styles.secondHeading}>
              {t('pages.bloodSugarTargetInput.fasting')}
            </Text>
            <Tip
              //title=""
              body={t('pages.bloodSugarTargetInput.fastingDefinition')}
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
          </View> */}
          <InputWithUnits
            small
            title={t('pages.bloodSugarTargetInput.from')}
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
            title={t('pages.bloodSugarTargetInput.to')}
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
            <Text style={styles.secondHeading}>
              {t('pages.bloodSugarTargetInput.afterMeal')}
            </Text>
            <Tip
              //title=""
              body={t('pages.bloodSugarTargetInput.afterMealDefinition')}
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
              <Info name="infocirlceo" size={18} color={colors.blue} />
            </Tip>
          </View>
          <InputWithUnits
            small
            title={t('pages.bloodSugarTargetInput.from')}
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
            title={t('pages.bloodSugarTargetInput.to')}
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
          text={t('pages.bloodSugarTargetInput.save')}
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
