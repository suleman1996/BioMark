import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { RadioButton } from 'react-native-paper';

import makeStyles from './styles';

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
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.container}>
      {question ? <Text style={styles.qText}>{question}</Text> : null}
      <View style={styles.radioContainer}>
        {options?.map((item: any, index: number) => (
          <View key={index + item} style={styles.singleRadioContainer}>
            <RadioButton
              value="second"
              status={isTrue == item ? 'checked' : 'unchecked'}
              onPress={() => setIsTrue(item)}
              color={colors.darkPrimary}
            />
            <Text style={styles.radioLabel}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default GeneralRadioQuestions;
