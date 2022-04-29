import SingleMenuItemWithArrow from 'components/higher-order/single-menu-item-with-right-arrow';
import TitleWithBackWhiteBgLayout from 'components/layouts/back-with-title-white-bg';
import ActivityIndicator from 'components/loader/activity-indicator';
import AccountDeActivateModal from 'components/ui/account-deactivate-modal';
import { Nav_Screens } from 'navigation/constants';
import React, { useEffect, useState } from 'react';
import { Linking, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { settingsService } from 'services/account-service/settings-service';
import { navigate } from 'services/nav-ref';
import { userService } from 'services/user-service/user-service';
import { addUserContactsDetails, logout } from 'store/auth/auth-actions';
import { ErrorResponse } from 'types/ErrorResponse';
import { logNow } from 'utils/functions/log-binder';
import { styles } from './styles';

const SettingsScreen = () => {
  const dispatch = useDispatch();

  const [isVisibleDeActivateModal, setDeActivateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    userService
      .getUserContacts()
      .then((res) => {
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
        callMe={() => disableAccountCall()}
        isVisible={isVisibleDeActivateModal}
        setIsVisible={setDeActivateModal}
      />
      <ActivityIndicator visible={isLoading} />
      <TitleWithBackWhiteBgLayout title="Settings">
        <View style={styles.container}>
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
        </View>
      </TitleWithBackWhiteBgLayout>
    </SafeAreaView>
  );
};

export default SettingsScreen;
