import { StyleSheet } from 'react-native';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';

const styles = StyleSheet.create({
  signupNav: {
    paddingTop: 20,
    width: '100%',
    backgroundColor: colors.whiteColor,
    shadowColor: '#000',
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
    stepIndicatorLabelFontSize: 20,
    currentStepIndicatorLabelFontSize: 20,
    stepStrokeCurrentColor: colors.blue,
    stepIndicatorCurrentColor: colors.blue,
    stepIndicatorLabelCurrentColor: '#FFFFFF',
    stepIndicatorUnFinishedColor: '#C9E1F2',
    labelColor: '#8493AE',
    currentStepLabelColor: '#273859',
    separatorFinishedColor: colors.blue,
    separatorUnFinishedColor: '#C9E1F2',
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
    fontFamily: fonts.extraBold,
    color: colors.heading,
    fontSize: 15,
  },
  ChoiceBtnDOB: {
    // flexDirection: 'row',
    // height: 50,
    width: '100%',
    // backgroundColor: 'yellow',
    alignItems: 'center',
    paddingVertical: 10,
  },
  aiContainer: {
    // flex: 1,
    // width: '100%',
    borderRadius: 8,
    backgroundColor: colors.whiteColor,
    marginHorizontal: 5,
    // borderWidth: 1,
    borderColor: 'grey',
    paddingBottom: 15,
    // elevation: 6,
    marginTop: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  tcText: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  tcTextStyle: {
    fontSize: 18,
    marginTop: 20,
    // marginHorizontal: 10,
    // borderWidth: 2,
    flexDirection: 'row',
    fontFamily: fonts.regular,
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
    borderWidth: 0.5,
  },
  radioText: {
    fontFamily: fonts.regular,
    fontSize: 14,
  },
});

export default styles;
