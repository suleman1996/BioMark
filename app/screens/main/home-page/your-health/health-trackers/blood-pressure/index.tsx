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
import { roundToDecimalPlaces } from 'utils/functions';
import moment from 'moment';

const BloodPressure = ({ route }: any) => {
  const SELECTED_BP_ID = route?.params?.logId;
  const { colors } = useTheme();
  const disptach = useDispatch();
  const styles = makeStyles(colors);

  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState({});

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

    setBloodPressure({
      bp_systolic: roundToDecimalPlaces(bloodPressureResponse.bp_systolic, 0),
      bp_diastolic: roundToDecimalPlaces(bloodPressureResponse.bp_diastolic, 0),
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
      await userService[API_FUNCTION](
        {
          ...bloodPressure,
          bp_systolic: roundToDecimalPlaces(bloodPressure.bp_systolic, 0),
          bp_diastolic: roundToDecimalPlaces(bloodPressure.bp_diastolic, 0),
          date_entry: moment(bloodPressure.date_entry).toDate().toString(),
        },
        SELECTED_BP_ID
      );
      disptach(getReduxBloodPressureLogs());
      navigate(SCREENS.HEALTH_PROGRESS, 4);
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
      navigate(SCREENS.HEALTH_PROGRESS, 4);
    } catch (err) {
      console.error(err);
    }
  };

  const onChangeBloodPressure = (key, value) => {
    setBloodPressure((prev) => ({ ...prev, [key]: value }));
    setError((prev) => {
      const copy = { ...prev };
      const err = bloodPressureValidator(key, value);
      if (err) {
        copy[key] = err;
      } else {
        delete copy[key];
      }
      return {
        ...copy,
      };
    });
  };

  useEffect(() => {
    if (
      +bloodPressure.bp_diastolic >= +bloodPressure.bp_systolic &&
      bloodPressure.bp_diastolic !== ''
    ) {
      setError((prev) => ({
        ...prev,
        bp_diastolic:
          'Please enter a valid diastolic value. Diastolic value should be less than systolic value.',
      }));
    } else {
      setError((prev) => {
        const copy = { ...prev };
        if (
          copy.bp_diastolic ==
          'Please enter a valid diastolic value. Diastolic value should be less than systolic value.'
        ) {
          const err = bloodPressureValidator(
            'bp_diastolic',
            bloodPressure.bp_diastolic
          );
          if (err) {
            copy.bp_diastolic = err;
          } else {
            delete copy.bp_diastolic;
          }
        }
        return { ...copy };
      });
    }
  }, [bloodPressure]);

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
            marginBottom: heightToDp(25),
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>Your Reading (mmHg)</Text>
            <View
              style={{ marginTop: heightToDp(3), marginLeft: widthToDp(4) }}
            >
              <Tip
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
            selectionColor="darkblue"
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
            selectionColor="darkblue"
          />
          {Object.keys(error)?.length > 0 ? (
            <ErrorMessage errorMessage={error[Object.keys(error)[0]]} />
          ) : null}
          {Object.keys(error).length === 0 &&
          bloodPressure.bp_systolic &&
          bloodPressure.bp_diastolic ? (
            <>
              <Text style={styles.label}>Date - Time</Text>
              <DateTimePickerModal
                maxDate={new Date()}
                date={bloodPressure.date_entry}
                setDate={(e: any) =>
                  setBloodPressure((tracker) => ({ ...tracker, date_entry: e }))
                }
              />
            </>
          ) : null}
        </View>
      </ScrollView>
      {showDeleteModal && (
        <AccountDeActivateModal
          headerText="Blood Pressure"
          subHeading="Are you sure you wish to delete this blood pressure log?"
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
          Object.keys(error).length !== 0
        }
      />
    </TitleWithBackWhiteBgLayout>
  );
};
export default BloodPressure;
