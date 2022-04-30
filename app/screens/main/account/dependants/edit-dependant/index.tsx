import ButtonComponent from 'components/base/button';
import DateTimePickerModalComponent from 'components/base/dateTimePickerModal';
import InputWithLabel from 'components/base/input-with-label';
import PhoneNumberWithLabel from 'components/base/phone-with-label/index';
import BoxSelector from 'components/higher-order/box-selector';
import RelationMenu from 'components/higher-order/relation-menu';
import ActivityIndicator from 'components/loader/activity-indicator';
import { Regex } from 'constants/regex';
import { Formik } from 'formik';
import { parsePhoneNumber } from 'libphonenumber-js';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { dependentService } from 'services/account-service/dependent-service';
import { goBack } from 'services/nav-ref';
import { getAllDependents } from 'store/account/account-actions';
import { DependentSingleGetResponse } from 'types/api/dependent';
import { logNow } from 'utils/functions/log-binder';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';
import { GlobalStyles } from 'utils/theme/global-styles';
import * as Yup from 'yup';
import { DependentTypeEnum } from '../../../../../enum/DependentTypeEnum';
import { GenderEnum } from '../../../../../enum/GenderEnum';

type Props = {
  route?: any;
};

const EditDependantScreen = (props: Props) => {
  const dispatch = useDispatch();
  const [nationalNumber, setNationalNumber] = useState<any>();

  const id = props.route?.params?.id;

  const formikRef = useRef<any>();

  const [isLoading, setIsLoading] = useState(false);

  const [countryCode, setCountryCode] = useState('MY');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+60');

  const [dependentData, setDependentData] =
    useState<DependentSingleGetResponse>();
  /*eslint-disable */
  const getDependentData = async () => {
    setIsLoading(true);
    dependentService
      .getSingleDependentData(id)
      .then((res: any) => {
        logNow('single dependent response', res);
        setDependentData(res);
        const phoneNumber: any = parsePhoneNumber(res.dependent_mobile_number);
        setCountryCode(phoneNumber?.country);
        setNationalNumber(phoneNumber?.nationalNumber);
      })
      .catch((err) => {
        goBack();
        logNow('get single dependent error', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getDependentData();
  }, [id]);

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
      birth_date,
      email,
      phone_number: `${selectedCountryCode}${phone_number}`,
      gender_id, // 1 = Male, 2 = Female, 3 = Others
      country_code: countryCode,
      country_phone_code: `${selectedCountryCode}`,
    });
    const pN = `${selectedCountryCode}${phone_number}`;
    const cPC = `+${selectedCountryCode}`;
    setIsLoading(true);
    dependentService
      .editDependent(
        id,
        first_name,
        last_name,
        document_type,
        dependent_type_id,
        id_number,
        birth_date,
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
          contentContainerStyle={{ paddingBottom: heightToDp(20) }}
        >
          <Text style={styles.headerText}>Enter your Dependant Details</Text>
          <Formik
            innerRef={formikRef}
            enableReinitialize
            initialValues={{
              first_name: dependentData?.first_name,
              last_name: dependentData?.last_name,
              document_type: dependentData?.document_type,
              dependent_type_id: dependentData?.dependent_type_id,
              id_number: dependentData?.id_number,
              birth_date: dependentData?.dependent_dob,
              email: dependentData?.dependent_email,
              phone_number: nationalNumber,
              gender_id: dependentData?.dependent_gender,
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
                {/* <DatePicker
                  width={'100%'}
                  date={new Date('Jan-01-1990')}
                  setDate={(e: any) => setFieldValue('birth_date', e)}
                  isPickerShow={isDatePicker}
                  setIsPickerShow={setIsDatePicker}
                /> */}
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
                  optionValue={values.dependent_type_id}
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

export default EditDependantScreen;

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
