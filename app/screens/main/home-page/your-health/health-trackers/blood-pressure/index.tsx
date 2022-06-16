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
import Icon from 'react-native-vector-icons/Ionicons';

import makeStyles from './styles';
import { ActivityIndicator } from 'components';
import { getCalendarDate } from 'utils/functions/date-format';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants/index';
import { AccountDeActivateModal } from 'components/ui';
import { Tip } from 'react-native-tip';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { useDispatch } from 'react-redux';
import { getReduxBloodPressureLogs } from 'store/home/home-actions';

const BloodPressure = ({ route }: any) => {
  const SELECTED_BP_ID = route?.params?.logId;
  const { colors } = useTheme();
  const disptach = useDispatch();
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
    // console.log({ SELECTED_BP_ID });
    // return;
    setIsLoading(true);
    const API_FUNCTION = SELECTED_BP_ID ? 'updateBpTracker' : 'createBpTracker';
    try {
      await userService[API_FUNCTION](bloodPressure, SELECTED_BP_ID);
      disptach(getReduxBloodPressureLogs());
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
      disptach(getReduxBloodPressureLogs());
      navigate(SCREENS.HEALTH_PROGRESS);
    } catch (err) {
      console.error(err);
    }
  };

  const onChangeBloodPressure = (key, value) => {
    console.log(key, value);
    setBloodPressure((prev) => ({ ...prev, [key]: value }));
    setError(bloodPressureValidator(key, value) || '');
  };

  useEffect(() => {
    if (
      +bloodPressure.bp_diastolic >= +bloodPressure.bp_systolic &&
      bloodPressure.bp_diastolic !== ''
    ) {
      setError(
        'Please enter a valid diastolic value. Diastolic value should be less than systolic value.'
      );
    }
  }, [bloodPressure]);

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
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>Your Reading (mmHg)</Text>
            <View
              style={{ marginTop: heightToDp(3), marginLeft: widthToDp(4) }}
            >
              <Tip
                //title=""
                body="Your blood pressure measures the pressure of the blood that is flowing in your blood vessels. The top number is your systolic reading which measures the pressure when your heart beats. The bottom number is your diastolic reading which measures the pressure when your heart relaxes in between beats.."
                bodyStyle={{ color: '#fff' }}
                tipContainerStyle={{
                  backgroundColor: colors.darkPrimary,
                  width: '60%',
                }}
                overlayOpacity={0.001}
              >
                <Icon
                  name="ios-information-circle-outline"
                  size={responsiveFontSize(22)}
                  color={colors.darkPrimary}
                />
              </Tip>
            </View>
          </View>
          <MedicalInput
            height={15}
            textAlign="center"
            placeholder={'High (SYS)'}
            onChangeText={(val) => {
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
              onChangeBloodPressure('bp_diastolic', val);
            }}
            value={bloodPressure.bp_diastolic}
            maxLength={3}
            width={''}
            // defaultValue={''}
          />
          {error?.length > 0 ? <ErrorMessage errorMessage={error} /> : null}

          <Text style={styles.label}>Date - Time</Text>
          <DateTimePickerModal
            maxDate={new Date()}
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
        disabled={
          bloodPressure.bp_systolic === '' ||
          bloodPressure.bp_diastolic === '' ||
          error
            ? true
            : false
        }
      />
    </TitleWithBackWhiteBgLayout>
  );
};

export default BloodPressure;
