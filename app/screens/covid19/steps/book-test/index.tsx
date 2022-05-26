import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';
import StepIndicator from 'react-native-step-indicator';
import ButtonComponent from 'components/base/button';
import ExisitingBookingForDependent from 'components/ui/covid-test-book-for-existing/index';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants/index';
import AddDependantForm from 'screens/main/account/dependants/add-depandant-form';
import CovidTestBookForPersonal from './../../../../components/ui/covid-test-book-for-personal/index';
import TopBarWithBackText from './../../../../components/higher-order/topBarWithBackText/index';
import CancelBookingTestModal from './../../../../components/ui/cancelBookingTestModal/index';

type Props = {};

const labels = ['Booking', 'Payment', 'Confirmation'];

const BookCovidTest = (props: Props) => {
  const {} = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [isExistingBtn, setIsExisting] = useState(false);
  const [isDependantAdd, setIsDependantAdd] = useState(false);
  const [isPersonal, setIsPersonal] = useState(false);

  const [isCancelModal, setIsCancelModal] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <CancelBookingTestModal
          setIsVisible={setIsCancelModal}
          isVisible={isCancelModal}
        />
        <View style={styles.stepContainer}>
          <TopBarWithBackText
            onBackPress={() => {
              setIsCancelModal(true);
            }}
          />
          <StepIndicator
            stepCount={3}
            currentPosition={0}
            customStyles={styles.stepIndicator}
            labels={labels}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.scrollView}
        >
          {isExistingBtn && !isDependantAdd ? (
            <View>
              <ExisitingBookingForDependent />
            </View>
          ) : null}

          {isPersonal && !isDependantAdd && !isExistingBtn ? (
            <View>
              <CovidTestBookForPersonal />
            </View>
          ) : null}

          <ButtonComponent
            onPress={() => {
              setIsExisting(true);
            }}
            title={'Add Existing Dependent'}
          />

          <ButtonComponent
            onPress={() => {
              setIsDependantAdd(true);
            }}
            marginTop={1}
            disabled={isDependantAdd}
            title={'Add New Dependent'}
          />
          {/* Add Dependant Form */}
          {isDependantAdd ? (
            <AddDependantForm
              callMe={() => {
                setIsDependantAdd(false);
              }}
            />
          ) : null}
          <ButtonComponent
            onPress={() => {
              setIsPersonal(true);
            }}
            marginTop={1}
            title={'Add Self'}
          />
          <View style={{ marginTop: heightToDp(12) }} />
          <View style={styles.bottom2Btns}>
            <Pressable style={[styles.btn, { backgroundColor: colors.white }]}>
              <Text style={[styles.btnText]}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
                  screen: SCREENS.PAYMENT_STEP,
                })
              }
              style={styles.btnEnable}
            >
              <Text style={[styles.btnText2]}>Next</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default BookCovidTest;
