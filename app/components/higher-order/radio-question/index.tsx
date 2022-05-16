import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { RadioButton } from 'react-native-paper';

import makeStyles from './styles';

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
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.container}>
      <Text style={styles.qText}>{question}</Text>
      <View style={styles.radioContainer}>
        <View style={styles.singleRadioContainer}>
          <RadioButton
            value="second"
            status={!isTrue ? 'checked' : 'unchecked'}
            onPress={() => setIsTrue(false)}
            color={colors.darkPrimary}
          />
          <Text style={styles.radioLabel}>No</Text>
        </View>
        <View style={styles.singleRadioContainer}>
          <RadioButton
            value="first"
            status={isTrue ? 'checked' : 'unchecked'}
            onPress={() => setIsTrue(true)}
            color={colors.darkPrimary}
          />
          <Text style={styles.radioLabel}>Yes</Text>
        </View>
      </View>
    </View>
  );
};

export default RadioButtonQuestionComponent;
