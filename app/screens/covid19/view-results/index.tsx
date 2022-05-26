import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';

type Props = {};

const ViewCovidResults = (props: Props) => {
  const {} = props;
  const { colors }: any = useTheme();
  const styles = makeStyles(colors);

  const singleFlatListItem = () => {
    return (
      <View style={styles.parent}>
        <View style={styles.header}>
          <Text style={styles.whoText}>You</Text>
          <Text style={styles.header2}>
            Booking ID - <Text style={styles.testCodeText}>CVD-HSVGRP</Text>
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.testType} numberOfLines={3}>
            COVID-19 RT-PCR (Urgent)
          </Text>
          <View style={styles.testResult}>
            <Text style={styles.testResultText}>DETECTED</Text>
          </View>
        </View>
        <Text style={styles.dateText}>06/02/2022</Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList data={[1, 2, 3, 4, 5]} renderItem={singleFlatListItem} />
      </View>
    </>
  );
};

export default ViewCovidResults;
