/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import { FloatingAction } from 'react-native-floating-action';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import SCREENS from 'navigation/constants/index';
import { userService } from 'services/user-service/user-service';
import fonts from 'assets/fonts';

import GraphHeader from 'components/graph-header/index';
import PlusMedicationIcon from 'assets/svgs/plus-medication';
import PillMedicationIcon from 'assets/svgs/pill-mediction';
import EditMedicationIcon from 'assets/svgs/edit-medication-icon';
import TickMedicationIcon from 'assets/svgs/tick-medication-icon';
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

  const ACTION_BUTTONS = [
    {
      text: 'Take Medication',
      icon: <TickMedicationIcon />,
      name: 'bt_TakeMedication',
      position: 1,
      color: colors.white,
      buttonSize: 55,
      textBackground: '#0000',
      textElevation: 0,
      margin: 0,
      textStyle: [
        {
          fontSize: 17,
          fontFamily: fonts.mulishRegular,
          color: colors.white,
        },
      ],
    },
    {
      text: 'Add New Medication',
      icon: <PlusMedicationIcon />,
      iconColor: colors.shineBlue,
      name: 'bt_AddMedication',
      margin: 0,
      textBackground: '#0000',
      textElevation: 0,
      position: 2,
      color: colors.white,
      buttonSize: 55,
      textStyle: [
        {
          fontSize: 17,
          fontFamily: fonts.mulishRegular,
          color: colors.white,
        },
      ],
    },
    {
      text: 'Edit Medication',
      icon: <EditMedicationIcon />,
      iconColor: colors.shineBlue,
      name: 'bt_EditMedication',
      position: 3,
      textBackground: '#0000',
      margin: 0,
      textElevation: 0,
      color: colors.white,
      buttonSize: 55,
      textStyle: [
        {
          fontSize: 17,
          fontFamily: fonts.mulishRegular,
          color: colors.white,
        },
      ],
    },
  ];

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
      <FloatingAction
        actions={ACTION_BUTTONS}
        onPressItem={(item) => {
          if (item === 'bt_TakeMedication') {
            navigation.navigate(SCREENS.MEDICATION);
          } else if (item === 'bt_AddMedication') {
            navigation.navigate(SCREENS.ADD_NEW_MEDICATION);
          } else if (item === 'bt_EditMedication') {
            navigation.navigate(SCREENS.EDIT_MEDICATION);
          }
        }}
        color={colors.shineBlue}
        buttonSize={55}
        distanceToEdge={15}
        actionsPaddingTopBottom={5}
        floatingIcon={<PillMedicationIcon />}
      />
    </View>
  );
};

export default Index;
