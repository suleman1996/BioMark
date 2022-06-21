import React, { useEffect, useState } from 'react';
import { Linking, View, SafeAreaView } from 'react-native';
import { useTheme } from 'react-native-paper';

import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';

import { SingleMenuItemWithArrow } from 'components/higher-order';
import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import { ActivityIndicator } from 'components';
import { AccountDeActivateModal } from 'components/ui';

import { logNow } from 'utils/functions/log-binder';
import SCREENS from 'navigation/constants';
import { settingsService } from 'services/account-service/settings-service';
import { navigate } from 'services/nav-ref';
import { userService } from 'services/user-service/user-service';
import { addUserContactsDetails, logout } from 'store/auth/auth-actions';
import { ErrorResponse } from 'types/ErrorResponse';

import makeStyles from './styles';
import { useTranslation } from 'react-i18next';

const SettingsScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = makeStyles(colors);

  const dispatch = useDispatch();

  const [isVisibleDeActivateModal, setDeActivateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    userService
      .getUserContacts()
      .then((res) => {
        logNow(res);
        dispatch(addUserContactsDetails(res));
      })
      .catch(() => {})
      .finally(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disableAccountCall = () => {
    setIsLoading(true);
    settingsService
      .deactivateAccount()
      .then((res) => {
        showMessage({
          message: res.data.message,
          type: 'success',
        });
        userService.logout().then((res2) => {
          logNow(res2);
        });
        dispatch(logout());
        // goBack();
      })
      .catch((err: ErrorResponse) => {
        showMessage({
          message: err.errMsg.data.message,
          type: 'danger',
        });
      })
      .finally(() => {
        setDeActivateModal(false);
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AccountDeActivateModal
        headerText={t('pages.settings.dialogs.accountDeactivation.title')}
        subHeading={t('pages.settings.dialogs.accountDeactivation.description')}
        buttonUpperText={t(
          'pages.settings.dialogs.accountDeactivation.buttonText'
        )}
        buttonLowerText={t(
          'pages.settings.dialogs.accountDeactivation.cancelButtonText'
        )}
        callMe={() => disableAccountCall()}
        isVisible={isVisibleDeActivateModal}
        setIsVisible={setDeActivateModal}
      />
      <ActivityIndicator visible={isLoading} />
      <TitleWithBackWhiteBgLayout title={t('pages.settings.title')}>
        <View style={styles.container}>
          <SingleMenuItemWithArrow
            onPress={() => navigate(SCREENS.PASSWORD_CHANGED)}
            title={t('pages.settings.links.password')}
          />
          <SingleMenuItemWithArrow
            onPress={() => navigate(SCREENS.EMAIL_CHANGE)}
            title={t('pages.settings.links.email')}
          />
          <SingleMenuItemWithArrow
            onPress={() => navigate(SCREENS.PHONE_NUMBER_CHANGE)}
            title={t('pages.settings.links.phoneNumber')}
          />
          <SingleMenuItemWithArrow
            onPress={() => navigate(SCREENS.MARKETING_CONSENT)}
            title={t('pages.settings.links.marketingConsent')}
          />
          <SingleMenuItemWithArrow
            onPress={() => Linking.openURL('mailto:support@biomarking.com')}
            title={t('pages.settings.links.dataPrivacy')}
          />
          <SingleMenuItemWithArrow
            onPress={() => setDeActivateModal(true)}
            title={t('pages.settings.links.accountDeactivation')}
          />
        </View>
      </TitleWithBackWhiteBgLayout>
    </SafeAreaView>
  );
};

export default SettingsScreen;
