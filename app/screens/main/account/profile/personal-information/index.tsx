import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import { RadioButton } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';

import { TitleWithBackLayout } from 'components/layouts';
import { Button } from 'components/button';
import { InputWithLabel, Button as ButtonComponent } from 'components/base';
import { ActivityIndicator } from 'components';
import { DatePickerModal } from 'components/base';

import AuthContext from 'utils/auth-context';
import { userService } from 'services/user-service/user-service';
import { goBack } from 'services/nav-ref';

import fonts from 'assets/fonts';

import makeStyles from './styles';
import { useTranslation } from 'react-i18next';

const PersonalInformationScreen = () => {
  const authContext = React.useContext(AuthContext);

  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = makeStyles(colors);

  const [value, setValue] = useState(
    authContext?.userData?.gender?.id == 1 ? 'first' : 'second'
  );
  const [firstName, setFirstName] = useState(authContext?.userData?.first_name);
  const [lastName, setLastName] = useState(authContext?.userData?.last_name);
  const [date, setDate] = useState(authContext?.userData?.birth_date);
  const [isLoading, setIsLoading] = useState(false);
  const [genderWar, setGenderWarn] = useState(false);
  const [genderDisable, setGenderDisable] = useState(false);

  const makingData = () => {
    if (genderDisable === true) {
      setGenderWarn(true);
    } else {
      handleUpdateProfile();
    }
  };
  const handleUpdateProfile = async () => {
    Keyboard.dismiss();
    setGenderWarn(false);
    const gender = value == 'first' ? 1 : 2;
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
      authContext?.setUserData(result.data);
      goBack();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      if (error?.errMsg?.status == 500) {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error?.errMsg?.status == false) {
        showMessage({
          message: error?.errMsg?.data?.error,
          type: 'danger',
        });
      } else {
        showMessage({
          message: error?.errMsg,
          type: 'danger',
        });
      }
    }
  };

  const RenderConfirmation = ({ visible = false }) => {
    if (!visible) {
      return null;
    }

    return (
      <View style={styles.overLay}>
        <View
          style={{
            backgroundColor: colors.white,
            width: '90%',
            borderRadius: 5,
            padding: 20,
          }}
        >
          <Text
            style={{
              fontFamily: fonts.bold,
              color: colors.heading,
              fontSize: 18,
              marginBottom: 30,
            }}
          >
            {t('userProfile.dialogs.confirm.title')}
          </Text>

          <Text
            style={{
              fontFamily: fonts.regular,
              color: colors.lightGrey,
              fontSize: 14,
              marginBottom: 40,
            }}
          >
            {t('userProfile.dialogs.confirm.description')}
          </Text>
          <ButtonComponent
            onPress={() => handleUpdateProfile()}
            title={t('userProfile.dialogs.confirm.buttonText')}
          />
          <TouchableOpacity onPress={() => setGenderWarn(false)}>
            <Text
              style={{
                marginTop: 15,
                fontFamily: fonts.regular,
                color: colors.lightGrey,
                fontSize: 14,
                marginBottom: 10,
                alignSelf: 'center',
              }}
            >
              {t('userProfile.dialogs.confirm.buttonCancelText')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <TitleWithBackLayout title={t('pages.personalInformation.title')}>
      <ActivityIndicator visible={isLoading} />
      <RenderConfirmation visible={genderWar} />
      <ScrollView style={styles.container}>
        <InputWithLabel
          label={t('pages.register.form.firstName')}
          onChange={(text) => setFirstName(text)}
          value={firstName}
        />
        <InputWithLabel
          label={t('pages.register.form.lastName')}
          onChange={(text) => setLastName(text)}
          value={lastName}
        />
        <Text style={styles.label}>{t('pages.register.form.dateOfBirth')}</Text>
        {/* <DatePicker width={'100%'} /> */}
        <DatePickerModal date={date} setDate={setDate} />
        <Text style={styles.label}>{t('pages.register.form.gender')}</Text>
        <RadioButton.Group
          onValueChange={(newValue) => {
            setValue(newValue), setGenderDisable(true);
          }}
          value={value}
        >
          <View style={styles.radioContainer}>
            <RadioButton.Android color={colors.darkPrimary} value="first" />
            <Text style={styles.radioText}>{t('common.gender.male')}</Text>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton.Android color={colors.darkPrimary} value="second" />
            <Text style={styles.radioText}>{t('common.gender.female')}</Text>
          </View>
        </RadioButton.Group>
      </ScrollView>
      <Button
        disabled={
          firstName.length > authContext?.userData?.first_name.length ||
          firstName.length < authContext?.userData?.first_name.length ||
          lastName.length > authContext?.userData?.last_name.length ||
          lastName.length < authContext?.userData?.last_name.length ||
          date != authContext?.userData?.birth_date ||
          genderDisable == true
            ? false
            : true
        }
        title={t('pages.medicalHistory.continue')}
        onPress={() => {
          makingData();
        }}
      />
    </TitleWithBackLayout>
  );
};

export default PersonalInformationScreen;
