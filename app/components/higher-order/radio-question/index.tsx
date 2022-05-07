import { Text, View } from 'react-native';
import React from 'react';
import { RadioButton } from 'react-native-paper';

import { GlobalColors } from 'utils/theme/global-colors';
import { styles } from './styles';

type Props = {
  question: string;
  isTrue: boolean;
  setIsTrue: any;
};

const RadioButtonQuestionComponent = ({
  question,
  isTrue,
  setIsTrue,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.qText}>{question}</Text>
      <View style={styles.radioContainer}>
        <View style={styles.singleRadioContainer}>
          <RadioButton
            value="second"
            status={!isTrue ? 'checked' : 'unchecked'}
            onPress={() => setIsTrue(false)}
            color={GlobalColors.darkPrimary}
          />
          <Text style={styles.radioLabel}>No</Text>
        </View>
        <View style={styles.singleRadioContainer}>
          <RadioButton
            value="first"
            status={isTrue ? 'checked' : 'unchecked'}
            onPress={() => setIsTrue(true)}
            color={GlobalColors.darkPrimary}
          />
          <Text style={styles.radioLabel}>Yes</Text>
        </View>
      </View>
    </View>
  );
};

export default RadioButtonQuestionComponent;
