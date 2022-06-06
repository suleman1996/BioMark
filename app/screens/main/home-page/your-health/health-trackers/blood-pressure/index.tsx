import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import { MedicalInput } from 'components/higher-order';
import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import {
  ButtonWithShadowContainer,
  DateTimePickerModal,
} from 'components/base';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { userService } from 'services/user-service/user-service';
import { showMessage } from 'react-native-flash-message';

import makeStyles from './styles';
import { ActivityIndicator } from 'components';
import {
  getDay,
  getMonth,
  getTime,
  getYear,
} from 'utils/functions/date-format';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants/index';

const BloodPressure = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [highValue, setHighValue] = useState('');
  const [lowValue, setLowValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dateAndtime, setDateAndTime] = useState<any>();
  const [validation, setValidation] = useState<any>(false);
  const [validation2, setValidation2] = useState<any>(false);

  useEffect(() => {
    let today = new Date();
    let dateTime =
      getMonth(today) +
      ' ' +
      getDay(today) +
      ', ' +
      getYear(today) +
      ' ' +
      getTime(today);
    setDateAndTime(dateTime);
  }, []);

  const onChangeTextHigh = (values) => {
    console.log('value', values);

    if (values < 60 || values > 600) {
      setValidation2(false);
      setValidation(true);
    } else {
      setValidation(false);
      setValidation2(false);
      console.log('emmty');
    }
    setHighValue(values);
    // setValue(value);
  };
  const onChangeTextLow = (values) => {
    console.log('value', values);

    if (values < 30 || values > 120) {
      setValidation2(false);
      setValidation(true);
    } else {
      setValidation(false);
      setValidation2(false);
      console.log('emmty');
    }
    setLowValue(values);
    // setValue(value);
  };

  const onSubmit = async () => {
    let dateTime = '';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dateTime =
      getMonth(dateAndtime) +
      ' ' +
      getDay(dateAndtime) +
      ', ' +
      getYear(dateAndtime) +
      ' ' +
      getTime(dateAndtime);

    console.log('bp_systolic', highValue);
    console.log('bp_diastolic', lowValue);
    console.log('date_entry', dateAndtime);
    try {
      setIsLoading(true);
      const response = await userService.createBloodPressure({
        medical: {
          bp_systolic: highValue,
          bp_diastolic: lowValue,
          date_entry: dateAndtime,
        },
      });
      console.log('blood pressure successful', response.data);
      navigate(SCREENS.HEALTH_PROGRESS, 4);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error.errMsg.status === '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error.errMsg.status === false) {
        showMessage({
          message: error.errMsg.data.error,
          type: 'danger',
        });
      } else {
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
      }
    }
  };

  return (
    <TitleWithBackWhiteBgLayout title="Blood Pressure">
      <ActivityIndicator visible={isLoading} />
      <ScrollView style={styles.container}>
        <View
          style={{
            paddingHorizontal: widthToDp(4),
            // borderWidth: 5,
            marginBottom: heightToDp(25),
          }}
        >
          <Text style={styles.label}>Your Reading (mmHg)</Text>
          <MedicalInput
            height={15}
            textAlign="center"
            placeholder={'High (SYS)'}
            onChangeText={onChangeTextHigh}
            // value={value}
            maxLength={3}
          />
          <MedicalInput
            height={15}
            textAlign="center"
            placeholder={'Low (DIA)'}
            onChangeText={onChangeTextLow}
            //  value={value}
            maxLength={3}
          />
          {validation ? (
            <Text style={styles.errorMessage}>
              Please input a valid systolic BP from 60-200 mmHg
            </Text>
          ) : null}
          {validation2 ? (
            <Text style={styles.errorMessage}>
              Please input a valid diastolic BP from 30-120 mmHg
            </Text>
          ) : null}

          {!validation && !validation2 ? (
            <>
              <Text style={styles.label}>Date of Birth</Text>
              <DateTimePickerModal
                date={dateAndtime}
                setDate={(e: any) => setDateAndTime(e)}
              />
            </>
          ) : null}
        </View>

        <ButtonWithShadowContainer
          onPress={onSubmit}
          title={'Add'}
          disabled={
            highValue === '' || lowValue === '' || validation || validation2
              ? true
              : false
          }
        />
      </ScrollView>
    </TitleWithBackWhiteBgLayout>
  );
};

export default BloodPressure;
