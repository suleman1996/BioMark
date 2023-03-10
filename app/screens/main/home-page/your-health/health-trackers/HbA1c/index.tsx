/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { IAppState } from 'store/IAppState';
import {
  getReduxDashboard,
  getReduxHba1cLogs,
  getReduxHealthTracker,
} from 'store/home/home-actions';

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
import { showMessage, hideMessage } from 'react-native-flash-message';
import { hba1cValidator } from 'utils/functions/measurments';

import makeStyles from './styles';
import { ActivityIndicator } from 'components';
import { getCalendarDate } from 'utils/functions/date-format';
import { navigate } from 'services/nav-ref';
import { ErrorMessage } from 'components/base';
import { AccountDeActivateModal } from 'components/ui';
import { roundToDecimalPlaces } from 'utils/functions';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const HbA1c = ({ route }) => {
  const { t } = useTranslation();
  const SELECTED_HBA1C_ID = route?.params?.logId;
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const dispatch = useDispatch();
  const { hasHBA1cTarget, latestHba1c } = useSelector((state: IAppState) => ({
    hasHBA1cTarget: state.home?.dashboard?.has_hba1c_target,
    latestHba1c: state.home.latestHba1c,
  }));

  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [hba1cTracker, setHba1cTracker] = useState({
    data_value: '',
    unit_list_id: 3,
    record_date: '',
  });

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

    setHba1cTracker({
      data_value: roundToDecimalPlaces(hba1cData?.data_value, 2),
      unit_list_id: hba1cData?.unit_list_id,
      record_date: hba1cData?.record_date,
    });

    setIsLoading(false);
  };
  const saveHab1cLog = async () => {
    setIsLoading(true);
    if (!hasHBA1cTarget) {
      await userService.setDefaultBloodSugarTarget();
      dispatch(getReduxDashboard());
    }
    const API_FUNCTION = SELECTED_HBA1C_ID
      ? 'updateHba1cTracker'
      : 'createHba1cTracker';
    try {
      await userService[API_FUNCTION](
        {
          ...hba1cTracker,
          record_date: moment(hba1cTracker.record_date).toDate().toString(),
        },
        SELECTED_HBA1C_ID
      );
      dispatch(getReduxHba1cLogs());
      dispatch(getReduxHealthTracker());
      navigate(SCREENS.HEALTH_PROGRESS, 3);
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
  const deleteHba1cLog = async () => {
    try {
      await userService.deleteHba1cLog(SELECTED_HBA1C_ID);
      dispatch(getReduxHba1cLogs());
      dispatch(getReduxHealthTracker());
      navigate(SCREENS.HEALTH_PROGRESS, 3);
    } catch (err) {
      console.error(err);
    }
  };

  const onChangeHba1c = (key, value) => {
    setHba1cTracker((prev) => ({ ...prev, [key]: value }));
    if (+value < +latestHba1c?.goal_value) {
      showMessage({
        message: t('pages.hba1cInput.errors.belowGoal'),
        type: 'danger',
        icon: 'warning',
      });
    } else if (+value > +latestHba1c?.goal_value) {
      showMessage({
        message: t('pages.hba1cInput.errors.aboveGoal'),
        type: 'danger',
        icon: 'warning',
      });
    } else {
      hideMessage();
    }
    setError(hba1cValidator(value) || '');
  };

  return (
    <TitleWithBackWhiteBgLayout
      title={t('pages.hba1cInput.title')}
      binIcon={SELECTED_HBA1C_ID ? true : false}
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
          <Text style={styles.label}>{t('pages.hba1cInput.yourReading')}</Text>
          <MedicalInput
            height={15}
            textAlign="center"
            placeholder={'0.0'}
            onChangeText={(val) => {
              if (/^(\d)*(\.)?([0-9]{1})?$/gm.test(val) || val == '')
                onChangeHba1c('data_value', val);
            }}
            showIcon={true}
            value={hba1cTracker?.data_value ? hba1cTracker?.data_value : ''}
            selectionColor="darkblue"
            // maxLength={5}
          />
          {error?.length > 0 ? <ErrorMessage errorMessage={error} /> : null}

          {!error && hba1cTracker?.data_value ? (
            <>
              <Text style={styles.label}>{t('pages.hba1cInput.dateTime')}</Text>
              <DateTimePickerModal
                maxDate={new Date()}
                date={hba1cTracker.record_date}
                setDate={(e: any) =>
                  setHba1cTracker((prev) => ({
                    ...prev,
                    record_date: e,
                  }))
                }
              />
            </>
          ) : null}
        </View>
      </ScrollView>
      <AccountDeActivateModal
        headerText={t('pages.hba1cInput.title')}
        subHeading={t('pages.hba1cInput.dialogs.delete.description')}
        buttonUpperText={t('pages.hba1cInput.dialogs.delete.buttonText')}
        buttonLowerText={t('pages.hba1cInput.dialogs.delete.buttonCancelText')}
        isVisible={showDeleteModal}
        setIsVisible={setShowDeleteModal}
        callMe={deleteHba1cLog}
      />
      <ButtonWithShadowContainer
        onPress={saveHab1cLog}
        title={
          route?.params?.logId
            ? t('pages.hba1cInput.save')
            : t('pages.hba1cInput.add')
        }
        disabled={error || hba1cTracker.data_value === '' ? true : false}
      />
    </TitleWithBackWhiteBgLayout>
  );
};

export default HbA1c;
