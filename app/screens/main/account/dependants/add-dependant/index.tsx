import ButtonComponent from 'components/base/button';
import DateTimePickerModalComponent from 'components/base/date-time-picker-modal';
import InputWithLabel from 'components/base/input-with-label';
import PhoneNumberWithLabel from 'components/base/phone-with-label/index';
import BoxSelector from 'components/higher-order/box-selector';
import RelationMenu from 'components/higher-order/relation-menu';
import ActivityIndicator from 'components/loader/activity-indicator';
import { Regex } from 'constants/regex';
import { format } from 'date-fns';
import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { dependentService } from 'services/account-service/dependent-service';
import { goBack } from 'services/nav-ref';
import { getAllDependents } from 'store/account/account-actions';
import { dateFormat } from 'utils/functions/date-format';
import { logNow } from 'utils/functions/log-binder';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';
import { GlobalStyles } from 'utils/theme/global-styles';
import * as Yup from 'yup';
import { DependentTypeEnum } from '../../../../../enum/DependentTypeEnum';
import { GenderEnum } from '../../../../../enum/GenderEnum';

const AddDependantScreen = () => {
  const formikRef = useRef<any>();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [countryCode, setCountryCode] = useState('MY');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+60');

  const AddDependentSchema = Yup.object({
    first_name: Yup.string()
      .matches(/^[A-Za-z ]*$/, 'Please enter valid first name')
      .required('Firstname is required'),
    last_name: Yup.string()
      .matches(/^[A-Za-z ]*$/, 'Please enter valid last name')
      .required('Firstname is required'),
    document_type: Yup.string().required(''),
    dependent_type_id: Yup.string().required(''),
    id_number: Yup.string()
      .matches(Regex.numAndString, 'Enter valid NRIC / Passport')
      .required('NRIC / Passport is required'),
    // birth_date: Yup.string().required(''),
    email: Yup.string()
      .email('Enter valid email address')
      .required('Email is required'),
    phone_number: Yup.string()
      .matches(Regex.numberReg, 'Enter valid phone number')
      .required('Please provide your phone number'),
  });

  const onSubmit = () => {
    const {
      first_name,
      last_name,
      document_type, //Either 'id_card' or 'passport'
      dependent_type_id, //From get dependent types
      id_number,
      birth_date,
      email,
      phone_number,
      gender_id, // 1 = Male, 2 = Female, 3 = Others
    } = formikRef.current.values;
    logNow({
      first_name,
      last_name,
      document_type, //Either 'id_card' or 'passport'
      dependent_type_id, //From get dependent types
      id_number,
      birth_date: dateFormat(birth_date),
      email,
      phone_number: `+${selectedCountryCode}${phone_number}`,
      gender_id, // 1 = Male, 2 = Female, 3 = Others
      country_code: countryCode,
      country_phone_code: `+${selectedCountryCode}`,
    });
    const pN = `${selectedCountryCode}${phone_number}`;
    const cPC = `+${selectedCountryCode}`;
    const dob = dateFormat(birth_date);
    setIsLoading(true);
    dependentService
      .createDependent(
        first_name,
        last_name,
        document_type,
        dependent_type_id,
        id_number,
        dob,
        email,
        pN,
        gender_id,
        countryCode,
        cPC
      )
      .then((res) => {
        logNow(res);
      })
      .catch((err) => {
        logNow(err);
      })
      .finally(async () => {
        setIsLoading(false);
        await dispatch(getAllDependents());
        goBack();
      });
    formikRef.current.submitForm();
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={isLoading} />
      <View style={styles.cardContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: heightToDp(10) }}
        >
          <Text style={styles.headerText}>Enter your Dependant Details</Text>
          <Formik
            innerRef={formikRef}
            initialValues={{
              first_name: '',
              last_name: '',
              document_type: '',
              dependent_type_id: '',
              id_number: '',
              birth_date: format(new Date(1990, 1, 1), 'MM/dd/yyyy'),
              email: '',
              phone_number: '',
              gender_id: 1,
            }}
            onSubmit={() => {
              logNow('Hello');
            }}
            validationSchema={AddDependentSchema}
          >
            {({
              handleChange,
              // handleSubmit,
              // setFieldTouched,
              errors,
              values,
              // isSubmitting,
              isValid,
              setFieldValue,
              // touched,
            }) => (
              <>
                <InputWithLabel
                  label="First Name"
                  placeholder={''}
                  onChange={handleChange('first_name')}
                  value={values.first_name}
                  error={errors.first_name}
                />
                <InputWithLabel
                  label="Last Name"
                  placeholder={''}
                  onChange={handleChange('last_name')}
                  value={values.last_name}
                  error={errors.last_name}
                />
                <PhoneNumberWithLabel
                  label="Mobile Number"
                  placeholder={''}
                  disabled={false}
                  number={values.phone_number}
                  setPhoneNumber={(e: any) => {
                    setFieldValue('phone_number', e);
                  }}
                  countryCode={countryCode}
                  error={errors.phone_number}
                  setCountryCode={setCountryCode}
                  setSelectCountryCode={setSelectedCountryCode}
                />
                <InputWithLabel
                  placeholder="E.g. Sample@email.com"
                  label="Email"
                  onChange={handleChange('email')}
                  value={values.email}
                  error={errors.email}
                />
                <Text style={styles.label}>Date of Birth</Text>
                <DateTimePickerModalComponent
                  date={values.birth_date}
                  setDate={(e: any) => setFieldValue('birth_date', e)}
                />

                <InputWithLabel
                  label="NRIC /Passport Number"
                  placeholder={''}
                  onChange={handleChange('id_number')}
                  value={values.id_number}
                  error={errors.id_number}
                />
                <BoxSelector
                  onChange={(e: any) => setFieldValue('gender_id', e)}
                  value={values.gender_id}
                  label={'Gender'}
                  options={GenderEnum}
                />
                <RelationMenu
                  onChange={(e: any) => setFieldValue('dependent_type_id', e)}
                  label={'Relation'}
                  options={DependentTypeEnum}
                />
                <BoxSelector
                  onChange={(e: any) => setFieldValue('document_type', e)}
                  value={values.document_type}
                  label={'Document Type'}
                  options={[
                    { id: 'id_card', title: 'IC' },
                    { id: 'passport', title: 'Passport' },
                  ]}
                />
                <View style={styles.bottomBtnContainer}>
                  <ButtonComponent
                    disabled={!isValid || !values.first_name}
                    onPress={() => onSubmit()}
                    title={'Confirm'}
                  />
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
    </View>
  );
};

export default AddDependantScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    marginHorizontal: widthToDp(4),
    marginVertical: widthToDp(3),
    flex: 1,
    backgroundColor: GlobalColors.white,
    borderRadius: widthToDp(3),
    ...GlobalStyles.shadow,
    paddingHorizontal: widthToDp(3),
    paddingVertical: widthToDp(2),
  },
  headerText: {
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
    fontSize: responsiveFontSize(21),
  },
  label: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
    marginTop: heightToDp(2),
  },
  bottomBtnContainer: {
    marginTop: heightToDp(4),
  },
});
