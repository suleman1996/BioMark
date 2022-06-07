import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';

type Props = {
  heading?: string;
  value?: any;
  text?: string;
  borderColor?: string;
  color?: string;
  onPressBloodPressure?: any;
  onPressMedication?: any;
  onPressWeight?: any;
};

const BloodPressure = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <TouchableOpacity
      onPress={props?.onPressBloodPressure}
      style={[
        styles.renderHealthView,
        { borderColor: props.borderColor, borderWidth: 1 },
      ]}
    >
      <Text style={[styles.healthTrackerHeading]}>{props?.heading}</Text>
      <Text style={[styles.healthTrackerSubHeading, { color: props?.color }]}>
        {props?.value}
      </Text>
      <Text
        style={[styles.healthTrackerValueText, { color: colors.lightGrey }]}
      >
        {props?.text}
      </Text>
    </TouchableOpacity>
  );
};
const Medication = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <TouchableOpacity
      onPress={props?.onPressMedication}
      style={[
        styles.renderHealthView,
        { borderColor: props.borderColor, borderWidth: 1 },
      ]}
    >
      <Text style={[styles.healthTrackerHeading]}>{props?.heading}</Text>
      <Text style={[styles.healthTrackerSubHeading, { color: props?.color }]}>
        {props?.value}
      </Text>
      <Text
        style={[styles.healthTrackerValueText, { color: colors.lightGrey }]}
      >
        {props?.text}
      </Text>
    </TouchableOpacity>
  );
};
const Weight = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <TouchableOpacity
      onPress={props?.onPressWeight}
      style={[
        styles.renderHealthView,
        { borderColor: props.borderColor, borderWidth: 1 },
      ]}
    >
      <Text style={[styles.healthTrackerHeading]}>{props?.heading}</Text>
      <Text style={[styles.healthTrackerSubHeading, { color: props?.color }]}>
        {props?.value}
      </Text>
      <Text
        style={[styles.healthTrackerValueText, { color: colors.lightGrey }]}
      >
        {props?.text}
      </Text>
    </TouchableOpacity>
  );
};
export { BloodPressure, Medication, Weight };
