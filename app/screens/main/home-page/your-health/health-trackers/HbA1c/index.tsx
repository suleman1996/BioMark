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
import SCREENS from 'navigation/constants/index';
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
import { IAppState } from 'store/IAppState';
import { useDispatch, useSelector } from 'react-redux';
import { getReduxHba1cProgress } from 'store/home/home-actions';

const HbA1c = ({ route }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const dispatch = useDispatch();

  const [hbvalue, setHbvalue] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [dateAndtime, setDateAndTime] = useState<any>();
  const [validation, setValidation] = useState<any>(false);

  const hba1cData = useSelector(
    (state: IAppState) => state.home.getHba1cProgressData
  );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (route?.params?.logId) {
      dispatch(getReduxHba1cProgress(route?.params?.logId));
      console.log('hba1cData', hba1cData);
    } else {
      setHbvalue('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('logIdHba1c', route?.params?.logId);
    if (route?.params?.logId && route?.params?.logId) {
      if (hba1cData) {
        // setValue(bloodSugarProgress?.data_value);
        setHbvalue(hba1cData?.data_value);
        setDateAndTime(hba1cData?.record_date);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      navigate(SCREENS.HEALTH_PROGRESS, 3);
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

  console.log('hba1cData', hba1cData);

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
            // value={hba1cData?.data_value}
            defaultValue={route?.params?.logId ? hba1cData?.data_value : ''}
            maxLength={5}
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
              <Text style={styles.label}>Date - Time</Text>
              <DateTimePickerModal
                date={dateAndtime}
                setDate={(e: any) => setDateAndTime(e)}
              />
            </>
          ) : null}
        </View>

        <ButtonWithShadowContainer
          onPress={onSubmit}
          title={route?.params?.logId ? 'Save Edit' : 'Add'}
          disabled={!hbvalue || validation ? true : false}
        />
      </ScrollView>
    </TitleWithBackWhiteBgLayout>
  );
};

export default HbA1c;
