/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';

import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import InputWithUnits from 'components/higher-order/input-with-units';
import GradientButton from 'components/linear-gradient-button';

import { userService } from 'services/user-service/user-service';

import Styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';
import { getNewTargetAction } from 'store/home/home-actions';

const Index = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = Styles(colors);
  const [value, setValue] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');
  const [selectedType, setSelectedType] = useState<number>(2);

  const units = useSelector((state: IAppState) => state.home.bloodSugarUnits);
  const dispatch = useDispatch();

  const toText = (values) => {
    selectedType == '1' ? setValue(values.toString()) : setValue(values);
    // setValue(value);
  };

  const fromText = (values) => {
    selectedType == '1' ? setValue2(values.toString()) : setValue2(values);
    // setValue(value);
  };
  const secondToText = (values) => {
    selectedType == '1' ? setValue2(values.toString()) : setValue3(values);
    // setValue(value);
  };
  const secondFromText = (values) => {
    selectedType == '1' ? setValue2(values.toString()) : setValue4(values);
    // setValue(value);
  };

  const onSubmit = async () => {
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
      unit_list_id: units[selectedType].id,
      ppg_value_from: value3,
      ppg_value_to: value4,
      ppg_unit_id: units[selectedType].id,
    });
    if (result) {
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
    dispatch(getNewTargetAction());
  }, [dispatch]);

  return (
    <ScrollView>
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
            height={6}
            label="From"
            placeholder={'0'}
            onChangeText={toText}
            value={value}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setValue={setValue}
            isSecond={true}
            units={units}
          />

          <InputWithUnits
            height={6}
            label="To"
            placeholder={'0'}
            onChangeText={fromText}
            value={value2}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setValue={setValue2}
            isSecond={true}
            units={units}
          />
          <Text style={styles.secondHeading}>After Meal (PPG)</Text>

          <InputWithUnits
            height={6}
            label="From"
            placeholder={'0'}
            onChangeText={secondToText}
            value={value3}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setValue={setValue3}
            isSecond={true}
            units={units}
          />

          <InputWithUnits
            height={6}
            label="To"
            placeholder={'0'}
            onChangeText={secondFromText}
            value={value4}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setValue={setValue4}
            isSecond={true}
            units={units}
          />
          <GradientButton
            text="Save"
            onPress={onSubmit}
            color={['#2C6CFC', '#2CBDFC']}
            style={styles.buttonContainer}
            disabled={!value || !value2 || !value3 || !value4}
          />
        </View>
      </TitleWithBackWhiteBgLayout>
    </ScrollView>
  );
};

export default Index;
