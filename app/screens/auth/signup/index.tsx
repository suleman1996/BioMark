import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme, TouchableRipple } from 'react-native-paper';

import { Formik } from 'formik';
import { showMessage } from 'react-native-flash-message';
import StepIndicator from 'react-native-step-indicator';
import * as Yup from 'yup';
import moment from 'moment';

import { Button } from 'components/button';
import { CheckBox, ActivityIndicator, TextInput } from 'components';
import { BioDangerWhite } from 'components/svg';
import {
  DatePickerModal,
  PhoneNumberWithLabel,
  InputWithLabel,
} from 'components/base';

import SCREENS from 'navigation/constants';
import { navigate, goBack } from 'services/nav-ref';
import { userService } from 'services/user-service/user-service';
import { RegisterUserErrorResponse } from 'types/auth/RegisterUser';
import { logNow } from 'utils/functions/log-binder';

import { BackIcon } from 'assets/svgs/index';

import makeStyles from './styles';
import { IAppState } from 'store/IAppState';
import { useSelector } from 'react-redux';
import { IC_AND_PASSPORT, NAME } from 'utils/regix';
import { useTranslation } from 'react-i18next';
import fonts from 'assets/fonts';
import i18next from 'i18next';

export default function Signup() {
  //initial hooks define
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  //state
  const [hidePassword, setHidePassword] = useState(true);

  const labels = ['Personal Details', 'Verification', 'Confirmation']; //signup navigation labels
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState('MY');
  const [selectCountryCode, setSelectCountryCode] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gender, setGender] = useState([
    { id: 1, sex: 'Male' },
    { id: 2, sex: 'Female' },
    { id: 3, sex: 'Others' },
  ]);
  const [selectedGender, setSelectedGender] = useState('');
  const [numberCondition, setNumberCondition] = useState({ min: 8, max: 11 });
  const [checked, setChecked] = React.useState(false);
  const [date, setDate] = useState(new Date('jan-01-1990'));
  const [isPickerShow, setIsPickerShow] = useState(false);
  const geoLocation = useSelector(
    (state: IAppState) => state.account.geolocation
  );

  //fuctions
  useEffect(() => {
    if (selectCountryCode == '60') {
      setNumberCondition({ min: 8, max: 11 });
    } else if (selectCountryCode == '63') {
      setNumberCondition({ min: 10, max: 10 });
    } else if (selectCountryCode == '65') {
      setNumberCondition({ min: 8, max: 8 });
    } else {
      setNumberCondition({ min: 4, max: 13 });
    }
  }, [selectCountryCode]);

  useEffect(() => {
    if (geoLocation.code) {
      setCountryCode(geoLocation.code);
      let countryCodeParse = geoLocation.dial_code.replace('+', '');
      setSelectCountryCode(countryCodeParse);
    }
  }, [geoLocation]);

  const signupApi = async (values: string) => {
    // setLoading(true);
    Keyboard.dismiss();
    const username = `+${selectCountryCode}${values?.phone_number}`;

    const newDate = moment(date).format('YYYY-MM-DD');
    const password = values.password;
    userService
      .registerUser(username, values, selectedGender.id, newDate)
      .then((res) => {
        logNow('signup res', res);
        navigate(SCREENS.SIGNUP_VERIFICATION, { username, password });
      })
      .catch((err: RegisterUserErrorResponse) => {
        logNow('error signup', err.errMsg.data.message);
        showMessage({
          message: err?.errMsg.data.message || 'Please try again later',
          type: 'danger',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSignup = async (values) => {
    if (checked == true) {
      signupApi(values);
    } else {
      showMessage({
        message: 'Kindly accept terms and condition',
        type: 'warning',
      });
    }
  };

  const RenderRadio = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedGender(item)}
      style={[
        styles.radioButton,
        {
          backgroundColor:
            item.id === selectedGender.id ? colors.heading : colors.white,
          borderColor:
            item.id === selectedGender.id ? colors.heading : colors.lightGrey,
        },
      ]}
    >
      <Text
        style={
          (styles.radioText,
          {
            color:
              item.id === selectedGender.id ? colors.white : colors.heading,
          })
        }
      >
        {item.sex}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <ActivityIndicator visible={loading} />

      <View style={styles.signupNav}>
        <View style={styles.csNav}>
          <TouchableRipple
            borderless
            style={styles.ripple}
            onPress={() => goBack()}
            rippleColor={'#8493AE20'}
          >
            <BackIcon />
          </TouchableRipple>
          <Text style={styles.signupText}>{t('pages.signUp.title')}</Text>
        </View>
        <StepIndicator
          stepCount={3}
          customStyles={styles.stepIndicator}
          labels={labels}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <Formik
            initialValues={{
              fName: '',
              lName: '',
              IcPnum: '',
              email: '',
              password: '',
              phone_number: '',
            }}
            onSubmit={(values) => handleSignup(values)}
            validationSchema={ResetPassSchema}
          >
            {({
              handleSubmit,
              errors,
              handleChange,
              // handleSubmit,
              // setFieldTouched,
              values,
              // isSubmitting,
              isValid,
              setFieldValue,
              touched,
              setFieldTouched,
            }) => (
              <>
                <View style={styles.biContainer}>
                  <Text style={styles.heading}>
                    {t('pages.register.form.basicLegend')}
                  </Text>
                  <InputWithLabel
                    label={t('pages.register.form.firstName')}
                    labelStyle={{
                      fontFamily: fonts.mulishSemiBold,
                      color: colors.heading,
                      fontSize: 15,
                    }}
                    placeholder={''}
                    containerStyles={{ paddingHorizontal: 20 }}
                    onChange={handleChange('fName')}
                    value={values.fName}
                    error={touched.fName ? errors.fName : ''}
                    onBlur={() => setFieldTouched('fName')}
                  />

                  <InputWithLabel
                    label={t('pages.register.form.lastName')}
                    placeholder={''}
                    containerStyles={{ paddingHorizontal: 20 }}
                    labelStyle={{
                      fontFamily: fonts.mulishSemiBold,
                      color: colors.heading,
                      fontSize: 15,
                    }}
                    onChange={handleChange('lName')}
                    value={values.lName}
                    error={touched.lName ? errors.lName : ''}
                    onBlur={() => setFieldTouched('lName')}
                  />
                  <Text style={styles.inputLablel}>
                    {t('pages.register.form.gender')}
                  </Text>
                  <View style={styles.ChoiceBtnDOB}>
                    <FlatList
                      data={gender}
                      renderItem={RenderRadio}
                      keyExtractor={(item) => item.id}
                      horizontal
                    />
                  </View>

                  <Text style={styles.inputLablel}>
                    {t('pages.register.form.dateOfBirth')}
                  </Text>
                  <View style={{ paddingHorizontal: 20 }}>
                    <DatePickerModal
                      isPickerShow={isPickerShow}
                      setIsPickerShow={setIsPickerShow}
                      date={date}
                      setDate={setDate}
                      maximumDate={new Date()}
                      minimumDate={new Date('jan-01-1990')}
                    />
                  </View>
                  <InputWithLabel
                    label={t('pages.register.form.idNumber')}
                    placeholder={'E.g. A1234567X'}
                    containerStyles={{ paddingHorizontal: 20 }}
                    labelStyle={{
                      fontFamily: fonts.mulishSemiBold,
                      color: colors.heading,
                      fontSize: 15,
                    }}
                    onChange={(value) => {
                      if (IC_AND_PASSPORT.test(value))
                        setFieldValue('IcPnum', value);
                    }}
                    value={values.IcPnum}
                    error={touched.IcPnum ? errors.IcPnum : ''}
                    onBlur={() => setFieldTouched('IcPnum')}
                  />
                  <View style={styles.aiContainer}>
                    <Text style={styles.heading}>
                      {t('pages.register.form.accountLegend')}
                    </Text>

                    <View style={{ paddingHorizontal: 20 }}>
                      <PhoneNumberWithLabel
                        label={t('pages.register.form.mobile')}
                        labelStyle={{
                          fontFamily: fonts.mulishSemiBold,
                          color: colors.heading,
                          fontSize: 15,
                        }}
                        placeholder={''}
                        disabled={false}
                        number={values.phone_number}
                        setPhoneNumber={(e: any) => {
                          setFieldValue('phone_number', e);
                        }}
                        countryCode={countryCode}
                        // error={values.phone_number ? errors.phone_number : ''}
                        setCountryCode={setCountryCode}
                        setSelectCountryCode={setSelectCountryCode}
                        maxLength={numberCondition.max}
                        onBlur={() => setFieldTouched('phone_number')}
                      />
                    </View>
                    <View style={{ paddingHorizontal: 20 }}>
                      {touched.phone_number &&
                        (errors.phone_number ? (
                          <View style={[styles.errorContainer]}>
                            <Text style={styles.errorText}>
                              {errors.phone_number}
                            </Text>
                          </View>
                        ) : (
                          values.phone_number.length < numberCondition.min && (
                            <View style={styles.errorContainer}>
                              <Text style={styles.errorText}>
                                {t('pages.login.errors.phoneNumberTooShort')}
                                {numberCondition.min}
                                {numberCondition.max !== numberCondition.min &&
                                  -numberCondition.max}{' '}
                                {t('pages.login.errors.characters')}
                              </Text>
                            </View>
                          )
                        ))}
                    </View>

                    <InputWithLabel
                      label={t('pages.register.form.email')}
                      placeholder="E.g. Sample@email.com"
                      containerStyles={{
                        paddingHorizontal: 20,
                      }}
                      labelStyle={{
                        fontFamily: fonts.mulishSemiBold,
                        color: colors.heading,
                        fontSize: 15,
                      }}
                      onChange={handleChange('email')}
                      value={values.email}
                      error={touched.email ? errors.email : ''}
                      onBlur={() => setFieldTouched('email')}
                    />
                    <Text style={styles.inputLablel}>
                      {t('pages.register.form.password')}
                    </Text>
                    <TextInput
                      placeholder={t(
                        'pages.password.currentPassword.placeholder'
                      )}
                      containerStyle={{ borderRadius: 8 }}
                      secureTextEntry={hidePassword}
                      eye={!hidePassword ? 'eye' : 'eye-off'}
                      onEyePress={() => setHidePassword(!hidePassword)}
                      onChange={handleChange('password')}
                      margin={20}
                      onBlur={() => setFieldTouched('password')}
                    />
                    {touched.password && errors.password ? (
                      <View style={{ paddingHorizontal: 20 }}>
                        <View style={styles.errorContainer}>
                          <BioDangerWhite width={3.5} height={3.5} />
                          <Text style={styles.errorText}>
                            {errors.password}
                          </Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.tcText}>
                    <CheckBox checked={checked} setChecked={setChecked} />
                    <Text style={styles.tcTextStyle}>
                      <Text>{t('pages.signUp.tos.start')} </Text>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          navigate(SCREENS.TERMS_AND_PRIVACY, {
                            privacyPolicy: false,
                          })
                        }
                      >
                        <Text
                          style={{
                            color: colors.blue,
                            fontSize: 15,
                            fontFamily: fonts.mulishRegular,
                            textDecorationLine: 'underline',
                            // bottom: 2,
                          }}
                        >
                          {t('pages.signUp.tos.tosLink')}
                        </Text>
                      </TouchableWithoutFeedback>
                      <Text> {t('pages.signUp.tos.middle')} </Text>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          navigate(SCREENS.TERMS_AND_PRIVACY, {
                            privacyPolicy: true,
                          })
                        }
                      >
                        <Text
                          style={{
                            color: colors.blue,
                            fontSize: 15,
                            fontFamily: fonts.mulishRegular,
                            textDecorationLine: 'underline',
                          }}
                        >
                          {t('pages.signUp.tos.dppLink')}
                        </Text>
                      </TouchableWithoutFeedback>
                    </Text>
                  </View>

                  <Button
                    title={t('pages.signUp.continue')}
                    disabled={
                      !isValid ||
                      values.phone_number.length < numberCondition.min
                        ? true
                        : false || !selectedGender
                        ? true
                        : false
                    }
                    onPress={() => handleSubmit()}
                  />
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const ResetPassSchema = Yup.object({
  fName: Yup.string()
    .required(i18next.t('userProfile.errors.firstNameRequired'))
    .matches(NAME, i18next.t('userProfile.errors.nameFormat')),
  lName: Yup.string()
    .required(i18next.t('userProfile.errors.lastNameRequired'))
    .matches(NAME, i18next.t('userProfile.errors.nameFormat')),

  IcPnum: Yup.string(),
  // .required('Please provide Identity Card/Passport Number'),
  phone_number: Yup.string(),
  // .matches(Regex.minNum, 'Enter valid phone number')
  // .required('Please provide your phone number'),
  email: Yup.string().email(i18next.t('userProfile.errors.emailFormat')),
  // .required('Email is required'),
  password: Yup.string()
    .required(i18next.t('userProfile.errors.passwordRequired'))
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Atleast have one digit, one captial letter and one special character.'
    ),
});
