import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';
// import { responsiveFontSize } from 'utils/functions/responsive-text';
// import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    miniHeader: {
      height: '6%',
      backgroundColor: colors.blue,
      paddingHorizontal: 15,
    },
    miniHeaderText: {
      color: colors.white,
      fontFamily: fonts.regular,
      fontSize: 14,
    },
    summaryContainer: {
      // height: 200,
      width: '100%',
      backgroundColor: colors.white,
      marginTop: 20,
      padding: 10,
      borderRadius: 5,

      borderBottomColor: colors.blue,
      borderBottomWidth: 8,
    },
    renderTitle: {
      fontFamily: fonts.bold,
      fontSize: 18,
      color: colors.heading,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    infoView: {
      width: '100%',
      backgroundColor: colors.lightBlue,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      marginVertical: 10,
    },
    infoText: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.bg,
      marginLeft: 10,
    },
    resultView: {
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      margin: 5,
    },
    resultViewHeader: {
      height: 50,
      flexDirection: 'row',
      borderRadius: 5,
    },
    resultViewBody: { paddingHorizontal: 10 },
    resultViewFooter: { paddingHorizontal: 10 },
    resultViewHeaderLeft: {
      width: '10%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    resultViewHeaderCenter: {
      width: '60%',
      justifyContent: 'center',
    },
    resultViewHeaderRight: {
      width: '30%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    radio: {
      height: 10,
      width: 10,

      borderRadius: 5,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,

      elevation: 9,
    },
    resultViewHeaderTitle: {
      fontFamily: fonts.bold,
      fontSize: 16,
    },
    resultViewHeaderSubTitle: {
      fontFamily: fonts.regular,
      fontSize: 16,
    },
    bodyText: {
      fontFamily: fonts.regular,
      color: colors.bg,
      marginTop: 10,
    },
    moreView: {
      flexDirection: 'row',
      borderWidth: 1.5,
      width: 130,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
      borderRadius: 30,
      marginVertical: 10,
    },
    moreText: {
      fontFamily: fonts.regular,
      marginLeft: 10,
      fontSize: 16,
    },
    overLay: {
      position: 'absolute',
      backgroundColor: '#3D3D3D90',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    overLayContainer: {
      padding: 20,
      backgroundColor: colors.white,
      width: '90%',
      borderRadius: 10,
    },
    overLayHeading: {
      fontFamily: fonts.bold,
      color: colors.heading,
      fontSize: 20,
      marginVertical: 10,
    },
    overLaySubHeading: {
      fontFamily: fonts.regular,
      fontSize: 18,
      marginLeft: 20,
      color: colors.lightGrey,
    },
  });
export default styles;
