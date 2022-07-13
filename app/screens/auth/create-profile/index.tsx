/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
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
} from 'react-native';

import { Formik } from 'formik';
import { showMessage } from 'react-native-flash-message';
import * as Yup from 'yup';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'components/button';
import { ActivityIndicator, CheckBox } from 'components';
import {
  DatePickerModal,
  InputWithLabel,
  PhoneNumberWithLabel,
} from 'components/base';
import { useTheme } from 'react-native-paper';

import { userService } from 'services/user-service/user-service';
import { RegisterUserErrorResponse } from 'types/auth/RegisterUser';
import { logNow } from 'utils/functions/log-binder';
import {
  getAuthAsyncStorage,
  resetAuthAsyncStorage,
} from 'services/async-storage/auth-async-storage';
import { loggedIn, loggedOut } from 'store/auth/auth-actions';

import { BackIcon } from 'assets/svgs/index';

import makeStyles from './styles';
import { IAppState } from 'store/IAppState';
import { dateFormat } from 'utils/functions/date-format';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';
import { IC_AND_PASSPORT, NAME } from 'utils/regix';

export default function CreateProfile() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const dispatch = useDispatch();
  const dispatch3 = useDispatch();

  const [loading, setLoading] = useState(false);

  const [gender, setGender] = useState([
    { id: 1, sex: 'Male' },
    { id: 2, sex: 'Female' },
    { id: 3, sex: 'Others' },
  ]);
  const [preferredCountries, setPreferredCountries] = useState([
    'MY',
    'PH',
    'SG',
    'ID',
    'TH',
    'VN',
  ]);

  const [selectedGender, setSelectedGender] = useState('');
  const [checked, setChecked] = React.useState(false);
  const [date, setDate] = useState(new Date('jan-01-1990'));
  const [isPickerShow, setIsPickerShow] = useState(false);

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

  async function getHasprofileAsyncStorage() {
    const data = await getAuthAsyncStorage();
    dispatch3(loggedIn(data));
  }
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
  //functions
  const signupApi = async (values: string) => {
    setLoading(true);

    let phone = '+' + selectedCountryCode + values.phone_number;

    let finialDate = dateFormat(date);

    Keyboard.dismiss();
    userService
      .createProfile(values, phone, finialDate, selectedGender.id)
      .then(async (res) => {
        logNow('signup res', res);
        setLoading(false);
        await AsyncStorage.setItem('hasProfile', JSON.stringify(true));
        getHasprofileAsyncStorage();
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
    if (gender == '') {
    } else if (checked == true) {
      signupApi(values);
    } else {
      showMessage({
        message: 'Kindly accept terms and condition',
        type: 'warning',
      });
    }
  };

  const onBackPress = async () => {
    setLoading(true);
    await resetAuthAsyncStorage();
    dispatch(loggedOut(true));
    setLoading(false);
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
          <TouchableOpacity
            style={{ paddingHorizontal: 8, paddingVertical: 8 }}
            onPress={() => onBackPress()}
          >
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.signupText}>Personal Details</Text>
        </View>
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
                  <Text style={styles.heading}>Basic Information</Text>
                  <InputWithLabel
                    label="First Name"
                    placeholder={''}
                    containerStyles={{ paddingHorizontal: 20 }}
                    labelFontSize={15}
                    onChange={handleChange('fName')}
                    value={values.fName}
                    error={touched.fName ? errors.fName : ''}
                    onBlur={() => setFieldTouched('fName')}
                  />

                  <InputWithLabel
                    label="Last Name"
                    placeholder={''}
                    containerStyles={{ paddingHorizontal: 20 }}
                    labelFontSize={15}
                    onChange={handleChange('lName')}
                    value={values.lName}
                    error={touched.lName ? errors.lName : ''}
                    onBlur={() => setFieldTouched('lName')}
                  />

                  <InputWithLabel
                    label="Identity Card/Passport Number"
                    placeholder={'E.g. A1234567X'}
                    containerStyles={{ paddingHorizontal: 20 }}
                    labelFontSize={15}
                    onChange={(value) => {
                      if (IC_AND_PASSPORT.test(value))
                        setFieldValue('IcPnum', value);
                    }}
                    value={values.IcPnum}
                    error={touched.IcPnum ? errors.IcPnum : ''}
                    onBlur={() => setFieldTouched('IcPnum')}
                  />

                  <View style={{ paddingHorizontal: 20 }}>
                    <PhoneNumberWithLabel
                      label="Mobile Number"
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
                              Must have {numberCondition.min}
                              {numberCondition.max !== numberCondition.min &&
                                -numberCondition.max}{' '}
                              characters
                            </Text>
                          </View>
                        )
                      ))}
                  </View>

                  <Text style={styles.inputLablel}>Gender</Text>
                  <View style={styles.ChoiceBtnDOB}>
                    <FlatList
                      data={gender}
                      renderItem={RenderRadio}
                      keyExtractor={(item) => item.id}
                      horizontal
                    />
                  </View>

                  <Text style={styles.inputLablel}>Date of Birth</Text>
                  <View style={{ paddingHorizontal: 20 }}>
                    <DatePickerModal
                      isPickerShow={isPickerShow}
                      setIsPickerShow={setIsPickerShow}
                      date={date}
                      setDate={setDate}
                      maximumDate={new Date()}
                      minimumDate={new Date('jan-01-1922')}
                    />
                  </View>

                  <View style={styles.aiContainer}>
                    <Text style={styles.heading}>Account Information</Text>

                    <InputWithLabel
                      label="Email"
                      placeholder={''}
                      containerStyles={{ paddingHorizontal: 20 }}
                      labelFontSize={15}
                      onChange={handleChange('email')}
                      value={values.email}
                      error={touched.email ? errors.email : ''}
                      onBlur={() => setFieldTouched('email')}
                    />
                  </View>
                  <View style={styles.tcText}>
                    <CheckBox checked={checked} setChecked={setChecked} />
                    <Text style={styles.tcTextStyle}>
                      <Text>I accept the </Text>
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
                            fontSize: 17,
                            textDecorationLine: 'underline',
                            // bottom: 2,
                          }}
                        >
                          terms and conditions
                        </Text>
                      </TouchableWithoutFeedback>
                      <Text> and the </Text>
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
                            fontSize: 17,
                            textDecorationLine: 'underline',
                          }}
                        >
                          privacy policy.
                        </Text>
                      </TouchableWithoutFeedback>
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Button
                      title="Continue"
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
                  </TouchableOpacity>
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
    .required('Please provide your first name')
    .matches(NAME, 'Name should only contain latin letters'),
  lName: Yup.string()
    .required('Please provide your last name')
    .matches(NAME, 'Name should only contain latin letters'),

  IcPnum: Yup.string(),
  phone_number: Yup.string()
    // .matches(Regex.minNum, 'Enter valid phone number')
    .required('Please provide your phone number'),
  email: Yup.string().email('Enter valid email address'),
});
