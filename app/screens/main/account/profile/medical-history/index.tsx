import { useIsFocused } from '@react-navigation/native';
import { default as useStateRef } from 'react-usestateref';

import GeneralModalButton from 'components/higher-order/general-modal-button';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { Tip } from 'react-native-tip';

import { DropdownMenu, ButtonWithShadowContainer } from 'components/base';
import { TitleWithBackLayout } from 'components/layouts';

import makeStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';

import { IAppState } from 'store/IAppState';
import { MedicalTemplateAttribute } from 'types/api';
import GeneralModalPage from './modals/general-modal';
import {
  getAndAddMedicalHistoryDataR,
  getUserProfileData,
} from 'store/profile/profile-actions';
import { profileServices } from 'services/profile-services';
import { logNow } from 'utils/functions/log-binder';
import { addMedicalHistoryUpdate } from 'store/profile/profile-actions';
import { userService } from 'services/user-service/user-service';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import SCREENS from 'navigation/constants/index';

/* eslint-disable */
const MedicalHistoryScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();

  const options = [
    { value: '---', label: '---' },
    { value: 'Caucasian', label: t('common.ethnicities.caucasian') },
    { value: 'Chinese', label: t('common.ethnicities.chinese') },
    { value: 'Filpino', label: t('common.ethnicities.filipino') },
    { value: 'Indian', label: t('common.ethnicities.indian') },
    { value: 'Malay', label: t('common.ethnicities.malay') },
    { value: 'Other / NA', label: t('common.ethnicities.na') },
  ];
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const focused = useIsFocused();
  const dispatch = useDispatch();
  const [dropdownValue, setDropdown] = useState<any>();
  const [isDropdownChanged, setIsDropDownChanged] = useState(false);

  const [noneId, setNoneId] = useState();

  useEffect(() => {
    const id: any = bootstrap?.attributes?.medical_template?.personal?.find(
      (item) => item.name === 'None'
    )?.id;
    setNoneId(id);
  }, []);

  const [isGeneralModal, setIsGeneralModal, isGenModalRef] = useStateRef(false);
  useEffect(() => {
    setIsGeneralModal(isGenModalRef.current);
    logNow(isGenModalRef.current);
  }, [isGenModalRef.current]);

  const [generalModalData, setGeneralModalData] =
    useState<MedicalTemplateAttribute>({});

  const bootstrap = useSelector((state: IAppState) => state.account.bootstrap);

  // medical history data from redux
  const medicalHistory = useSelector(
    (state: IAppState) => state.profile?.medicalHistoryUpdate
  );

  // medical history data from redux
  const userDetails = useSelector(
    (state: IAppState) => state.profile?.userProfile
  );
  useEffect(() => {
    setDropdown(userDetails?.ethnic);
    logNow(userDetails?.ethnic);
  }, [userDetails]);

  // getData when on focused
  const getOnFocued = async () => {
    await dispatch(getAndAddMedicalHistoryDataR());
  };
  useEffect(() => {
    getOnFocued();
  }, [focused]);

  // save data on save button press
  const saveDataonSavePress = () => {
    profileServices
      .saveAllMedicalHistoryPersonalData({
        medical_history: {
          ethnic: dropdownValue,
          conditions: medicalHistory,
        },
      })
      .then((res) => {
        logNow('save medical personal ', res);
      })
      .catch((err) => {
        logNow('save medical data error', err);
      });
    logNow(dropdownValue);
    userService
      .updateUserEthnic(dropdownValue)
      .then(async (res) => {
        await dispatch(getUserProfileData());
      })
      .catch((err) => {
        logNow(err);
      });
  };

  const onChangeModalState = () => {
    setIsGeneralModal(!isGeneralModal);
    setIsGeneralModal(isGenModalRef.current);
  };

  return (
    <TitleWithBackLayout title={t('pages.medicalHistory.title')}>
      {/* modals */}
      <GeneralModalPage
        isVisible={isGenModalRef.current}
        setIsVisible={onChangeModalState}
        qData={generalModalData}
      />

      {/* modals */}
      <ScrollView style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.label}>
            {t('pages.medicalHistory.ethnicity')}
          </Text>
          <View style={{ marginTop: heightToDp(3.8) }}>
            <Tip
              //title=""
              body={t('pages.medicalHistory.ethnicityHint')}
              bodyStyle={{ color: '#fff' }}
              tipContainerStyle={{ backgroundColor: '#2f6b64', width: '60%' }}
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
        <DropdownMenu
          options={options}
          selectedValue={dropdownValue}
          onValueChange={(value: any) => {
            setDropdown(value);
            setIsDropDownChanged(true);
          }}
          error={
            isDropdownChanged
              ? dropdownValue === '---'
                ? t('pages.medicalHistory.errors.ethnicity')
                : ''
              : ''
          }
        />
        <Text style={styles.label}>{t('pages.medicalHistory.diagnosis')}</Text>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.rowContainer}>
            {bootstrap?.attributes?.medical_template?.personal?.map(
              (item: MedicalTemplateAttribute, index: number) => (
                <View key={index}>
                  <GeneralModalButton
                    isSelected={medicalHistory.some(
                      (elem) =>
                        elem.condition_id === item.id && elem.has_condition
                    )}
                    drop={item.name !== 'None' ? true : false}
                    title={item.name}
                    isModal={isGeneralModal}
                    setIsModal={async (value: any) => {
                      if (item.name == 'None') {
                        await dispatch(
                          addMedicalHistoryUpdate([
                            {
                              condition_id: item.id,
                              medical_type: 'personal',
                              has_condition: true,
                              name: 'None',
                            },
                          ])
                        );
                        return;
                      } else {
                        const updated = medicalHistory.filter(
                          (item) => item.condition_id !== noneId
                        );
                        await dispatch(addMedicalHistoryUpdate(updated));
                      }
                      logNow('filter Data', medicalHistory);
                      onChangeModalState();
                      setGeneralModalData(item);
                    }}
                  />
                </View>
              )
            )}
          </View>
        </ScrollView>
      </ScrollView>
      <ButtonWithShadowContainer
        onPress={() => {
          saveDataonSavePress();

          route?.params?.back
            ? navigation.navigate(SCREENS.HOME)
            : navigation.goBack();
        }}
        title={t('pages.medicalHistory.continue')}
      />
    </TitleWithBackLayout>
  );
};

export default MedicalHistoryScreen;
