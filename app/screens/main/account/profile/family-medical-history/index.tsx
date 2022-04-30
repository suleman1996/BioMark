import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import ModalButtonComponent from 'components/higher-order/modal-button';
import { goBack } from 'services/nav-ref';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { GlobalColors } from 'utils/theme/global-colors';
import ButtonWithShadowContainer from 'components/base/button-with-shadow-container/index';
import TitleWithBackLayout from 'components/layouts/back-with-title/index';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import CancerModal from './modals/cancer';
import OthersModal from './modals/others';
import ActivityIndicator from 'components/loader/activity-indicator';
import { useIsFocused } from '@react-navigation/native';
import { userService } from 'services/user-service/user-service';
import { showMessage } from 'react-native-flash-message';

const MedicalHistoryScreen = () => {
  const isFocus = useIsFocused();

  const [heartDisease, setHeartDisease] = useState(false);
  const [isCholesterolModal, setIsCholesterolModal] = useState(false);
  const [isStroke, setIsStroke] = useState(false);
  const [isBloodPressureModal, setIsBloodPressureModal] = useState(false);
  const [isDiabetesModal, setIsDiabetesModal] = useState(false);
  const [isCancerModal, setIsCancerModal] = useState(false);
  const [isOtherModal, setIsOtherModal] = useState(false);
  const [isNoneModal, setIsNoneModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [history] = useState([]);

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

  const getFamilyMedicalHistory = async () => {
    try {
      setIsLoading(true);
      const result = await userService.getFamilyMedicalHistory();
      console.log('here are the medical history family ', result.data);
      result?.data?.family.map(
        (item) => (
          item.condition_id == 9 && setHeartDisease(true),
          item.condition_id == 10 && setIsStroke(true),
          item.condition_id == 11 && setIsBloodPressureModal(true),
          item.condition_id == 12 && setIsCholesterolModal(true),
          item.condition_id == 13 && setIsDiabetesModal(true)
        )
      );
      heartDisease &&
        history.push({
          condition_id: 9,
          medical_type: 'family',
          has_condition: true,
        });

      isStroke &&
        history.push({
          condition_id: 10,
          medical_type: 'family',
          has_condition: true,
        });

      isBloodPressureModal &&
        history.push({
          condition_id: 11,
          medical_type: 'family',
          has_condition: true,
        });

      isCholesterolModal &&
        history.push({
          condition_id: 12,
          medical_type: 'family',
          has_condition: true,
        });

      isDiabetesModal &&
        history.push({
          condition_id: 13,
          medical_type: 'family',
          has_condition: true,
        });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log('Error ', error);
      if (error.errMsg.status == '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error.errMsg.status == false) {
        showMessage({
          message: error.errMsg.data.error,
          type: 'danger',
        });
      } else {
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
      }
    }
  };

  const createFamilyMedicalHistory = async () => {
    try {
      setIsLoading(true);
      const result = await userService.createFamilyMedicalHistory(history);
      console.log('here are the medical history family ', result.data);
      goBack();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log('Error ', error);
      if (error.errMsg.status == '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error.errMsg.status == false) {
        showMessage({
          message: error.errMsg.data.error,
          type: 'danger',
        });
      } else {
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
      }
    }
  };

  useEffect(() => {
    getFamilyMedicalHistory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocus]);

  return (
    <TitleWithBackLayout title="Medical History">
      <ActivityIndicator visible={isLoading} />
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
            history={history}
            condition_id={9}
          />
          <ModalButtonComponent
            title="Stroke"
            isModal={isStroke}
            setIsModal={setIsStroke}
            drop={false}
            history={history}
            condition_id={10}
          />
        </View>
        <View style={styles.rowContainer}>
          <ModalButtonComponent
            title="High Blood Pressure"
            isModal={isBloodPressureModal}
            setIsModal={setIsBloodPressureModal}
            drop={false}
            history={history}
            condition_id={11}
          />
          <ModalButtonComponent
            title="High Cholesterol"
            isModal={isCholesterolModal}
            setIsModal={setIsCholesterolModal}
            drop={false}
            history={history}
            condition_id={12}
          />
        </View>
        <View style={styles.rowContainer}>
          <ModalButtonComponent
            title="Diabetes"
            isModal={isDiabetesModal}
            setIsModal={setIsDiabetesModal}
            drop={false}
            history={history}
            condition_id={13}
          />
          <ModalButtonComponent
            title="Cancer"
            isModal={isCancerModal}
            setIsModal={onPressCancer}
            history={history}
            drop={true}
          />
        </View>
        <View style={styles.rowContainer}>
          <ModalButtonComponent
            title="Others"
            isModal={isOtherModal}
            setIsModal={onPressOthers}
            history={history}
            drop={true}
          />
          <ModalButtonComponent
            title="None"
            isModal={isNoneModal}
            setIsModal={onNonePress}
            history={history}
            drop={false}
          />
        </View>
      </ScrollView>
      <ButtonWithShadowContainer
        onPress={() => {
          createFamilyMedicalHistory();
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
    paddingHorizontal: 15,
    paddingTop: heightToDp(3),
  },
  label: {
    fontSize: responsiveFontSize(16),
    fontFamily: GlobalFonts.semiBold,
    color: GlobalColors.darkPrimary,
    marginTop: heightToDp(2),
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: heightToDp(2),
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
});
