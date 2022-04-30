import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import StepIndicator from 'react-native-step-indicator';
import * as Yup from 'yup';
import moment from 'moment';

import colors from 'assets/colors';
import BackIcon from 'assets/svgs/back';
import Button from 'components/button/button';
import CheckBox from 'components/checkbox';
import DatePicker from 'components/date-picker';
import TextInput from 'components/input-field/text-input';
import ActivityIndicator from 'components/loader/activity-indicator';
import PhoneNumber from 'components/phone-number';
import { Nav_Screens } from 'navigation/constants';
import { navigate } from 'services/nav-ref';
import { userService } from 'services/user-service/user-service';
import { RegisterUserErrorResponse } from 'types/auth/RegisterUser';
import { logNow } from 'utils/functions/log-binder';

import styles from './styles';

export default function Signup() {
  //initial hooks define
  const navigations = useNavigation();

  //state
  const [hidePassword, setHidePassword] = useState(true);

  const labels = ['Personal Details', 'Verification', 'Confirmation']; //signup navigation labels
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState('MY');
  const [phoneNumber, setPhoneNumber] = useState(''); //International Phone Picker
  const [selectCountryCode, setSelectCountryCode] = useState('60');
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
        navigate(Nav_Screens.SignupVerificationScreen, { username, password });
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

  const ResetPassSchema = Yup.object({
    fName: Yup.string().required('Please provide your first name'),

    lName: Yup.string().required('Please provide your last name'),

    IcPnum: Yup.string(),
    email: Yup.string(),

    password: Yup.string().required('Please type your new password').min(8),
  });

  return (
    <>
      <ActivityIndicator visible={loading} />
      <View style={styles.signupNav}>
        <View style={styles.csNav}>
          <TouchableOpacity>
            <BackIcon onPress={() => navigations.goBack()} />
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
                  {/* international phone Picker */}
                  <PhoneNumber
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    setSelectCountryCode={setSelectCountryCode}
                    maxLength={numberCondition.max}
                  />
                  {(phoneNumber !== '' || errors.password) &&
                    phoneNumber.length < numberCondition.min && (
                      <Text style={styles.errorMessage}>
                        Must have {numberCondition.min}
                        {numberCondition.max !== numberCondition.min &&
                          -numberCondition.max}{' '}
                        characters
                      </Text>
                    )}
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
                    <TouchableOpacity
                      onPress={() =>
                        navigations.navigate(Nav_Screens.TermsAndPrivacy)
                      }
                    >
                      <Text
                        style={{
                          color: colors.blue,
                          fontSize: 17,
                          textDecorationLine: 'underline',
                          bottom: 2,
                        }}
                      >
                        terms and condition
                      </Text>
                    </TouchableOpacity>
                    <Text> and the </Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigations.navigate(Nav_Screens.TermsAndPrivacy)
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
                    </TouchableOpacity>
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
