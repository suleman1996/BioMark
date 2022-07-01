import React from 'react';
import { Text } from 'react-native-paper';
import makeStyles from './styles';

const styles = makeStyles();

export const formatBarData = (
  data: { value: number | string; label: string }[]
) =>
  data.map((point) => ({
    value: point.value,
    label: point.label,
    frontColor: 'white',
    gradientColor: '#1B96D8',
    topLabelComponent: () => (
      <Text style={styles.barDataPoint}>{point.value}</Text>
    ),
  }));

export const formatPieData = (
  data: Array<{ percent: number }>,
  COLORS: Array<string>
): Array<{ value: number; color: string }> =>
  data.map((activity, index) => ({
    value: activity.percent,
    color: COLORS[index],
  }));
