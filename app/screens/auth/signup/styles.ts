import { StyleSheet } from 'react-native';

import colors from 'assets/colors';
import fonts from 'assets/fonts';

const styles = StyleSheet.create({
  signupNav: {
    paddingTop: 20,
    width: '100%',
    backgroundColor: colors.whiteColor,
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
    labelFontFamily: fonts.mulishBold,
    currentStepIndicatorLabelFontSize: 15,
    stepStrokeCurrentColor: colors.blue,
    stepIndicatorCurrentColor: colors.blue,
    stepIndicatorLabelCurrentColor: colors.whiteColor,
    stepIndicatorUnFinishedColor: colors.lightBlue,
    labelColor: colors.placeHolder,
    currentStepLabelColor: colors.darBlue,
    separatorFinishedColor: colors.blue,
    separatorUnFinishedColor: colors.lightBlue,
  },
  biContainer: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: colors.whiteColor,
    borderColor: 'grey',
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
    fontFamily: fonts.mulishBold,
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
    backgroundColor: colors.whiteColor,
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
    // alignItems: 'center',
    marginHorizontal: 30,
  },
  tcTextStyle: {
    fontSize: 17,
    fontFamily: fonts.mulishRegular,
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
    shadowColor: '#000',
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
});

export default styles;
