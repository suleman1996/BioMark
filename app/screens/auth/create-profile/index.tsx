/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import {
  FlatList,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Formik } from 'formik';
import { showMessage } from 'react-native-flash-message';
import * as Yup from 'yup';
import CountryPicker, {
  DEFAULT_THEME,
} from 'react-native-country-picker-modal';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import { Button } from 'components/button';
import { DatePicker, TextInput, ActivityIndicator, CheckBox } from 'components';

import { userService } from 'services/user-service/user-service';
import { RegisterUserErrorResponse } from 'types/auth/RegisterUser';
import { logNow } from 'utils/functions/log-binder';
import {
  getAuthAsyncStorage,
  resetAuthAsyncStorage,
} from 'services/async-storage/auth-async-storage';
import { loggedIn, loggedOut } from 'store/auth/auth-actions';

import colors from 'assets/colors';
import { BackIcon } from 'assets/svgs/index';

import styles from './styles';

export default function CreateProfile() {
  const dispatch = useDispatch();
  const dispatch3 = useDispatch();

  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState('MY');
  const [selectCountryCode, setSelectCountryCode] = useState('60');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const [date, setDate] = useState(new Date());
  const [isPickerShow, setIsPickerShow] = useState(false);

  async function getHasprofileAsyncStorage() {
    const data = await getAuthAsyncStorage();
    dispatch3(loggedIn(data));
    console.log('data', data);
  }

  //functions
  const signupApi = async (values: string) => {
    // setLoading(true);
    Keyboard.dismiss();
    const newDate = moment(date).format('YYYY-MM-DD');
    userService
      .createProfile(values, selectedGender.id, newDate)
      .then(async (res) => {
        logNow('signup res', res);
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

  const onSelect = (Country: any) => {
    setCountryCode(Country.cca2);
    setSelectCountryCode(Country.callingCode[0]);
  };

  const onBackPress = async () => {
    await resetAuthAsyncStorage();
    dispatch(loggedOut(true));
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
            <BackIcon onPress={() => onBackPress()} />
          </TouchableOpacity>
          <Text style={styles.signupText}>Personal Details</Text>
        </View>
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
          {({ handleChange, handleSubmit, errors }) => (
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
                <Text style={[styles.inputLablel, { marginTop: 20 }]}>
                  Identity Card/Passport Number
                </Text>
                <TextInput
                  placeholder="E.g.A1234567X"
                  onChange={handleChange('IcPnum')}
                  margin={20}
                />
                {errors.lName && (
                  <Text style={styles.errorMessage}>{errors.lName}</Text>
                )}
                <Text style={styles.inputLablel}>Country</Text>

                <View style={styles.countryPickerView}>
                  <CountryPicker
                    countryCode={countryCode}
                    withCountryNameButton={true}
                    withFilter={true}
                    preferredCountries={preferredCountries}
                    theme={{
                      ...DEFAULT_THEME,
                      backgroundColor: colors.whiteColor,
                      onBackgroundTextColor: colors.heading,
                      fontSize: 14,
                    }}
                    containerButtonStyle={styles.pickerButtonStyle}
                    onSelect={(Country) => onSelect(Country)}
                  />
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
                {selectedGender == '' && (
                  <Text style={styles.errorMessage}>Please select gender</Text>
                )}
                <Text style={styles.inputLablel}>Date of Birth</Text>
                <DatePicker
                  isPickerShow={isPickerShow}
                  setIsPickerShow={setIsPickerShow}
                  date={date}
                  setDate={setDate}
                />

                <View style={styles.aiContainer}>
                  <Text style={styles.heading}>Account Information</Text>
                  <Text style={styles.inputLablel}>Email</Text>
                  <TextInput
                    placeholder="E.g. Sample@email.com"
                    onChange={handleChange('email')}
                    margin={20}
                    keyboardType="email-address"
                  />
                </View>
                <View style={styles.tcText}>
                  <CheckBox checked={checked} setChecked={setChecked} />
                  {/* <TouchableOpacity> */}
                  <Text style={styles.tcTextStyle}>
                    <Text>I accept the </Text>
                    <Text
                      style={{
                        color: colors.blue,
                        fontSize: 17,
                        textDecorationLine: 'underline',
                      }}
                    >
                      terms and condition
                    </Text>
                    <Text> and the </Text>
                    <Text
                      style={{
                        color: colors.blue,
                        fontSize: 17,
                        textDecorationLine: 'underline',
                      }}
                    >
                      privacy policy.
                    </Text>
                  </Text>
                  {/* </TouchableOpacity> */}
                </View>
                <TouchableOpacity>
                  <Button
                    title="Continue"
                    // disabled={!isValid || phoneNumber.length < 8 ? true : false}
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
});
