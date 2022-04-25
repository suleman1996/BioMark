import React, { useState } from 'react';
import { Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TitleWithBackWhiteBgLayout from 'components/layouts/back-with-title-white-bg';
import SingleMenuItemWithArrow from 'components/higher-order/single-menu-item-with-right-arrow';
import { goBack, navigate } from 'services/nav-ref';
import { Nav_Screens } from 'navigation/constants';
import AccountDeActivateModal from 'components/ui/account-deactivate-modal';
import { settingsService } from 'services/account-service/settings-service';
import { ErrorResponse } from 'types/ErrorResponse';
import { showMessage } from 'react-native-flash-message';
import ActivityIndicator from 'components/loader/activity-indicator';

const SettingsScreen = () => {
  const [isVisibleDeActivateModal, setDeActivateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const disableAccountCall = () => {
    setIsLoading(true);
    settingsService
      .deactivateAccount()
      .then((res) => {
        showMessage({
          message: res.data.message,
          type: 'success',
        });
        goBack();
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
        callMe={() => disableAccountCall()}
        isVisible={isVisibleDeActivateModal}
        setIsVisible={setDeActivateModal}
      />
      <ActivityIndicator visible={isLoading} />
      <TitleWithBackWhiteBgLayout title="Settings">
        <SingleMenuItemWithArrow
          onPress={() => navigate(Nav_Screens.PasswordChangeScreen)}
          title={'Password'}
        />
        <SingleMenuItemWithArrow
          onPress={() => navigate(Nav_Screens.EmailChangeScreen)}
          title={'Email'}
        />
        <SingleMenuItemWithArrow
          onPress={() => navigate(Nav_Screens.PhoneChangeScreen)}
          title={'Phone Number'}
        />
        <SingleMenuItemWithArrow
          onPress={() => navigate(Nav_Screens.MarketingConsentScreen)}
          title={'Marketing Consent'}
        />
        <SingleMenuItemWithArrow
          onPress={() => Linking.openURL('mailto:support@biomarking.com')}
          title={'Data privacy Query'}
        />
        <SingleMenuItemWithArrow
          onPress={() => setDeActivateModal(true)}
          title={'Account Deactivation'}
        />
      </TitleWithBackWhiteBgLayout>
    </SafeAreaView>
  );
};

export default SettingsScreen;
