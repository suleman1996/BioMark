import { ButtonWithShadowContainer, DropdownMenu } from 'components/base';
import GeneralModalButton from 'components/higher-order/general-modal-button';
import { TitleWithBackLayout } from 'components/layouts';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { goBack } from 'services/nav-ref';
import { IAppState } from 'store/IAppState';
import { MedicalTemplateAttribute } from 'types/api';
import GeneralModalPage from './modals/general-modal';
import { styles } from './styles';

const options = [
  { id: 1, title: '---' },
  { id: 1, title: 'Caucasian' },
  { id: 1, title: 'Chinese' },
  { id: 1, title: 'Filpino' },
  { id: 1, title: 'Indian' },
  { id: 1, title: 'Malay' },
  { id: 1, title: 'Other / NA' },
];

const MedicalHistoryScreen = () => {
  const [dropdownValue, setDropdown] = useState();
  const [isDropdownChanged, setIsDropDownChanged] = useState(false);

  const [isGeneralModal, setIsGeneralModal] = useState(false);
  const [generalModalData, setGeneralModalData] =
    useState<MedicalTemplateAttribute>({});

  const bootstrap = useSelector((state: IAppState) => state.account.bootstrap);
  const medicalHistory = useSelector(
    (state: IAppState) => state.profile?.medicalHistoryUpdate
  );
  useEffect(() => {
    console.log('Bootstrap =======>', bootstrap);
  }, [bootstrap]);

  return (
    <TitleWithBackLayout title="Medical History">
      {/* modals */}
      <GeneralModalPage
        isVisible={isGeneralModal}
        setIsVisible={setIsGeneralModal}
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
                    title={item.name}
                    isModal={isGeneralModal}
                    setIsModal={(value: any) => {
                      setIsGeneralModal(value);
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
          goBack();
        }}
        title={'Save & Continue'}
      />
    </TitleWithBackLayout>
  );
};

export default MedicalHistoryScreen;
