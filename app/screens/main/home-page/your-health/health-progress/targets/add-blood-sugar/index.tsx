/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';

import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import InputWithUnits from 'components/higher-order/input-with-units';
import GradientButton from 'components/linear-gradient-button';

import Styles from './styles';
import { useTheme } from 'react-native-paper';

const Index = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  //   const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [selectedType, setSelectedType] = useState(2);

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
          />
          <GradientButton
            text="Save"
            color={['#2C6CFC', '#2CBDFC']}
            style={styles.buttonContainer}
          />
        </View>
      </TitleWithBackWhiteBgLayout>
    </ScrollView>
  );
};

export default Index;
