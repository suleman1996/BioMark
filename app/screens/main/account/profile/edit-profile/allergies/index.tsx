import { useIsFocused } from '@react-navigation/native';
// import { ModalButton } from 'components/higher-order';
import { ButtonWithShadowContainer } from 'components/base';
import GeneralModalButton from 'components/higher-order/general-modal-button';
import { TitleWithBackLayout } from 'components/layouts';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { RadioButton, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { default as useStateRef } from 'react-usestateref';
import { goBack } from 'services/nav-ref';
import { profileServices } from 'services/profile-services';
import { IAppState } from 'store/IAppState';
import {
  addAllergiesConditionsUpdate,
  addAllergiesMedicalHistoryUpdate,
  getAndAddMedicalHistoryDataR,
} from 'store/profile/profile-actions';
import { AlergiesRequestBody, MedicalTemplateAttribute } from 'types/api';
import { logNow } from 'utils/functions/log-binder';
import GeneralModalPage from './modals/general-modal';
// import AsthmaModal from './modals/asthma';
// import CancerModal from './modals/cancer';
// import DiabetesModal from './modals/diabetes';
// import GoutModal from './modals/gout';
// import HighBloodPressureModal from './modals/high-blood-pressure';
// import HighCholesterolModal from './modals/high-cholesterol';
// import OthersModal from './modals/others';
import { makeStyles } from './styles';

/* eslint-disable */
const AllergiesScreen = () => {
  const { colors }: any = useTheme();
  const styles = makeStyles(colors);

  const focused = useIsFocused();
  const dispatch = useDispatch();
  const [dropdownValue, setDropdown] = useState<any>();
  const [isDropdownChanged, setIsDropDownChanged] = useState(false);
  const [value, setValue] = useState<any>(1);
  const [isAllergy, setIsAllergy] = useState('');

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

  const [generalModalData, setGeneralModalData] = useState<string>('');

  const bootstrap = useSelector((state: IAppState) => state.account.bootstrap);

  // medical history data from redux

  const allergiesMedicalHistory = useSelector(
    (state: IAppState) => state.profile?.allergiesMedicalHistoryUpdate
  );

  useEffect(() => {
    const hasAller = allergiesMedicalHistory.has_allergy;
    setValue(
      hasAller == 0
        ? 'No'
        : hasAller == 1
        ? 'Yes'
        : hasAller == 2
        ? 'Not Sure'
        : 'No'
    );
  }, [allergiesMedicalHistory]);

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

  const changeAllergiesStatus = async (val: string) => {
    let copyObj: AlergiesRequestBody = allergiesMedicalHistory;
    copyObj.has_allergy = val == 'Yes' ? true : val == 'Not Sure' ? 2 : 0;
    await dispatch(addAllergiesMedicalHistoryUpdate(copyObj));
  };

  useEffect(() => {}, [value]);

  // save data on save button press
  const saveDataonSavePress = () => {
    profileServices
      .saveAllergiesMedicalHistoryData({
        medical_history: allergiesMedicalHistory,
      })
      .then((res) => {
        logNow('save alergies data ', res);
      })
      .catch((err) => {
        logNow('save allergies data error', err);
      });
  };

  const onChangeModalState = () => {
    // setIsGeneralModal(!isGeneralModal);
    setIsGeneralModal(!isGenModalRef.current);
  };

  const RadioGroupComponent = ({ item }: any) => {
    return (
      <>
        <Text style={styles.label}>{item.question}</Text>
        <RadioButton.Group
          onValueChange={async (val) => {
            setValue(val), setIsAllergy('0');
            changeAllergiesStatus(val);
          }}
          value={value}
        >
          {item.options.map((item2: any, index2: number) => (
            <TouchableOpacity
              key={index2}
              onPress={async () => {
                setValue(item2), setIsAllergy('0');
                changeAllergiesStatus(item2);
              }}
              style={[
                styles.radioContainer,
                {
                  backgroundColor: value == item2 ? colors.navyblue : null,
                },
              ]}
            >
              <RadioButton
                color={value == item2 ? colors.white : colors.darkPrimary}
                value={item2}
              />
              <Text
                style={[
                  styles.radioText,
                  { color: value == item2 ? '#ffffff' : '#000000' },
                ]}
              >
                {item2}
              </Text>
            </TouchableOpacity>
          ))}
        </RadioButton.Group>
      </>
    );
  };

  return (
    <TitleWithBackLayout title="Allergies">
      {/* modals */}
      <GeneralModalPage
        isVisible={isGenModalRef.current}
        setIsVisible={onChangeModalState}
        qData={generalModalData}
      />

      {/* modals */}
      <ScrollView contentContainerStyle={styles.container}>
        {bootstrap?.attributes?.medical_template?.allergy?.map(
          (item: MedicalTemplateAttribute, index: number) =>
            item?.content?.fields.map((item2: any, index2: number) =>
              item2.type == 'radio' ? (
                <View key={item2}>
                  <RadioGroupComponent item={item2} />
                </View>
              ) : null
            )
        )}
        {allergiesMedicalHistory.has_allergy == 1 ? (
          <Text style={styles.label}>What are you allergic to?</Text>
        ) : null}
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.rowContainer}>
            {allergiesMedicalHistory.has_allergy == 1 &&
              bootstrap?.attributes?.medical_template?.allergy?.map(
                (item: MedicalTemplateAttribute, index: number) =>
                  item?.content?.fields.map((item2: any, index2: number) =>
                    item2.type == 'multi_select'
                      ? item2.options.map((item3: any, index3: number) => (
                          <View key={index2}>
                            {item3 == 'Not Sure' ? (
                              <GeneralModalButton
                                isSelected={
                                  allergiesMedicalHistory?.conditions?.find(
                                    (item: any) => item.allergy_to == item3
                                  )?.has_condition || false
                                }
                                setIsModal={async () => {
                                  await dispatch(
                                    addAllergiesConditionsUpdate([
                                      {
                                        has_condition: true,
                                        allergy_to: 'Not Sure',
                                        allergy_type: '',
                                      },
                                    ])
                                  );
                                }}
                                title={item3}
                                isModal={isGeneralModal}
                              />
                            ) : (
                              <GeneralModalButton
                                isSelected={
                                  allergiesMedicalHistory?.conditions?.find(
                                    (item: any) => item.allergy_to == item3
                                  )?.has_condition || false
                                }
                                title={item3}
                                drop={true}
                                setIsModal={() => {
                                  setGeneralModalData(item3);
                                  onChangeModalState();
                                }}
                                isModal={isGeneralModal}
                              />
                            )}
                          </View>
                        ))
                      : null
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
        title={'Save'}
      />
    </TitleWithBackLayout>
  );
};

export default AllergiesScreen;
