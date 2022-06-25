import React, { useContext, useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { format } from 'date-fns';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { ActivityIndicator } from 'components';
import {
  DatePickerModal,
  InputWithLabel,
  Button,
  PhoneNumberWithLabel,
} from 'components/base';
import { BoxSelector, RelationMenu } from 'components/higher-order';

import { goBack } from 'services/nav-ref';
import { Header } from 'components';
import { dependentService } from 'services/account-service/dependent-service';
import { getAllDependents } from 'store/account/account-actions';
import { dateFormat } from 'utils/functions/date-format';
import { logNow } from 'utils/functions/log-binder';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { DependentTypeEnum } from 'enum/dependent-type-enum';
import { GenderEnum } from 'enum/gender-enum';

import makeStyles from './styles';
import { IAppState } from 'store/IAppState';
import AuthContext from 'utils/auth-context';
import { useTranslation } from 'react-i18next';
import { profileServices } from 'services/profile-services';

const AddDependantScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const formikRef = useRef<any>();
  const dispatch = useDispatch();

  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
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

  const geoLocation = useSelector(
    (state: IAppState) => state.account.geolocation
  );

  useEffect(() => {
    if (geoLocation.code) {
      setCountryCode(geoLocation.code);
      let countryCodeParse = geoLocation.dial_code.replace('+', '');
      setSelectedCountryCode(countryCodeParse);
    }
  }, [geoLocation]);

  const userProfile = async () => {
    try {
      const result = await profileServices.getUserProfile();
      authContext.setUserData(result);
    } catch (error) {}
  };

  const AddDependentSchema = Yup.object({
    first_name: Yup.string()
      // .matches(Regex.alphabets, 'Please enter valid first name')
      .required('Firstname is required'),
    last_name: Yup.string()
      // .matches(Regex.alphabets, 'Please enter valid last name')
      .required('lastname is required'),
    phone_number: Yup.string()
      // .matches(Regex.minNum, 'Enter valid phone number')
      .required('Please provide your phone number'),
    // .min(min)
    // .max(max),
    email: Yup.string()
      .email('Enter valid email address')
      .required('Email is required'),
    id_number: Yup.string()
      // .matches(Regex.numAndString, 'Enter valid NRIC / Passport')
      .required('Enter valid NRIC / Passport'),
    document_type: Yup.string().required(''),
    dependent_type_id: Yup.string().required(''),
    // birth_date: Yup.string().required(''),
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
    const pN = `+${selectedCountryCode}${phone_number}`;
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
        userProfile();
        goBack();
      });
    formikRef.current.submitForm();
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={isLoading} />
      <Header
        isBold={true}
        isColor={true}
        title={t('pages.covid.covid-dependant-card.addDependant')}
      />
      <View style={styles.cardContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: heightToDp(10) }}
        >
          <Text style={styles.headerText}>
            {t('pages.covid.covid-dependant.title')}
          </Text>
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
              touched,
              setFieldTouched,
            }) => (
              <>
                <InputWithLabel
                  label={t('pages.covid.covid-dependant.firstname')}
                  placeholder={''}
                  onChange={handleChange('first_name')}
                  value={values.first_name}
                  error={touched.first_name ? errors.first_name : ''}
                  onBlur={() => setFieldTouched('first_name')}
                  maxLength={50}
                />
                <InputWithLabel
                  label={t('pages.covid.covid-dependant.lastname')}
                  placeholder={''}
                  onChange={handleChange('last_name')}
                  value={values.last_name}
                  error={touched.last_name ? errors.last_name : ''}
                  onBlur={() => setFieldTouched('last_name')}
                  maxLength={50}
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
                  // error={values.phone_number ? errors.phone_number : ''}
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

                <BoxSelector
                  onChange={(e: any) => setFieldValue('gender_id', e)}
                  value={values.gender_id}
                  label={t('pages.covid.covid-dependant.gender')}
                  options={GenderEnum}
                />
                <RelationMenu
                  onChange={(e: any) => setFieldValue('dependent_type_id', e)}
                  label={t('pages.covid.covid-dependant.relation')}
                  options={DependentTypeEnum}
                />
                <InputWithLabel
                  label={t('pages.covid.covid-dependant.ncr_passport')}
                  placeholder={''}
                  onChange={handleChange('id_number')}
                  value={values.id_number}
                  error={touched.id_number ? errors.id_number : ''}
                  onBlur={() => setFieldTouched('id_number')}
                  maxLength={20}
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

export default AddDependantScreen;
