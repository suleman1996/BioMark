import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import { Formik } from 'formik';
import { showMessage } from 'react-native-flash-message';
import StepIndicator from 'react-native-step-indicator';
import * as Yup from 'yup';
import moment from 'moment';

import { Button } from 'components/button';
import {
  CheckBox,
  DatePicker,
  ActivityIndicator,
  TextInput,
  PhoneNumber,
} from 'components';

import SCREENS from 'navigation/constants';
import { navigate } from 'services/nav-ref';
import { userService } from 'services/user-service/user-service';
import { RegisterUserErrorResponse } from 'types/auth/RegisterUser';
import { logNow } from 'utils/functions/log-binder';

import { BackIcon } from 'assets/svgs/index';

import makeStyles from './styles';
import { IAppState } from 'store/IAppState';
import { useSelector } from 'react-redux';

export default function Signup() {
  //initial hooks define
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  //state
  const [hidePassword, setHidePassword] = useState(true);

  const labels = ['Personal Details', 'Verification', 'Confirmation']; //signup navigation labels
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState('MY');
  const [phoneNumber, setPhoneNumber] = useState(''); //International Phone Picker
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
  const [date, setDate] = useState(new Date());
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
    console.log('locc =======>', geoLocation);
    if (geoLocation.code) {
      setCountryCode(geoLocation.code);
      let countryCodeParse = geoLocation.dial_code.replace('+', '');
      setSelectCountryCode(countryCodeParse);
    }
  }, [geoLocation]);

  const signupApi = async (values: string) => {
    // setLoading(true);
    Keyboard.dismiss();
    const username = `+${selectCountryCode}${phoneNumber}`;
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
    if (phoneNumber == '' || gender == '') {
    } else if (checked == true) {
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
            item.id === selectedGender.id ? colors.heading : colors.whiteColor,
          borderColor:
            item.id === selectedGender.id ? colors.heading : colors.placeHolder,
        },
      ]}
    >
      <Text
        style={
          (styles.radioText,
          {
            color:
              item.id === selectedGender.id
                ? colors.whiteColor
                : colors.heading,
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
          <TouchableOpacity>
            {/* <BackIcon onPress={() => goBack()} /> */}
            <BackIcon onPress={() => console.log('goback')} />
          </TouchableOpacity>
          <Text style={styles.signupText}>Signup</Text>
        </View>
        <StepIndicator
          stepCount={3}
          customStyles={styles.stepIndicator}
          labels={labels}
        />
      </View>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <Formik
          initialValues={{
            fName: '',
            lName: '',
            IcPnum: '',
            email: '',
            password: '',
          }}
          onSubmit={(values) => handleSignup(values)}
          validationSchema={ResetPassSchema}
        >
          {({ handleChange, handleSubmit, errors, isValid }) => (
            <>
              <View style={styles.biContainer}>
                <Text style={styles.heading}>Basic Information</Text>
                <Text style={styles.inputLablel}>First Name</Text>
                <TextInput
                  placeholder="First Name"
                  onChange={handleChange('fName')}
                  margin={20}
                />
                {errors.fName && (
                  <Text style={styles.errorMessage}>{errors.fName}</Text>
                )}
                <Text style={[styles.inputLablel, { marginTop: 20 }]}>
                  Last Name
                </Text>
                <TextInput
                  placeholder="Last Name"
                  onChange={handleChange('lName')}
                  margin={20}
                />
                {errors.lName && (
                  <Text style={styles.errorMessage}>{errors.lName}</Text>
                )}
                <Text style={styles.inputLablel}>Gender</Text>
                <View style={styles.ChoiceBtnDOB}>
                  <FlatList
                    data={gender}
                    renderItem={RenderRadio}
                    keyExtractor={(item) => item.id}
                    horizontal
                  />
                </View>
                {errors.password && selectedGender == '' && (
                  <Text style={styles.errorMessage}>Please select gender</Text>
                )}
                <Text style={styles.inputLablel}>Date of Birth</Text>
                <DatePicker
                  isPickerShow={isPickerShow}
                  setIsPickerShow={setIsPickerShow}
                  date={date}
                  setDate={setDate}
                />

                <Text style={[styles.inputLablel, { marginTop: 20 }]}>
                  Identity Card/Passport Number
                </Text>
                <TextInput
                  placeholder="E.g.A1234567X"
                  onChange={handleChange('IcPnum')}
                  margin={20}
                />
                <View style={styles.aiContainer}>
                  <Text style={styles.heading}>Account Information</Text>
                  <Text style={styles.inputLablel}>Mobile Number</Text>
                  <PhoneNumber
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    setSelectCountryCode={setSelectCountryCode}
                    maxLength={numberCondition.max}
                  />
                  {(phoneNumber !== '' || errors.password) &&
                    (selectCountryCode == 63 ? (
                      phoneNumber.charAt(0) == 0 ? (
                        <Text style={styles.errorMessage}>
                          Phonenumber must not start with 0
                        </Text>
                      ) : (
                        phoneNumber.length < numberCondition.min && (
                          <Text style={styles.errorMessage}>
                            Must have {numberCondition.min}
                            {numberCondition.max !== numberCondition.min &&
                              -numberCondition.max}{' '}
                            characters
                          </Text>
                        )
                      )
                    ) : (
                      phoneNumber.length < numberCondition.min && (
                        <Text style={styles.errorMessage}>
                          Must have {numberCondition.min}
                          {numberCondition.max !== numberCondition.min &&
                            -numberCondition.max}{' '}
                          characters
                        </Text>
                      )
                    ))}

                  <Text style={styles.inputLablel}>Email</Text>
                  <TextInput
                    placeholder="E.g. Sample@email.com"
                    onChange={handleChange('email')}
                    margin={20}
                    keyboardType="email-address"
                  />
                  <Text style={styles.inputLablel}>Password</Text>
                  <TextInput
                    placeholder="Enter your new password..."
                    secureTextEntry={hidePassword}
                    eye={!hidePassword ? 'eye' : 'eye-off'}
                    onEyePress={() => setHidePassword(!hidePassword)}
                    onChange={handleChange('password')}
                    margin={20}
                  />
                  {errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
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
                    disabled={!isValid || phoneNumber.length < 8 ? true : false}
                    onPress={() => handleSubmit()}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </>
  );
}

const ResetPassSchema = Yup.object({
  fName: Yup.string().required('Please provide your first name'),
  lName: Yup.string().required('Please provide your last name'),
  IcPnum: Yup.string(),
  email: Yup.string(),
  password: Yup.string()
    .required('Please type your new password')
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Atleast have one digit, one captial letter and one special character.'
    ),
});
