import { StyleSheet } from 'react-native';
import colors from '../../../assets/colors';
import fonts from '../../../assets/fonts';

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
    labelSize: 10,
    stepStrokeWidth: 0,
    stepIndicatorSize: 40,
    currentStepIndicatorSize: 40,
    stepIndicatorLabelFontSize: 20,
    currentStepIndicatorLabelFontSize: 20,
    stepStrokeCurrentColor: colors.blue,
    stepIndicatorCurrentColor: colors.blue,
    stepIndicatorLabelCurrentColor: colors.whiteColor,
    stepIndicatorLabelFinishedColor: colors.whiteColor,
    stepIndicatorFinishedColor: colors.blue,
    stepIndicatorUnFinishedColor: colors.lightBlue,
    labelColor: colors.placeHolder,
    currentStepLabelColor: colors.darBlue,
    separatorFinishedColor: colors.blue,
    separatorUnFinishedColor: colors.lightBlue,
  },
  OTPContainer: {
    flex: 1,

    borderRadius: 8,
    // borderWidth: 1,
    backgroundColor: colors.whiteColor,
    borderColor: colors.inactive,
    marginHorizontal: 15,
    // paddingBottom: 5,
    // elevation: 6,
    marginTop: 10,
    marginBottom: 20,
  },
  heading: {
    fontFamily: fonts.extraBold,
    fontSize: 20,
    marginHorizontal: 20,
    color: colors.heading,
    marginTop: 5,
    marginBottom: -20,
  },
  upperText: {
    fontSize: 13,
    marginTop: 20,
    marginHorizontal: 20,
    color: colors.black,
    // borderWidth: 2,
    flexDirection: 'row',
    fontFamily: fonts.regular,
  },
  callUsText: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  callUsTextStyle: {
    fontSize: 15,
    marginHorizontal: 20,
    // borderWidth: 2,
    flexDirection: 'row',
    fontFamily: fonts.regular,
    color: colors.black,
  },
});

export default styles;
