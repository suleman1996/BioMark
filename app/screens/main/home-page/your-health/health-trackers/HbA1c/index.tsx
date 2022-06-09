/* eslint-disable @typescript-eslint/no-unused-vars */
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
  getCalendarDate,
  getDay,
  getMonth,
  getTime,
  getYear,
} from 'utils/functions/date-format';
import { navigate } from 'services/nav-ref';
import { IAppState } from 'store/IAppState';
import { useDispatch, useSelector } from 'react-redux';

const HbA1c = ({ route }) => {
  const SELECTED_HBA1C_ID = route?.params?.logId;
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [hbvalue, setHbvalue] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [dateAndtime, setDateAndTime] = useState<any>();
  const [validation, setValidation] = useState<any>(false);

  const [hba1cTracker, setHba1cTracker] = useState({
    data_value: '0',
    unit_list_id: 1,
    record_date: '',
  });

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
    if (SELECTED_HBA1C_ID) {
      getBloodSugarProgressDataByID(SELECTED_HBA1C_ID);
    } else {
      setHba1cTracker({
        ...hba1cTracker,
        record_date: getCalendarDate(new Date()),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getBloodSugarProgressDataByID = async (id) => {
    setIsLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const hba1cData = await userService.getHba1cProgress(id);
    console.log('hba1cData', hba1cData);
    setHba1cTracker({
      data_value: hba1cData?.data_value,
      unit_list_id: hba1cData?.unit_list_id,
      record_date: hba1cData?.record_date,
    });

    setIsLoading(false);
  };
  const saveHab1cLog = async () => {
    console.log('hba1cTracker', hba1cTracker);

    setIsLoading(true);
    const API_FUNCTION = SELECTED_HBA1C_ID
      ? 'updateHba1cTracker'
      : 'createHba1cTracker';
    try {
      await userService[API_FUNCTION](hba1cTracker, SELECTED_HBA1C_ID);
      navigate(SCREENS.HEALTH_PROGRESS);
    } catch (err: any) {
      console.error(err);
      if (error?.errMsg.status === '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error?.errMsg.status === false) {
        showMessage({
          message: error?.errMsg.data.error,
          type: 'danger',
        });
      } else {
        showMessage({
          message: error?.errMsg,
          type: 'danger',
        });
      }
    }
    setIsLoading(false);
  };
  // useEffect(() => {
  //   if (route?.params?.logId) {
  //     dispatch(getReduxHba1cProgress(route?.params?.logId));
  //     console.log('hba1cData', hba1cData);
  //   } else {
  //     setHbvalue('');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   console.log('logIdHba1c', route?.params?.logId);
  //   if (route?.params?.logId && route?.params?.logId) {
  //     if (hba1cData) {
  //       // setValue(bloodSugarProgress?.data_value);
  //       setHbvalue(hba1cData?.data_value);
  //       setDateAndTime(hba1cData?.record_date);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
            value={hba1cTracker?.data_value ? hba1cTracker?.data_value : ''}
            // maxLength={5}
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

          {hba1cTracker?.data_value ? (
            <>
              <Text style={styles.label}>Date - Time</Text>
              <DateTimePickerModal
                date={hba1cTracker.record_date}
                setDate={(e: any) =>
                  setHba1cTracker({
                    ...hba1cData,
                    record_date: e,
                  })
                }
              />
            </>
          ) : null}
        </View>
      </ScrollView>
      <ButtonWithShadowContainer
        onPress={saveHab1cLog}
        title={route?.params?.logId ? 'Save Edit' : 'Add'}
        disabled={!hbvalue || validation ? true : false}
      />
    </TitleWithBackWhiteBgLayout>
  );
};

export default HbA1c;
