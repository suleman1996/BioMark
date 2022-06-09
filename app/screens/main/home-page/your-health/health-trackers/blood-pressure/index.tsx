import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import { MedicalInput } from 'components/higher-order';
import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import {
  ButtonWithShadowContainer,
  DateTimePickerModal,
  ErrorMessage,
} from 'components/base';
import { bloodPressureValidator } from 'utils/functions/measurments';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { userService } from 'services/user-service/user-service';
import { showMessage } from 'react-native-flash-message';

import makeStyles from './styles';
import { ActivityIndicator } from 'components';
import { getCalendarDate } from 'utils/functions/date-format';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants/index';
import { AccountDeActivateModal } from 'components/ui';

const BloodPressure = ({ route }: any) => {
  const SELECTED_BP_ID = route?.params?.logId;
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState<string>('');

  const [bloodPressure, setBloodPressure] = useState({
    bp_systolic: '',
    bp_diastolic: '',
    date_entry: '',
  });

  const getBloodPressureByID = async (id) => {
    setIsLoading(true);
    const bloodPressureResponse = await userService.getBloodPressureProgress(
      id
    );
    console.log('===========>', bloodPressureResponse);

    setBloodPressure({
      bp_systolic: bloodPressureResponse.bp_systolic,
      bp_diastolic: bloodPressureResponse.bp_diastolic,
      date_entry: bloodPressureResponse?.date_entry,
    });
    setIsLoading(false);
  };
  useEffect(() => {
    if (SELECTED_BP_ID) {
      getBloodPressureByID(SELECTED_BP_ID);
    } else {
      setBloodPressure({
        ...bloodPressure,
        date_entry: getCalendarDate(new Date()),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveBloodPressureLog = async () => {
    setIsLoading(true);
    const API_FUNCTION = SELECTED_BP_ID ? 'updateBpTracker' : 'createBpTracker';
    try {
      await userService[API_FUNCTION](bloodPressure, SELECTED_BP_ID);
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
  const deleteBpLog = async () => {
    try {
      await userService.deleteBpLog(SELECTED_BP_ID);
      navigate(SCREENS.HEALTH_PROGRESS);
    } catch (err) {
      console.error(err);
    }
  };

  const onChangeBloodPressure = (key, value) => {
    console.log(key, value);
    setBloodPressure((prev) => ({ ...prev, [key]: value }));
    setError(bloodPressureValidator('key', value) || '');
  };

  console.log('Error', error);

  return (
    <TitleWithBackWhiteBgLayout
      title="Blood Pressure"
      binIcon={SELECTED_BP_ID ? true : false}
      onPressIcon={() => setShowDeleteModal(true)}
    >
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
            onChangeText={(val) => {
              console.log('u');
              onChangeBloodPressure('bp_systolic', val);
            }}
            value={bloodPressure.bp_systolic}
            maxLength={3}
            width={''}
            // defaultValue={''}
          />
          <MedicalInput
            height={15}
            textAlign="center"
            placeholder={'Low (DIA)'}
            onChangeText={(val) => {
              console.log('u');
              onChangeBloodPressure('bp_diastolic', val);
            }}
            value={bloodPressure.bp_diastolic}
            maxLength={3}
            width={''}
            // defaultValue={''}
          />
          {error?.length > 0 ? <ErrorMessage errorMessage={error} /> : null}

          <Text style={styles.label}>Date of Birth</Text>
          <DateTimePickerModal
            date={bloodPressure.date_entry}
            setDate={(e: any) =>
              setBloodPressure((tracker) => ({ ...tracker, date_entry: e }))
            }
          />
        </View>
      </ScrollView>
      {showDeleteModal && (
        <AccountDeActivateModal
          headerText="Weight"
          subHeading="Are you sure you wish to delete this weight log?"
          buttonUpperText="Yes"
          buttonLowerText="Skip"
          isVisible={showDeleteModal}
          setIsVisible={setShowDeleteModal}
          callMe={deleteBpLog}
        />
      )}
      <ButtonWithShadowContainer
        onPress={saveBloodPressureLog}
        title={SELECTED_BP_ID ? 'Save Edit' : 'Add'}
        disabled={!bloodPressure ? true : false}
      />
    </TitleWithBackWhiteBgLayout>
  );
};

export default BloodPressure;
