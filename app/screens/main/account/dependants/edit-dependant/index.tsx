import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { parsePhoneNumber } from 'libphonenumber-js';
import { useDispatch } from 'react-redux';

import {
  PhoneNumberWithLabel,
  InputWithLabel,
  DatePickerModal,
  Button,
} from 'components/base';
import { BoxSelector, RelationMenu } from 'components/higher-order';
import { ActivityIndicator } from 'components';
import { Header } from 'components';

import { Regex } from 'constants/regex';
import { dependentService } from 'services/account-service/dependent-service';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';
import { getAllDependents } from 'store/account/account-actions';
import { DependentSingleGetResponse } from 'types/api/dependent';
import { logNow } from 'utils/functions/log-binder';
import { DependentTypeEnum } from 'enum/dependent-type-enum';
import { GenderEnum } from 'enum/gender-enum';

import makeStyles from './styles';
import { getUserProfileData } from 'store/profile/profile-actions';
import { useTranslation } from 'react-i18next';

type Props = {
  route?: any;
};

const EditDependantScreen = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const dispatch1 = useDispatch();

  const [nationalNumber, setNationalNumber] = useState('');

  const id = props.route?.params?.id;

  const formikRef = useRef<any>();

  const [isLoading, setIsLoading] = useState(false);

  const [countryCode, setCountryCode] = useState('MY');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+60');

  const [numberCondition, setNumberCondition] = useState({ min: 8, max: 11 });
  useEffect(() => {
    if (selectedCountryCode == '60') {
      setNumberCondition({ min: 8, max: 11 });
    } else if (selectedCountryCode == '63') {
      setNumberCondition({ min: 10, max: 10 });
    } else if (selectedCountryCode == '65') {
      setNumberCondition({ min: 8, max: 8 });
    } else {
      setNumberCondition({ min: 4, max: 13 });
    }
  }, [selectedCountryCode]);

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
        console.log('hhhhhhh', phoneNumber);
        setCountryCode(phoneNumber?.country);
        setSelectedCountryCode(phoneNumber?.countryCallingCode);
        setNationalNumber(phoneNumber?.nationalNumber);
      })
      .catch((err) => {
        logNow('get single dependent error', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getDependentData();
  }, [id]);

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
    const pN = `+${selectedCountryCode}${phone_number}`;
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
        await dispatch1(getUserProfileData());
        navigate(SCREENS.NESTED_ACCOUNT_NAVIGATOR, {
          screen: SCREENS.DEPENDANTS,
        });
      });
    formikRef.current.submitForm();
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={isLoading} />
      <Header
        isBold={true}
        isColor={true}
        title={t('pages.covid.covid-dependant-card.editDependant')}
      />
      <View style={styles.cardContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            {
              // paddingBottom: heightToDp(20)
            }
          }
        >
          <Text style={styles.headerText}>
            {t('pages.covid.covid-dependant.title')}
          </Text>
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
              phone_number: nationalNumber + '',
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
              touched,
              setFieldTouched,
            }) => (
              <>
                <InputWithLabel
                  label={t('pages.covid.covid-dependant.firstname')}
                  placeholder={''}
                  onChange={handleChange('first_name')}
                  maxLength={50}
                  value={values.first_name}
                  error={touched.first_name ? errors.first_name : ''}
                  onBlur={() => setFieldTouched('first_name')}
                />
                <InputWithLabel
                  label={t('pages.covid.covid-dependant.lastname')}
                  placeholder={''}
                  onChange={handleChange('last_name')}
                  maxLength={50}
                  value={values.last_name}
                  error={touched.last_name ? errors.last_name : ''}
                  onBlur={() => setFieldTouched('last_name')}
                />
                <PhoneNumberWithLabel
                  label={t('pages.phoneNumber.mobileNumber')}
                  placeholder={''}
                  disabled={false}
                  number={values.phone_number}
                  setPhoneNumber={(e: any) => {
                    setFieldValue('phone_number', e);
                  }}
                  countryCode={countryCode}
                  setCountryCode={setCountryCode}
                  setSelectCountryCode={setSelectedCountryCode}
                  maxLength={numberCondition.max}
                  onBlur={() => setFieldTouched('phone_number')}
                />
                {touched.phone_number &&
                  (errors.phone_number ? (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>
                        {errors.phone_number}
                      </Text>
                    </View>
                  ) : (
                    values.phone_number.length < numberCondition.min && (
                      <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>
                          {t('pages.login.errors.phoneNumberTooShort')}{' '}
                          {numberCondition.min}
                          {numberCondition.max !== numberCondition.min &&
                            -numberCondition.max}{' '}
                          {t('pages.login.errors.characters')}
                        </Text>
                      </View>
                    )
                  ))}
                <InputWithLabel
                  placeholder="E.g. Sample@email.com"
                  label={t('pages.login.email')}
                  onChange={handleChange('email')}
                  value={values.email}
                  error={touched.email ? errors.email : ''}
                  onBlur={() => setFieldTouched('email')}
                />
                <Text style={styles.label}>
                  {t('pages.covid.covid-dependant.dob')}
                </Text>
                <DatePickerModal
                  date={values.birth_date}
                  setDate={(e: any) => setFieldValue('birth_date', e)}
                />
                {/* <DatePickerModal
                  width={'100%'}
                  date={new Date('Jan-01-1990')}
                  setDate={(e: any) => setFieldValue('birth_date', e)}
                  isPickerShow={isDatePickerModal}
                  setIsPickerShow={setIsDatePickerModal}
                /> */}
                <InputWithLabel
                  label={t('pages.covid.covid-dependant.ncr_passport')}
                  placeholder={''}
                  onChange={handleChange('id_number')}
                  maxLength={20}
                  value={values.id_number}
                  error={touched.id_number ? errors.id_number : ''}
                  onBlur={() => setFieldTouched('id_number')}
                />
                <BoxSelector
                  onChange={(e: any) => setFieldValue('gender_id', e)}
                  value={values.gender_id}
                  label={t('pages.covid.covid-dependant.gender')}
                  options={GenderEnum}
                />
                <RelationMenu
                  onChange={(e: any) => setFieldValue('dependent_type_id', e)}
                  label={t('pages.covid.covid-dependant.relation')}
                  optionValue={values.dependent_type_id}
                  options={DependentTypeEnum}
                />
                <BoxSelector
                  onChange={(e: any) => setFieldValue('document_type', e)}
                  value={values.document_type}
                  label={t('pages.covid.covid-dependant.document_type')}
                  options={[
                    {
                      id: 'id_card',
                      title: t('pages.covid.covid-dependant.ic'),
                    },
                    {
                      id: 'passport',
                      title: t('pages.covid.covid-dependant.passport'),
                    },
                  ]}
                />
                <View style={styles.bottomBtnContainer}>
                  <Button
                    disabled={
                      !isValid ||
                      !values.first_name ||
                      values.phone_number.length < numberCondition.min
                        ? true
                        : false
                    }
                    onPress={() => onSubmit()}
                    title={t('pages.covid.covid-button.confirm')}
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

const AddDependentSchema = Yup.object({
  first_name: Yup.string()
    // .matches(/^[A-Za-z ]*$/, 'Please enter valid first name')
    .required('Firstname is required'),
  last_name: Yup.string()
    // .matches(/^[A-Za-z ]*$/, 'Please enter valid last name')
    .required('Firstname is required'),
  document_type: Yup.string().required(''),
  dependent_type_id: Yup.string().required(''),
  id_number: Yup.string()
    // .matches(Regex.numAndString, 'Enter valid NRIC / Passport')
    .required('NRIC / Passport is required'),
  // birth_date: Yup.string().required(''),
  email: Yup.string()
    .email('Enter valid email address')
    .required('Email is required'),
  phone_number: Yup.string()
    .matches(Regex.numberReg, 'Enter valid phone number')
    .required('Please provide your phone number'),
});
