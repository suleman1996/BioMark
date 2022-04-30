import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import ModalButtonComponent from 'components/higher-order/modal-button';
import { goBack } from 'services/nav-ref';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalColors } from 'utils/theme/global-colors';
import ButtonWithShadowContainer from 'components/base/button-with-shadow-container/index';
import TitleWithBackLayout from 'components/layouts/back-with-title/index';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import AsthmaModal from './modals/asthma';
import CancerModal from './modals/cancer';
import DiabetesModal from './modals/diabetes';
import GoutModal from './modals/gout';
import HighBloodPressureModal from './modals/high-blood-pressure';
import HighCholesterolModal from './modals/high-cholesterol';
import OthersModal from './modals/others';
import DropdownMenuComponent from 'components/base/dropdown-menu';

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

  const [isCholesterolModal, setIsCholesterolModal] = useState(false);
  const [isBloodPressureModal, setIsBloodPressureModal] = useState(false);
  const [isDiabetesModal, setIsDiabetesModal] = useState(false);
  const [isAsthmaModal, setIsAsthmaModal] = useState(false);
  const [isGoutModal, setIsGoutModal] = useState(false);
  const [isCancerModal, setIsCancerModal] = useState(false);
  const [isOtherModal, setIsOtherModal] = useState(false);
  const [isNoneModal, setIsNoneModal] = useState(false);

  const onNonePress = () => {
    setIsCholesterolModal(false);
    setIsBloodPressureModal(false);
    setIsDiabetesModal(false);
    setIsAsthmaModal(false);
    setIsGoutModal(false);
    setIsCancerModal(false);
    setIsOtherModal(false);
    setIsNoneModal(true);
  };

  return (
    <TitleWithBackLayout title="Medical History">
      {/* modals */}
      <HighCholesterolModal
        isVisible={isCholesterolModal}
        setIsVisible={setIsCholesterolModal}
      />
      <HighBloodPressureModal
        isVisible={isBloodPressureModal}
        setIsVisible={setIsBloodPressureModal}
      />
      <DiabetesModal
        isVisible={isDiabetesModal}
        setIsVisible={setIsDiabetesModal}
      />
      <AsthmaModal isVisible={isAsthmaModal} setIsVisible={setIsAsthmaModal} />
      <GoutModal isVisible={isGoutModal} setIsVisible={setIsGoutModal} />
      <CancerModal isVisible={isCancerModal} setIsVisible={setIsCancerModal} />
      <OthersModal isVisible={isOtherModal} setIsVisible={setIsOtherModal} />

      {/* modals */}
      <ScrollView style={styles.container}>
        <DropdownMenuComponent
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
        <View style={styles.rowContainer}>
          <ModalButtonComponent
            title="High Cholesterol"
            isModal={isCholesterolModal}
            setIsModal={setIsCholesterolModal}
          />
          <ModalButtonComponent
            title="High Blood Pressure"
            isModal={isBloodPressureModal}
            setIsModal={setIsBloodPressureModal}
          />
        </View>
        <View style={styles.rowContainer}>
          <ModalButtonComponent
            title="Diabetes"
            isModal={isDiabetesModal}
            setIsModal={setIsDiabetesModal}
          />
          <ModalButtonComponent
            title="Asthma"
            isModal={isAsthmaModal}
            setIsModal={setIsAsthmaModal}
          />
        </View>
        <View style={styles.rowContainer}>
          <ModalButtonComponent
            title="Gout"
            isModal={isGoutModal}
            setIsModal={setIsGoutModal}
          />
          <ModalButtonComponent
            title="Cancer"
            isModal={isCancerModal}
            setIsModal={setIsCancerModal}
          />
        </View>
        <View style={styles.rowContainer}>
          <ModalButtonComponent
            title="Others"
            isModal={isOtherModal}
            setIsModal={setIsOtherModal}
          />
          <ModalButtonComponent
            title="None"
            isModal={isNoneModal}
            setIsModal={onNonePress}
          />
        </View>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.white,
    flex: 1,
    paddingHorizontal: widthToDp(7),
    paddingTop: heightToDp(3),
  },
  label: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
    marginTop: heightToDp(3),
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: heightToDp(2),
    justifyContent: 'space-between',
    marginBottom: heightToDp(0.5),
  },
});
