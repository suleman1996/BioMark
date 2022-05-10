import { ActivityIndicator } from 'components';
import { Button, CheckBoxWithText } from 'components/base';
import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import { MarketingConsentModal } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { settingsService } from 'services/account-service/settings-service';
import { goBack } from 'services/nav-ref';
import { setMarketing } from 'store/auth/auth-actions';
import { IAppState } from 'store/IAppState';
import { GlobalStyles } from 'utils/theme/global-styles';
import { styles } from './styles';

const MarketingConsentScreen = () => {
  const dispatch = useDispatch();
  const userMarketing = useSelector((state: IAppState) => state.auth.marketing);

  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isMModal, setIsMModal] = useState(false);
  const [isInitialDisable, setIsInitialDisable] = useState(true);

  useEffect(() => {
    getUserMarketing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsChecked(userMarketing.enable);
  }, [userMarketing]);

  const getUserMarketing = () => {
    settingsService
      .getMarketing()
      .then((res) => {
        dispatch(setMarketing(res));
      })
      .catch(() => {});
  };

  const onChangeMarketing = () => {
    setIsMModal(false);
    setIsLoading(true);
    settingsService
      .saveMarketing(isChecked)
      .then(() => {
        getUserMarketing();
        goBack();
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <TitleWithBackWhiteBgLayout title="Marketing Consent">
      <ActivityIndicator visible={isLoading} />
      <MarketingConsentModal
        callMe={() => {
          setIsChecked(!isChecked);
          setIsMModal(false);
        }}
        isVisible={isMModal}
        setIsVisible={setIsMModal}
      />
      <View style={styles.container}>
        <Text style={styles.headerText}>
          BioMark would like to contact you regarding information on offers,
          promotions and services via email and SMS.
        </Text>
        <CheckBoxWithText
          rightText="I  would like to receive information on offers, promotions and services via email and SMS."
          isChecked={isChecked}
          setIsChecked={(value: any) => {
            setIsInitialDisable(false);
            if (!value) {
              setIsMModal(true);
            } else {
              setIsChecked(value);
            }
          }}
        />
        <View
          style={[GlobalStyles.bottomBtnWithShadow, styles.bottomBtnContainer]}
        >
          <Button
            onPress={() => onChangeMarketing()}
            title={'Save'}
            disabled={isInitialDisable}
          />
        </View>
      </View>
    </TitleWithBackWhiteBgLayout>
  );
};

export default MarketingConsentScreen;
