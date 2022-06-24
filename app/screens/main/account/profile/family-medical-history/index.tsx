import { useIsFocused } from '@react-navigation/native';
// import { ModalButton } from 'components/higher-order';
import { ButtonWithShadowContainer } from 'components/base';
import GeneralModalButton from 'components/higher-order/general-modal-button';
import { TitleWithBackLayout } from 'components/layouts';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { default as useStateRef } from 'react-usestateref';

import { profileServices } from 'services/profile-services';
import { IAppState } from 'store/IAppState';
import {
  addFamilyMedicalHistoryUpdate,
  getAndAddMedicalHistoryDataR,
} from 'store/profile/profile-actions';
import { MedicalTemplateAttribute } from 'types/api';
import { logNow } from 'utils/functions/log-binder';
import { useNavigation, useRoute } from '@react-navigation/native';
import GeneralModalPage from './modals/general-modal';

import makeStyles from './styles';
import SCREENS from 'navigation/constants/index';

/* eslint-disable */
const MedicalHistoryScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const route = useRoute();
  const navigation = useNavigation();

  const focused = useIsFocused();
  const dispatch = useDispatch();
  const [dropdownValue, setDropdown] = useState<any>();
  const [isDropdownChanged, setIsDropDownChanged] = useState(false);

  const [noneId, setNoneId] = useState();
  useEffect(() => {
    const id: any = bootstrap?.attributes?.medical_template?.family?.find(
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
  const familyMedicalHistory = useSelector(
    (state: IAppState) => state.profile?.familyMedicalHistoryUpdate
  );

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
      .saveAllFamilyMedicalHistoryPersonalData({
        medical_history: {
          conditions: familyMedicalHistory,
        },
      })
      .then((res) => {
        logNow('save medical personal ', res);
      })
      .catch((err) => {
        logNow('save medical data error', err);
      });
  };

  const onChangeModalState = () => {
    // setIsGeneralModal(!isGeneralModal);
    setIsGeneralModal(!isGenModalRef.current);
  };

  return (
    <TitleWithBackLayout title={t('pages.medicalHistory.familyTitle')}>
      {/* modals */}
      <GeneralModalPage
        isVisible={isGenModalRef.current}
        setIsVisible={onChangeModalState}
        qData={generalModalData}
      />

      {/* modals */}
      <ScrollView style={styles.container}>
        <Text style={styles.label}>
          {t('pages.medicalHistory.familyDiagnosis')}
        </Text>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.rowContainer}>
            {bootstrap?.attributes?.medical_template?.family?.map(
              (item: MedicalTemplateAttribute, index: number) => (
                <View key={index}>
                  <GeneralModalButton
                    isSelected={familyMedicalHistory.some(
                      (elem) =>
                        elem.condition_id === item.id && elem.has_condition
                    )}
                    drop={
                      item.name !== 'None' && !item.content?.toggle
                        ? true
                        : false
                    }
                    title={item.name}
                    isToggle={item.content?.toggle}
                    isModal={isGeneralModal}
                    setIsModal={async (value: any) => {
                      if (item.name == 'None') {
                        await dispatch(
                          addFamilyMedicalHistoryUpdate([
                            {
                              condition_id: item.id,
                              medical_type: 'family',
                              has_condition: true,
                              name: 'None',
                            },
                          ])
                        );
                        return;
                      } else if (item.content.toggle) {
                        let updatedItems = [];
                        const d = familyMedicalHistory.find(
                          (el) =>
                            el.condition_id === item.id && el.has_condition
                        );
                        const d2 = familyMedicalHistory.find(
                          (el) =>
                            el.condition_id === item.id &&
                            el.has_condition == false
                        );
                        if (d) {
                          logNow('Already Item');
                          updatedItems = familyMedicalHistory
                            ?.map((el) =>
                              el.condition_id === item.id
                                ? {
                                    ...el,
                                    condition_id: item.id,
                                    medical_type: 'family',
                                    has_condition: false,
                                  }
                                : el
                            )
                            .filter((item) => item.condition_id !== noneId);
                          await dispatch(
                            addFamilyMedicalHistoryUpdate(updatedItems)
                          );
                        } else if (d2) {
                          logNow('Already Item2');
                          updatedItems = familyMedicalHistory
                            ?.map((el) =>
                              el.condition_id === item.id
                                ? {
                                    ...el,
                                    condition_id: item.id,
                                    medical_type: 'family',
                                    has_condition: true,
                                  }
                                : el
                            )
                            .filter((item) => item.condition_id !== noneId);
                          await dispatch(
                            addFamilyMedicalHistoryUpdate(updatedItems)
                          );
                        } else {
                          updatedItems.push({
                            condition_id: item.id,
                            medical_type: 'family',
                            has_condition: true,
                          });
                          const dData = [
                            ...familyMedicalHistory,
                            ...updatedItems,
                          ].filter((item) => item.condition_id !== noneId);
                          logNow(dData);
                          await dispatch(addFamilyMedicalHistoryUpdate(dData));
                        }
                        return;
                      } else {
                        const updated = familyMedicalHistory.filter(
                          (item) => item.condition_id !== noneId
                        );
                        await dispatch(addFamilyMedicalHistoryUpdate(updated));
                      }
                      logNow('filter Data', familyMedicalHistory);
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
