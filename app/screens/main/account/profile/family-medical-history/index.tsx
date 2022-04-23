import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import ModalButtonComponent from '../../../../../components/higher-order/modal-button';
import {goBack} from '../../../../../services/nav-ref';
import {
  heightToDp,
  widthToDp,
} from '../../../../../utils/functions/responsive-dimensions';
import {GlobalColors} from '../../../../../utils/theme/global-colors';
import ButtonWithShadowContainer from '../../../../../components/base/button-with-shadow-container/index';
import TitleWithBackLayout from '../../../../../components/layouts/back-with-title/index';
import {responsiveFontSize} from '../../../../../utils/functions/responsive-text';
import {GlobalFonts} from '../../../../../utils/theme/fonts';
import CancerModal from './modals/cancer';
import OthersModal from './modals/others';
const MedicalHistoryScreen = () => {
  const [heartDisease, setHeartDisease] = useState(false);
  const [isCholesterolModal, setIsCholesterolModal] = useState(false);
  const [isStroke, setIsStroke] = useState(false);
  const [isBloodPressureModal, setIsBloodPressureModal] = useState(false);
  const [isDiabetesModal, setIsDiabetesModal] = useState(false);
  const [isCancerModal, setIsCancerModal] = useState(false);
  const [isOtherModal, setIsOtherModal] = useState(false);
  const [isNoneModal, setIsNoneModal] = useState(false);

  const onNonePress = () => {
    setIsCholesterolModal(false);
    setIsBloodPressureModal(false);
    setIsDiabetesModal(false);
    setIsStroke(false);
    setHeartDisease(false);
    setIsCancerModal(false);
    setIsOtherModal(false);
    setIsNoneModal(true);
  };
  const onPressOthers = () => {
    setIsOtherModal(true);
  };
  const onPressCancer = () => {
    setIsCancerModal(true);
  };

  return (
    <TitleWithBackLayout title="Medical History">
      <CancerModal isVisible={isCancerModal} setIsVisible={setIsCancerModal} />
      <OthersModal isVisible={isOtherModal} setIsVisible={setIsOtherModal} />
      <ScrollView style={styles.container}>
        <Text style={styles.label}>
          Have any of your family members been diagnosed with the following
          conditions?
        </Text>
        <View style={styles.rowContainer}>
          <ModalButtonComponent
            title="Heart Disease"
            isModal={heartDisease}
            setIsModal={setHeartDisease}
            drop={false}
          />
          <ModalButtonComponent
            title="Stroke"
            isModal={isStroke}
            setIsModal={setIsStroke}
            drop={false}
          />
        </View>
        <View style={styles.rowContainer}>
          <ModalButtonComponent
            title="High Blood Pressure"
            isModal={isBloodPressureModal}
            setIsModal={setIsBloodPressureModal}
            drop={false}
          />
          <ModalButtonComponent
            title="High Cholesterol"
            isModal={isCholesterolModal}
            setIsModal={setIsCholesterolModal}
            drop={false}
          />
        </View>
        <View style={styles.rowContainer}>
          <ModalButtonComponent
            title="Diabetes"
            isModal={isDiabetesModal}
            setIsModal={setIsDiabetesModal}
            drop={false}
          />
          <ModalButtonComponent
            title="Cancer"
            isModal={isCancerModal}
            setIsModal={onPressCancer}
            drop={true}
          />
        </View>
        <View style={styles.rowContainer}>
          <ModalButtonComponent
            title="Others"
            isModal={isOtherModal}
            setIsModal={onPressOthers}
            drop={true}
          />
          <ModalButtonComponent
            title="None"
            isModal={isNoneModal}
            setIsModal={onNonePress}
            drop={false}
          />
        </View>
      </ScrollView>
      <ButtonWithShadowContainer
        onPress={() => {
          goBack();
        }}
      />
    </TitleWithBackLayout>
  );
};

export default MedicalHistoryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.primaryGray,
    flex: 1,
    paddingHorizontal: widthToDp(4),
    paddingTop: heightToDp(3),
  },
  label: {
    fontSize: responsiveFontSize(16),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
    marginTop: heightToDp(2),
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: heightToDp(2),
    justifyContent: 'space-between',
  },
});
