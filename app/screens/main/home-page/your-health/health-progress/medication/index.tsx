/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import { userService } from 'services/user-service/user-service';

import GraphHeader from 'components/graph-header/index';

import MedicationLogsCard from './medication-logs-card';

const Index = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  const navigation = useNavigation();

  // Medications List from API
  const [medicationLogs, setMedicationLogs] = useState<any[]>({
    selected: false,
    has_medication: true,
    date: moment().format('MMM D, YYYY'),
    logs: [],
  });
  const [selectedValue, setSelectedValue] = React.useState({
    id: 3,
    title: moment().format('DD'),
    complete: moment().format('MMM D, YYYY'),
  });
  const [headerValue, setHeaderValue] = React.useState<any>([]);

  // Component Did Mount
  useEffect(() => {
    updateDateTabs();
    getMedicationsList();
  }, [selectedValue]);

  // Get Medications List from API Call
  const getMedicationsList = async () => {
    try {
      const medicineLogs: any = await userService.getMedicationTrackers(
        selectedValue.complete
      );
      setMedicationLogs({
        ...medicineLogs,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateDateTabs = () => {
    const date = selectedValue.complete;
    setHeaderValue([
      {
        id: 0,
        title: getFormattedDays(date, -3),
        complete: getFormattedDate(date, -3),
      },
      {
        id: 1,
        title: getFormattedDays(date, -2),
        complete: getFormattedDate(date, -2),
      },
      {
        id: 2,
        title: getFormattedDays(date, -1),
        complete: getFormattedDate(date, -1),
      },
      {
        id: 3,
        title: getFormattedDays(date, 0),
        complete: getFormattedDate(date, 0),
      },
      {
        id: 4,
        title: getFormattedDays(date, 1),
        complete: getFormattedDate(date, 1),
      },
      {
        id: 5,
        title: getFormattedDays(date, 2),
        complete: getFormattedDate(date, 2),
      },
      {
        id: 6,
        title: getFormattedDays(date, 3),
        complete: getFormattedDate(date, 3),
      },
    ]);
  };

  const getFormattedDate = (date: any, days: number) =>
    moment(date).add(days, 'days').format('MMM D, YYYY');

  const getFormattedDays = (date: any, days: number) =>
    moment(date).add(days, 'days').format('DD');

  return (
    <View style={styles.container}>
      <ScrollView>
        <GraphHeader
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          data={headerValue}
        />
        <View style={styles.innerContainer}>
          <Text style={styles.headingStyle}>YOUR DAILY MEDICATION</Text>
          {medicationLogs?.logs.map((log) => (
            <>
              <MedicationLogsCard {...log} />
            </>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
