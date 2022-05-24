/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text } from 'react-native';
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
  const [selectedType, setSelectedType] = useState(1);

  const onChangeText = (values) => {
    selectedType == '1' ? setValue(values.toString()) : setValue(values);
    // setValue(value);
  };

  return (
    <TitleWithBackWhiteBgLayout>
      <View style={styles.innerContainer}>
        <Text style={styles.firstHeading}>Set your new Hba1c goal</Text>
        <Text style={styles.subHeading}>
          Your doctor should help you set these ranges. if you leave these
          ranges blank we will use the default range of 6% as suggested by the
          ADA.
        </Text>
        <InputWithUnits
          height={6}
          label="Goal"
          placeholder={'0.0'}
          onChangeText={onChangeText}
          value={value}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          setValue={setValue}
          isFirst={true}
          op1="%"
        />
        <GradientButton
          text="Save"
          color={['#2C6CFC', '#2CBDFC']}
          style={styles.buttonContainer}
        />
      </View>
    </TitleWithBackWhiteBgLayout>
  );
};

export default Index;
