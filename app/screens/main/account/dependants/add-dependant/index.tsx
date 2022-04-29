import ButtonComponent from 'components/base/button';
import ErrorText from 'components/base/error-text';
import InputWithLabel from 'components/base/input-with-label';
import PhoneNumberWithLabel from 'components/base/phone-with-label/index';
import DatePicker from 'components/date-picker';
import BoxSelector from 'components/higher-order/box-selector';
import RelationMenu from 'components/higher-order/relation-menu';
import { Regex } from 'constants/regex';
import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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

  const [countryCode] = useState('MY');
  const [gender_id, setGenderId] = useState<any>();

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
      .matches(Regex.numberReg, 'Enter valid NRIC / Passport')
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
    const values = formikRef.current.values;
    logNow(values);
    formikRef.current.submitForm();
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: heightToDp(20) }}
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
              birth_date: '01-01-1990',
              email: '',
              phone_number: '',
              gender_id: 1,
            }}
            onSubmit={() => {
              onSubmit;
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
                  setPhoneNumber={handleChange('phone_number')}
                  country={countryCode}
                />
                {errors.phone_number && (
                  <ErrorText text={errors.phone_number} />
                )}
                <InputWithLabel
                  placeholder="E.g. Sample@email.com"
                  label="Email"
                  onChange={handleChange('email')}
                  value={values.email}
                />
                {errors.email && <ErrorText text={errors.email} />}
                <Text style={styles.label}>Date of Birth</Text>
                <DatePicker
                  width={'100%'}
                  date={new Date('Jan-01-1990')}
                  setDate={handleChange('birth_date')}
                  isPickerShow={false}
                  setIsPickerShow={undefined}
                />
                <InputWithLabel
                  label="NRIC /Passport Number"
                  placeholder={''}
                  onChange={handleChange('id_number')}
                  value={values.id_number}
                />
                {errors.id_number && <ErrorText text={errors.id_number} />}
                <BoxSelector
                  onChange={setGenderId}
                  value={gender_id}
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
                  isTitleSelect
                  options={[
                    { id: 1, title: 'IC' },
                    { id: 2, title: 'Passport' },
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
