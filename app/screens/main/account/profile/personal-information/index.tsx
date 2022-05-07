import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';

import { RadioButton } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';

import { TitleWithBackLayout } from 'components/layouts';
import { Button } from 'components/button';
import { InputWithLabel } from 'components/base';
import { GlobalColors } from 'utils/theme/global-colors';
import { DatePicker, ActivityIndicator } from 'components';
import AuthContext from 'utils/auth-context';
import { userService } from 'services/user-service/user-service';
import fonts from 'assets/fonts';
import { Button as ButtonComponent } from 'components/base';

import { styles } from './styles';

const PersonalInformationScreen = () => {
  const authContext = React.useContext(AuthContext);

  const [value, setValue] = useState(
    authContext?.userData?.gender?.id == 1 ? 'first' : 'second'
  );
  const [firstName, setFirstName] = useState(authContext?.userData?.first_name);
  const [lastName, setLastName] = useState(authContext?.userData?.last_name);
  const [date, setDate] = useState(authContext?.userData?.birth_date);
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [genderWar, setGenderWarn] = useState(false);
  const [genderCheck, setGenderCheck] = useState(false);
  const [genderDisable, setGenderDisable] = useState(false);

  React.useEffect(() => {
    setGenderCheck(true);
  }, [value]);

  const RenderConfirmation = ({ visible = false }) => {
    if (!visible) {
      return null;
    }

    return (
      <View style={styles.overLay}>
        <View
          style={{
            backgroundColor: GlobalColors.white,
            width: '90%',
            borderRadius: 5,
            padding: 20,
          }}
        >
          <Text
            style={{
              fontFamily: fonts.bold,
              color: GlobalColors.heading,
              fontSize: 18,
              marginBottom: 30,
            }}
          >
            Are you sure?
          </Text>

          <Text
            style={{
              fontFamily: fonts.regular,
              color: GlobalColors.lightGrey,
              fontSize: 14,
              marginBottom: 40,
            }}
          >
            Are you sure you want to change your gender? Your diabetes medical
            history will be updated to Unsure. You will need to update your
            personal medical history again.
          </Text>
          <ButtonComponent onPress={() => handleUpdateProfile()} title="yes" />
          <TouchableOpacity onPress={() => setGenderWarn(false)}>
            <Text
              style={{
                marginTop: 15,
                fontFamily: fonts.regular,
                color: GlobalColors.lightGrey,
                fontSize: 14,
                marginBottom: 10,
                alignSelf: 'center',
              }}
            >
              Exit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleUpdateProfile = async () => {
    Keyboard.dismiss();
    setGenderWarn(false);
    const gender = value == 'first' ? 1 : 0;
    const ic_number = authContext?.userData?.ic_number;
    const email = authContext?.userData?.email;
    try {
      setIsLoading(true);
      const result = await userService.updateProfile(
        firstName,
        lastName,
        date,
        gender,
        ic_number,
        email
      );
      console.log('success ', result.data);

      authContext?.setUserData(result.data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('Error ', error);
      if (error.errMsg.status == '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error.errMsg.status == false) {
        showMessage({
          message: error.errMsg.data.error,
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

  return (
    <TitleWithBackLayout title="Personal Information">
      <ActivityIndicator visible={isLoading} />
      <RenderConfirmation visible={genderWar} />
      <ScrollView style={styles.container}>
        <InputWithLabel
          label="First Name"
          onChange={(text) => setFirstName(text)}
          value={firstName}
        />
        <InputWithLabel
          label="Last Name"
          onChange={(text) => setLastName(text)}
          value={lastName}
        />
        <Text style={styles.label}>Date of Birth</Text>
        {/* <DatePicker width={'100%'} /> */}
        <DatePicker
          isPickerShow={isPickerShow}
          setIsPickerShow={setIsPickerShow}
          date={date}
          setDate={setDate}
          width="100%"
        />
        <Text style={styles.label}>Gender</Text>
        <RadioButton.Group
          onValueChange={(newValue) => {
            setValue(newValue), setGenderDisable(true);
          }}
          value={value}
        >
          <View style={styles.radioContainer}>
            <RadioButton color={GlobalColors.darkPrimary} value="first" />
            <Text style={styles.radioText}>Male</Text>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton color={GlobalColors.darkPrimary} value="second" />
            <Text style={styles.radioText}>Female</Text>
          </View>
        </RadioButton.Group>
      </ScrollView>
      <Button
        disabled={
          // firstName?.length > 0 &&
          // lastName?.length > 0 &&
          firstName.length > authContext?.userData?.first_name.length ||
          lastName.length > authContext?.userData?.last_name.length ||
          date != authContext?.userData?.birth_date ||
          genderDisable == true
            ? false
            : true
        }
        title="Save & Continue"
        onPress={() => {
          !genderCheck ? handleUpdateProfile() : setGenderWarn(true);
        }}
      />
    </TitleWithBackLayout>
  );
};

export default PersonalInformationScreen;
