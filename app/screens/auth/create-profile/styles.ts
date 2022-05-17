import { StyleSheet } from 'react-native';

import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    signupNav: {
      paddingTop: 40,
      width: '100%',
      backgroundColor: colors.white,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    csNav: {
      alignItems: 'center',
      marginHorizontal: 15,
      flexDirection: 'row',
      marginBottom: 20,
    },
    signupText: {
      fontFamily: fonts.regular,
      fontSize: 15,
      color: colors.black,
      marginLeft: 10,
    },
    stepIndicator: {
      labelSize: 12,
      stepStrokeWidth: 0,
      stepIndicatorSize: 40,
      currentStepIndicatorSize: 40,
      stepIndicatorLabelFontSize: 15,
      currentStepIndicatorLabelFontSize: 15,
      stepStrokeCurrentColor: colors.blue,
      stepIndicatorCurrentColor: colors.blue,
      stepIndicatorLabelCurrentColor: colors.white,
      stepIndicatorUnFinishedColor: colors.lightBlue,
      labelColor: colors.lightGrey,
      currentStepLabelColor: colors.darBlue,
      separatorFinishedColor: colors.blue,
      separatorUnFinishedColor: colors.lightBlue,
    },
    biContainer: {
      flex: 1,
      borderRadius: 8,
      backgroundColor: colors.white,
      borderColor: colors.inactive,
      marginHorizontal: 15,
      marginBottom: 10,
      elevation: 6,
      marginTop: 10,
    },
    heading: {
      fontFamily: fonts.extraBold,
      fontSize: 20,
      marginHorizontal: 20,
      color: colors.heading,
      marginTop: 5,
      marginBottom: -20,
    },
    inputLablel: {
      marginHorizontal: 20,
      marginTop: 20,
      fontFamily: fonts.semiBold,
      color: colors.heading,
      fontSize: 15,
    },
    ChoiceBtnDOB: {
      width: '100%',
      alignItems: 'center',
      paddingVertical: 10,
    },
    aiContainer: {
      borderRadius: 8,
      backgroundColor: colors.white,
      marginHorizontal: 5,
      borderColor: 'grey',
      paddingBottom: 15,
      marginTop: 20,
    },
    checkbox: {
      alignSelf: 'center',
    },
    tcText: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 30,
    },
    tcTextStyle: {
      fontSize: 17,
      marginTop: 20,
      flexDirection: 'row',
      fontFamily: fonts.regular,
      color: colors.black,
    },
    errorMessage: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: colors.danger,
      marginLeft: 25,
    },
    radioButton: {
      height: 40,
      width: 100,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginRight: 10,
      marginLeft: 5,
      marginVertical: 5,
      // borderWidth: 0.5,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 4,
    },
    radioText: {
      fontFamily: fonts.regular,
      fontSize: 14,
    },
    pickerButtonStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 5,
      // width:310,
      // borderWidth:1
    },
    countryPickerView: {
      alignSelf: 'center',
      backgroundColor: colors.inputBg,
      justifyContent: 'flex-start',
      borderRadius: 9,
      alignContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      height: 45,
      width: '90%',
    },
  });

export default makeStyles;
