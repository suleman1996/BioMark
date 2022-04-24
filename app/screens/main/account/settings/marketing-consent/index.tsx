import {View, Text} from 'react-native';
import React, { useEffect, useState } from 'react';
import {styles} from './styles';
import TitleWithBackWhiteBgLayout from '../../../../../components/layouts/back-with-title-white-bg';
import CheckBox from '../../../../../components/check-box/check-box';
import {GlobalColors} from '../../../../../utils/theme/globalColors';
import {widthToDp} from '../../../../../utils/functions/responsiveDimentions';
import CheckBoxWithText from '../../../../../components/base/checkbox-with-text';
import MarketingConsentModal from '../../../../../components/ui/marketing-consent-modal';
import ButtonComponent from '../../../../../components/base/button';
import { useDispatch, useSelector } from 'react-redux';
import { settingsService } from '../../../../../services/account-service/settings-service';
import { setMarketing } from '../../../../../store/auth/authActions';
import { IAppState } from '../../../../../store/IAppState';
import ActivityIndicator from '../../../../../components/loader/activity-indicator';
import { goBack } from '../../../../../services/navRef';
type Props = {};

const MarketingConsentScreen = (props: Props) => {
  const dispatch = useDispatch();
  const userMarketing = useSelector(
    (state: IAppState) => state.auth.marketing,
  );

  const [isLoading, setIsLoading] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [isMModal, setIsMModal] = useState(false);

  const getUserMarketing = () =>{
    settingsService
      .getMarketing()
      .then(res => {
        dispatch(setMarketing(res));
      })
      .catch(err => {});
  }

  useEffect(() => {
    getUserMarketing();
  }, []);


  useEffect(() => {
    setIsChecked(userMarketing.enable);
  }, [userMarketing]);

  const onChangeMarketing = () => {
    setIsMModal(false);
    setIsLoading(true);
    settingsService.saveMarketing(isChecked).then(res => {
      getUserMarketing();
      goBack();
    }).catch(err => {

    }).finally(() => {
      setIsLoading(false);
    });
  }

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
            if (!value) {
              setIsMModal(true);
            } else {
              setIsChecked(value);
            }
          }}
        />
        <View style={styles.bottomBtnContainer}>
          <ButtonComponent
            onPress={() => onChangeMarketing()}
            title={'Save'}
            disabled={false}
          />
        </View>
      </View>
    </TitleWithBackWhiteBgLayout>
  );
};

export default MarketingConsentScreen;
