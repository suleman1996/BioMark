import React from 'react';
import { Text, View } from 'react-native';

import { RadioButton } from 'react-native-paper';

import { GlobalColors } from 'utils/theme/global-colors';

import { styles } from './styles';

type Props = {
  question: string;
  isTrue: any;
  setIsTrue: any;
  options: any;
};

const GeneralRadioQuestions = ({
  question,
  isTrue,
  setIsTrue,
  options,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.qText}>{question}</Text>
      <View style={styles.radioContainer}>
        {options?.map((item: any, index: number) => (
          <View key={index} style={styles.singleRadioContainer}>
            <RadioButton
              value="second"
              status={isTrue == item ? 'checked' : 'unchecked'}
              onPress={() => setIsTrue(item)}
              color={GlobalColors.darkPrimary}
            />
            <Text style={styles.radioLabel}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default GeneralRadioQuestions;
