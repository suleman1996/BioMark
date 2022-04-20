import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import TitleWithBackLayout from '../../../../../components/layouts/back-with-title/index';
import Button from '../../../../../components/button/button';
import InputWithLabel from '../../../../../components/base/inputWithLabel/index';
import {GlobalColors} from '../../../../../utils/theme/globalColors';
import {
  heightToDp,
  widthToDp,
} from '../../../../../utils/functions/responsiveDimentions';
import DatePicker from '../../../../../components/date-picker/date-picker';
import {responsiveFontSize} from '../../../../../utils/functions/responsiveText';
import {GlobalFonts} from '../../../../../utils/theme/fonts';
import {Provider, Appbar, RadioButton} from 'react-native-paper';
import ButtonWithShadowContainer from '../../../../../components/base/button-with-shadow-container/index';
const PersonalInformationScreen = () => {
  const [value, setValue] = useState('first');
  const [firstName, setFirstName] = useState(false);
  const [lastName, setLastName] = useState('');
  return (
    <TitleWithBackLayout title="Personal Information">
      <ScrollView style={styles.container}>
        <InputWithLabel
          label="First Name"
          onChange={text => setFirstName(text)}
        />
        <InputWithLabel
          label="Last Name"
          onChange={text => setLastName(text)}
        />
        <Text style={styles.label}>Date of Birth</Text>
        <DatePicker width={'100%'} />
        <Text style={styles.label}>Gender</Text>
        <RadioButton.Group
          onValueChange={newValue => setValue(newValue)}
          value={value}>
          <View style={styles.radioContainer}>
            <RadioButton color={GlobalColors.darkPrimary} value="first" />
            <Text style={styles.radioText}>Male</Text>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton color={GlobalColors.darkPrimary} value="second" />
            <Text style={styles.radioText}>Female</Text>
          </View>
        </RadioButton.Group>
        <View>
        </View>
      </ScrollView>
          <Button
            disabled={
              firstName.length > 0 && lastName.length > 0 ? false : true
            }
            title="Save & Continue"
          />
    </TitleWithBackLayout>
  );
};

export default PersonalInformationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.white,
    flex: 1,
    paddingHorizontal: widthToDp(4),
  },
  label: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
    marginTop: heightToDp(2),
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    fontSize: responsiveFontSize(18),
    fontFamily: GlobalFonts.light,
  },
});
