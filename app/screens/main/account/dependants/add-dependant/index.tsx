import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import DependantsList from '../../../../../components/ui/dependants-list';
import {
  heightToDp,
  widthToDp,
} from '../../../../../utils/functions/responsive-dimensions';
import {GlobalColors} from '../../../../../utils/theme/global-colors';
import {GlobalStyles} from '../../../../../utils/theme/global-styles';
import {GlobalFonts} from '../../../../../utils/theme/fonts';
import {responsiveFontSize} from '../../../../../utils/functions/responsive-text';
import InputWithLabel from '../../../../../components/base/input-with-label';
import DocumentTypeChooser from '../../../../../components/ui/document-type-chooser/index';
import PhoneNumberWithLabel from '../../../../../components/base/phone-with-label/index';
import DatePicker from '../../../../../components/date-picker';
import BoxSelector from '../../../../../components/higher-order/box-selector';
import RelationMenu from '../../../../../components/higher-order/relation-menu';
import ButtonComponent from '../../../../../components/base/button';
import {goBack} from '../../../../../services/nav-ref';

const AddDependantScreen = () => {
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
            <ButtonComponent onPress={() => goBack()} title={'Confirm'} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AddDependantScreen;

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
