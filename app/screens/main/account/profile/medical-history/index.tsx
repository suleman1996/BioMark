import { useIsFocused } from '@react-navigation/native';
import { default as useStateRef } from 'react-usestateref';

import GeneralModalButton from 'components/higher-order/general-modal-button';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

// import { ModalButton } from 'components/higher-order';
import { DropdownMenu, ButtonWithShadowContainer } from 'components/base';
import { TitleWithBackLayout } from 'components/layouts';

// import AsthmaModal from './modals/asthma';
// import CancerModal from './modals/cancer';
// import DiabetesModal from './modals/diabetes';
// import GoutModal from './modals/gout';
// import HighBloodPressureModal from './modals/high-blood-pressure';
// import HighCholesterolModal from './modals/high-cholesterol';
// import OthersModal from './modals/others';

import makeStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { goBack } from 'services/nav-ref';
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

const options = [
  { value: '---', label: '---' },
  { value: 'Caucasian', label: 'Caucasian' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'Filpino', label: 'Filpino' },
  { value: 'Indian', label: 'Indian' },
  { value: 'Malay', label: 'Malay' },
  { value: 'Other / NA', label: 'Other / NA' },
];

/* eslint-disable */
const MedicalHistoryScreen = () => {
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
    <TitleWithBackLayout title="Medical History">
      {/* modals */}
      <GeneralModalPage
        isVisible={isGenModalRef.current}
        setIsVisible={onChangeModalState}
        qData={generalModalData}
      />

      {/* modals */}
      <ScrollView style={styles.container}>
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
                ? 'Please select your ethnicity'
                : ''
              : ''
          }
        />
        <Text style={styles.label}>
          Have you ever been diagnosed with any of the following conditions?
        </Text>
        <ScrollView>
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
          goBack();
        }}
        title={'Save & Continue'}
      />
    </TitleWithBackLayout>
  );
};

export default MedicalHistoryScreen;
