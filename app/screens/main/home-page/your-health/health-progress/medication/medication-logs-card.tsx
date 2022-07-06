/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text } from 'react-native';
import React from 'react';

import SCREENS from 'navigation/constants/index';
import Styles from './styles';
import { Checkbox, useTheme } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { BioDangerWhite } from 'components/svg';
import SuccessCheck from 'assets/svgs/success-check';

type Props = {
  medication_log_id: number;
  frequency_time: string;
  dosage: string;
  unit: string;
  medication: string;
  taken: boolean;
  meal_type?: string;
  meal_type_id?: number;
  record_date?: any;
  overdue: boolean;
  message: string;
};

const MedicationLogsCard = ({
  medication_log_id,
  frequency_time,
  dosage,
  unit,
  medication,
  taken,
  overdue,
  message,
}: Props) => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  const navigation = useNavigation();
  return (
    <>
      {overdue ? (
        <View style={styles.medicationBox}>
          <View style={styles.timeView}>
            <Text style={styles.timeText}>{frequency_time}</Text>
          </View>
          <View style={styles.checkboxView}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Checkbox
                // status={taken}
                onPress={() =>
                  navigation.navigate(SCREENS.MEDICATION, {
                    medication_log_id: medication_log_id,
                  })
                }
              />
              <Text style={styles.medicineText}>{medication}</Text>
            </View>
            <Text style={styles.medicineText}>
              {dosage}
              {'  '} {unit}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.medicationBoxSuccess}>
          <View style={styles.timeView}>
            <Text style={styles.timeTextSuccess}>{frequency_time}</Text>
          </View>
          <View style={styles.checkboxView}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Checkbox
                status={'checked'}
                onPress={() =>
                  navigation.navigate(SCREENS.MEDICATION, {
                    medication_log_id: medication_log_id,
                  })
                }
              />
              <Text style={styles.medicineTextSuccess}>{medication}</Text>
            </View>
            <Text style={styles.medicineTextSuccess}>
              {dosage}
              {'  '} {unit}
            </Text>
          </View>
        </View>
      )}
      {overdue ? (
        <View style={styles.errorContainer}>
          <BioDangerWhite width={4} height={4} />
          <Text style={styles.errorText}>{message}</Text>
        </View>
      ) : (
        <View style={styles.successContainer}>
          <SuccessCheck width={15} height={15} />
          <Text style={styles.greenText}>{message}</Text>
        </View>
      )}
    </>
  );
};

export default MedicationLogsCard;
