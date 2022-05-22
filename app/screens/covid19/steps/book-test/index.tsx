import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';
import StepIndicator from 'react-native-step-indicator';
import ButtonComponent from 'components/base/button';
import ExisitingBookingForDependent from 'components/ui/covid-test-book-for-existing/index';

type Props = {};

const labels = ['Booking', 'Payment', 'Confirmation'];

const BookCovidTest = (props: Props) => {
  const {} = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [isExistingBtn, setIsExisting] = useState(true);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.stepContainer}>
          <StepIndicator
            stepCount={3}
            currentPosition={0}
            customStyles={styles.stepIndicator}
            labels={labels}
          />
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {isExistingBtn ? (
            <View>
              <ExisitingBookingForDependent />
            </View>
          ) : null}
          <ButtonComponent
            onPress={() => {
              setIsExisting(true);
            }}
            title={'Add Existing Dependent'}
          />
          <ButtonComponent
            onPress={undefined}
            marginTop={1}
            title={'Add New Dependent'}
          />
          <ButtonComponent
            onPress={undefined}
            marginTop={1}
            title={'Add Self'}
          />
          <View style={styles.bottom2Btns}>
            <Pressable style={[styles.btn, { backgroundColor: colors.white }]}>
              <Text style={[styles.btnText]}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.btn}>
              <Text style={[styles.btnText2]}>Next</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default BookCovidTest;
