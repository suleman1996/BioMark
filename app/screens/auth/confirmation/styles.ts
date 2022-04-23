import {StyleSheet} from 'react-native';
import colors from '../../../assets/colors';
import fonts from '../../../assets/fonts';

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
    labelSize: 10,
    stepStrokeWidth: 0,
    stepIndicatorSize: 40,
    currentStepIndicatorSize: 40,
    stepIndicatorLabelFontSize: 20,
    currentStepIndicatorLabelFontSize: 20,
    stepIndicatorLabelFontSize: 20,
    currentStepIndicatorLabelFontSize: 20,
    stepStrokeCurrentColor: colors.blue,
    stepIndicatorCurrentColor: colors.blue,
    stepIndicatorLabelCurrentColor: '#FFFFFF',
    stepIndicatorLabelFinishedColor: colors.whiteColor,
    stepIndicatorFinishedColor: colors.blue,
    stepIndicatorUnFinishedColor: '#C9E1F2',
    labelColor: '#8493AE',
    currentStepLabelColor: '#273859',
    separatorFinishedColor: colors.blue,
    separatorUnFinishedColor: '#C9E1F2',
  },
  STGContainer: {
    flex: 1,
    borderRadius: 8,
    height: '100%',
    backgroundColor: colors.whiteColor,
    justifyContent: 'center',
    marginHorizontal: 15,
    paddingTop: 40,
    marginTop: 10,
    elevation: 6,
    marginBottom: 10,
    // borderWidth: 1,
  },
  womanIcon: {
    alignSelf: 'center',
  },
  heading: {
    fontFamily: fonts.extraBold,
    alignSelf: 'center',
    fontSize: 25,
    marginHorizontal: 20,
    color: colors.heading,
    marginTop: 5,
    marginBottom: -20,
  },
  lowerText: {
    fontSize: 15,
    marginTop: 20,
    marginHorizontal: 50,
    lineHeight: 20,
    color: 'black',
    // borderWidth: 2,
    fontFamily: fonts.regular,
    textAlign: 'center',
    marginBottom: 190,
  },
});

export default styles;
