import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import DependantsList from '../../../../../components/ui/dependantsList';
import {
  heightToDp,
  widthToDp,
} from '../../../../../utils/functions/responsiveDimentions';
import {GlobalColors} from '../../../../../utils/theme/globalColors';
import {GlobalStyles} from '../../../../../utils/theme/globalStyles';
import {GlobalFonts} from '../../../../../utils/theme/fonts';
import {responsiveFontSize} from '../../../../../utils/functions/responsiveText';
import InputWithLabel from '../../../../../components/base/inputWithLabel/index';
import DocumentTypeChooser from '../../../../../components/ui/documentTypeChooser/index';
import PhoneNumberWithLabel from '../../../../../components/base/phone-with-label/index';
import DatePicker from '../../../../../components/date-picker/date-picker';
import BoxSelector from '../../../../../components/higher-order/box-selector';
import RelationMenu from '../../../../../components/higher-order/relation-menu';
import ButtonComponent from '../../../../../components/base/button';

const EditDependantScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: heightToDp(20)}}>
          <Text style={styles.headerText}>Enter your Dependant Details</Text>
          <InputWithLabel label="First Name" placeholder={''} />
          <InputWithLabel label="Last Name" placeholder={''} />
          <PhoneNumberWithLabel label="Mobile Number" placeholder={''} />
          <InputWithLabel placeholder="E.g. Sample@email.com" label="Email" />
          <Text style={styles.label}>Date of Birth</Text>
          <DatePicker width={'100%'} />
          <InputWithLabel label="NRIC /Passport Number" placeholder={''} />
          <BoxSelector
            label={'Gender'}
            options={['Male', 'Female', 'Others']}
          />
          <RelationMenu label={'Relation'} options={undefined} />
          <BoxSelector label={'Document Type'} options={['IC', 'Passport']} />
          <View style={styles.bottomBtnContainer}>
            <ButtonComponent onPress={undefined} title={'Add New Dependant'} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default EditDependantScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    marginHorizontal: widthToDp(4),
    marginVertical: widthToDp(3),
    flex: 1,
    backgroundColor: GlobalColors.white,
    borderRadius: widthToDp(3),
    ...GlobalStyles.shadow,
    paddingHorizontal: widthToDp(3),
    paddingVertical: widthToDp(2),
  },
  headerText: {
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
    fontSize: responsiveFontSize(21),
  },
  label: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
    marginTop: heightToDp(2),
  },
  bottomBtnContainer: {
    marginTop: heightToDp(4),
  },
});
