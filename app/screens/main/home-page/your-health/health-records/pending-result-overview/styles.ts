import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
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
    uploadView: {
      flexDirection: 'row',
      marginHorizontal: widthToDp(3),
      marginTop: heightToDp(5),
    },
    uploadText: {
      color: colors.heading,
      marginHorizontal: widthToDp(3),
      fontSize: responsiveFontSize(18),
      fontFamily: fonts.OpenSansBold,
    },
    numberText: {
      color: colors.heading,
      fontSize: responsiveFontSize(18),
      fontFamily: fonts.OpenSansBold,
    },
    imageView: {
      height: heightToDp(22),
      width: widthToDp(40),
      backgroundColor: colors.fieldGrey,
      marginHorizontal: widthToDp(10),
      marginTop: heightToDp(2),
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageView2: {
      height: heightToDp(22),
      width: widthToDp(38),
      backgroundColor: colors.fieldGrey,
      marginHorizontal: widthToDp(5),
      marginTop: heightToDp(2),
      borderRadius: 8,
      alignItems: 'flex-end',
    },
    topView: {
      backgroundColor: 'white',
      marginTop: -18,
      borderRadius: 5,
      elevation: 15,
    },
    topView2: {
      flexDirection: 'row',
      paddingTop: 15,
      marginHorizontal: 10,
      paddingBottom: 15,
    },
    padImage: {
      height: 25,
      width: 25,
    },
    topViewText: {
      marginHorizontal: 10,
      color: colors.heading,
      fontFamily: fonts.OpenSansBold,
      fontSize: responsiveFontSize(17),
    },
    topViewText2: {
      marginHorizontal: 10,
      color: colors.fieldGrey,
    },
    topView3: {
      backgroundColor: colors.fieldGrey,
      flexDirection: 'row',
      padding: 5,
      alignItems: 'center',
      borderRadius: 15,
      marginHorizontal: 10,
      marginTop: 10,
    },
    topRoundView: {
      borderRadius: 20,
      backgroundColor: 'white',
      width: 15,
      height: 15,
    },
    topViewText3: {
      marginHorizontal: 8,
      color: 'black',
      fontFamily: fonts.OpenSansBold,
    },
    topView4: {
      flexDirection: 'row',
      marginTop: 30,
      marginHorizontal: 10,
    },
    topViewText4: {
      marginHorizontal: 10,
      color: colors.heading,
      fontFamily: fonts.mulishRegular,
    },
  });
export default styles;
