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
// import { navigate } from 'services/nav-ref';
// import SCREENS from 'navigation/constants';
import { showMessage } from 'react-native-flash-message';

import makeStyles from './styles';
import { ActivityIndicator } from 'components';
import {
  getDay,
  getMonth,
  getTime,
  getYear,
} from 'utils/functions/date-format';

const HbA1c = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [hbvalue, setHbvalue] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [dateAndtime, setDateAndTime] = useState<any>();
  const [validation, setValidation] = useState<any>(false);

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

  const onChangeText = (values) => {
    console.log('value', values);

    if (values < 5 || values > 15) {
      setValidation(true);
    } else {
      setValidation(false);
      console.log('emmty');
    }
    setHbvalue(values);
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

    console.log('bp_systolic', hbvalue);

    try {
      setIsLoading(true);
      const response = await userService.createHba1c({
        hba1c: {
          data_value: hbvalue,
          unit_list_id: 3,
          record_date: dateAndtime,
        },
      });
      console.log('HbA1c successful', response.data);
      alert('HbA1c successful');
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
    <TitleWithBackWhiteBgLayout title="HbA1c">
      <ActivityIndicator visible={isLoading} />
      <ScrollView style={styles.container}>
        <View
          style={{
            paddingHorizontal: widthToDp(4),
            // borderWidth: 5,
            marginBottom: heightToDp(25),
          }}
        >
          <Text style={styles.label}>Your Reading</Text>
          <MedicalInput
            height={15}
            textAlign="center"
            placeholder={'0.0'}
            onChangeText={onChangeText}
            showIcon={true}
            // value={value}
            maxLength={3}
          />

          {validation && hbvalue ? (
            <Text style={styles.errorMessage}>
              Your HbA1c measurement should be between 5-15%
            </Text>
          ) : null}
          {!hbvalue ? (
            <Text style={styles.errorMessage}>
              Please provide your measurement
            </Text>
          ) : null}

          {!validation && hbvalue ? (
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
          disabled={!hbvalue || validation ? true : false}
        />
      </ScrollView>
    </TitleWithBackWhiteBgLayout>
  );
};

export default HbA1c;
