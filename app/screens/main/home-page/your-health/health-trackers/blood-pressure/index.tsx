import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import { MedicalInput } from 'components/higher-order';
import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import {
  // ButtonWithShadowContainer,
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
import {
  getReduxBloodPressureLogs,
  getReduxHealthTracker,
} from 'store/home/home-actions';
import { roundToDecimalPlaces } from 'utils/functions';
import moment from 'moment';
import GradientButton from 'components/linear-gradient-button';
import { useTranslation } from 'react-i18next';

const BloodPressure = ({ route }: any) => {
  const { t } = useTranslation();
  const SELECTED_BP_ID = route?.params?.logId;
  const { colors } = useTheme();
  const dispatch = useDispatch();
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
      dispatch(getReduxBloodPressureLogs());
      dispatch(getReduxHealthTracker());
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
      dispatch(getReduxBloodPressureLogs());
      dispatch(getReduxHealthTracker());
      {
        route?.params?.back
          ? navigate(route?.params?.back)
          : navigate(SCREENS.HEALTH_PROGRESS, 4);
      }
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
        bp_diastolic: t('pages.bloodPressureInput.errors.bloodPressure'),
      }));
    } else {
      setError((prev) => {
        const copy = { ...prev };
        if (
          copy.bp_diastolic ==
          t('pages.bloodPressureInput.errors.bloodPressure')
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
  }, [t, bloodPressure]);

  return (
    <TitleWithBackWhiteBgLayout
      title={t('pages.bloodPressureInput.title')}
      binIcon={SELECTED_BP_ID ? true : false}
      onPressIcon={() => setShowDeleteModal(true)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
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
              <Text style={styles.label}>
                {t('pages.bloodPressureInput.yourReading')}
              </Text>
              <View
                style={{ marginTop: heightToDp(3), marginLeft: widthToDp(4) }}
              >
                <Tip
                  body={t('pages.bloodPressureInput.definition')}
                  bodyStyle={{ color: '#fff' }}
                  tipContainerStyle={{
                    backgroundColor: colors.shineBlue,
                    width: '60%',
                  }}
                  overlayOpacity={0.001}
                >
                  <Icon
                    name="ios-information-circle-outline"
                    size={responsiveFontSize(22)}
                    color={colors.shineBlue}
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
                <Text style={styles.label}>
                  {t('pages.bloodPressureInput.dateTime')}
                </Text>
                <DateTimePickerModal
                  maxDate={new Date()}
                  date={bloodPressure.date_entry}
                  setDate={(e: any) =>
                    setBloodPressure((tracker) => ({
                      ...tracker,
                      date_entry: e,
                    }))
                  }
                />
              </>
            ) : null}
          </View>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              bottom: 0,
              paddingHorizontal: 20,
              marginBottom: 20,
            }}
          >
            {bloodPressure.bp_systolic.length > 0 &&
            bloodPressure.bp_diastolic.length > 0 ? (
              <GradientButton
                text={SELECTED_BP_ID ? 'Save Edit' : 'Add'}
                color={['#2C6CFC', '#2CBDFC']}
                onPress={saveBloodPressureLog}
                disabled={
                  bloodPressure.bp_systolic === '' ||
                  bloodPressure.bp_diastolic === '' ||
                  Object.keys(error).length !== 0
                }
              />
            ) : (
              <TouchableOpacity
                onPress={saveBloodPressureLog}
                disabled={true}
                style={{
                  height: 50,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F0F0F0',
                }}
              >
                <Text
                  style={{
                    color: colors.smoke,
                    fontSize: responsiveFontSize(15),
                  }}
                >
                  {SELECTED_BP_ID ? 'Save Edit' : 'Add'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
        {showDeleteModal && (
          <AccountDeActivateModal
            headerText={t('pages.bloodPressureInput.dialogs.delete.title')}
            subHeading={t(
              'pages.bloodPressureInput.dialogs.delete.description'
            )}
            buttonUpperText={t(
              'pages.bloodPressureInput.dialogs.delete.buttonText'
            )}
            buttonLowerText={t(
              'pages.bloodPressureInput.dialogs.delete.buttonCancelText'
            )}
            isVisible={showDeleteModal}
            setIsVisible={setShowDeleteModal}
            callMe={deleteBpLog}
          />
        )}
      </KeyboardAvoidingView>
    </TitleWithBackWhiteBgLayout>
  );
};
export default BloodPressure;
