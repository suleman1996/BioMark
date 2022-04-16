import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import TextInput from '../../components/input-field/text-input';
import EyeOn from '../../assets/svgs/eye-on';
import EyeOff from '../../assets/svgs/eye-off';
import Button from '../../components/button/button';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';
import BackIcon from '../../assets/svgs/back';
import StepIndicator from 'react-native-step-indicator';
import DatePicker from '../../components/date-picker/date-picker';
import CheckBox from '../../components/check-box/check-box';
import PhoneNumber from '../../components/phone-number/phone-number';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ActivityIndicator from '../../components/loader/activity-indicator';
import {signup} from '../../services/auth-service';
import {showMessage, hideMessage} from 'react-native-flash-message';

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
  const [gender, setGender] = useState([
    {id: 0, sex: 'Male'},
    {id: 1, sex: 'Female'},
    {id: 2, sex: 'Others'},
  ]);
  const [selectedGender, setSelectedGender] = useState('');
  const [numberCondition, setNumberCondition] = useState({min: 8, max: 11});
  const [checked, setChecked] = React.useState(false);

  //fuctions
  useEffect(() => {
    if (selectCountryCode == '60') setNumberCondition({min: 8, max: 11});
    else if (selectCountryCode == '63') setNumberCondition({min: 10, max: 10});
    else if (selectCountryCode == '65') setNumberCondition({min: 8, max: 8});
    else {
      setNumberCondition({min: 4, max: 13});
    }
  }, [selectCountryCode]);

  const signupApi = async password => {
    try {
      setLoading(true);
      Keyboard.dismiss();
      const result = await signup({
        registration: {
          username: `+${selectCountryCode}${phoneNumber}`,
          password: password,
          terms: true,
          group: 'patient',
        },
      });
      console.log('login success result ', result.data);
      navigations.navigate('SignupVerification', {
        useName: `+${selectCountryCode}${phoneNumber}`,
        password: password,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.errMsg.status == '500') {
        showMessage({
          message: "User already exist's",
          type: 'danger',
        });
      } else if (error.errMsg.status == false) {
        showMessage({
          message: error.errMsg.data.message,
          type: 'danger',
        });
      } else {
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
      }
    }
  };
  const handleSignup = async ({password}) => {
    if (phoneNumber == '' || gender == '') {
    } else if (checked == true) {
      console.log('trye');
      signupApi(password);
    } else {
      showMessage({
        message: 'Kindly accept terms and condition',
        type: 'warning',
      });
    }
  };

  const RenderRadio = ({item}) => (
    <TouchableOpacity
      onPress={() => setSelectedGender(item)}
      style={[
        styles.radioButton,
        {
          backgroundColor:
            item.id === selectedGender.id ? colors.blue : colors.whiteColor,
          borderColor:
            item.id === selectedGender.id ? colors.blue : colors.placeHolder,
        },
      ]}>
      <Text
        style={
          (styles.radioText,
          {
            color:
              item.id === selectedGender.id ? colors.whiteColor : colors.blue,
          })
        }>
        {item.sex}
      </Text>
    </TouchableOpacity>
  );

  const ResetPassSchema = Yup.object({
    fName: Yup.string().required('Please provide your first name'),

    lName: Yup.string().required('Please provide your last name'),

    IcPnum: Yup.string()
      .required('Please type your IC Number')
      .min(9, 'Invalid.'),

    email: Yup.string()
      .email('invalid Email.')
      .required('Please type your e-mail'),

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
          onSubmit={handleSignup}
          validationSchema={ResetPassSchema}>
          {({handleChange, handleSubmit, values, errors}) => (
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
                <Text style={[styles.inputLablel, {marginTop: 20}]}>
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
                    keyExtractor={item => item.id}
                    horizontal
                  />
                </View>
                {errors.password && selectedGender == '' && (
                  <Text style={styles.errorMessage}>Please select gender</Text>
                )}
                <Text style={styles.inputLablel}>Date of Birth</Text>
                <DatePicker />

                <Text style={[styles.inputLablel, {marginTop: 20}]}>
                  Identity Card/Passport Number
                </Text>
                <TextInput
                  placeholder="E.g.A1234567X"
                  onChange={handleChange('IcPnum')}
                  margin={20}
                />
                {errors.IcPnum && (
                  <Text style={styles.errorMessage}>{errors.IcPnum}</Text>
                )}
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
                    Keyboardtype="email-address"
                  />
                  {errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}

                  <Text style={styles.inputLablel}>Password</Text>
                  <TextInput
                    placeholder="Enter your new password..."
                    secureTextEntry={hidePassword}
                    eye={!hidePassword ? 'eye-off' : 'eye'}
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
                  <TouchableOpacity>
                    <Text style={styles.tcTextStyle}>
                      <Text>I accept the </Text>
                      <Text
                        style={{
                          color: colors.blue,
                          fontSize: 17,
                          textDecorationLine: 'underline',
                        }}>
                        terms and condition
                      </Text>
                      <Text> and the </Text>
                      <Text
                        style={{
                          color: colors.blue,
                          fontSize: 17,
                          textDecorationLine: 'underline',
                        }}>
                        privacy policy.
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <Button
                    disabled={false}
                    title="Continue"
                    // onPress={() => navigations.navigate('SignupVerification')}
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
