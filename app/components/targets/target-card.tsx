import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import { useTheme } from 'react-native-paper';

import makeStyles from 'components/targets/styles';

interface Props {
  date: string;
  content: Content[];
  isLatest?: boolean;
}

interface Content {
  label: string;
  value: string | number;
}

export default function TargetCard({ date, content = [], isLatest }: Props) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View
      style={[
        styles.outerTarget,
        isLatest ? {} : { backgroundColor: colors.targetCardsDull },
      ]}
    >
      <View style={styles.targetsContainer}>
        <Text style={styles.targetText}>
          {moment(date).format('hh:mm a MMM DD, YYYY')}
        </Text>
      </View>
      {content.map((row, index) => (
        <View
          key={row.label + row.value}
          style={[
            styles.targetsContainer,
            index == content.length - 1 ? { borderBottomWidth: 0 } : {},
          ]}
        >
          <Text style={styles.targetLabel}>{row.label} </Text>
          <Text style={styles.targetText}>{row.value}</Text>
        </View>
      ))}
    </View>
  );
}
