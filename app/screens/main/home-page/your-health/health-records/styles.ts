import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    navBar: {
      backgroundColor: colors.blue,
      height: 85,
      width: '100%',
    },
    navHeading: {
      fontFamily: fonts.bold,
      fontSize: 18,
      color: colors.white,
      paddingLeft: 21,
      paddingTop: 10,
      paddingBottom: 10,
    },
    navSearch: {
      width: '100%',
      marginHorizontal: 20,
    },
    navSearchInner: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 8,
    },
    containerBody: {
      flex: 1,
      paddingHorizontal: 15,
      paddingTop: 40,
      backgroundColor: 'white',
    },
    healthReports: {
      backgroundColor: '#C9E1F2',
      borderRadius: 8,
      paddingTop: 10,
    },
    text: {
      textAlign: 'center',
      fontSize: responsiveFontSize(20),
      color: colors.primary,
      fontFamily: fonts.OpenSansBold,
    },
    text2: {
      textAlign: 'center',
      marginTop: heightToDp(1),
      color: colors.black,
      fontFamily: fonts.mulishRegular,
      marginBottom: heightToDp(3),
    },
    latestResult: {
      fontSize: responsiveFontSize(20),
      color: colors.primary,
      fontFamily: fonts.OpenSansBold,
      marginTop: heightToDp(5),
    },
    view: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 10,
    },
    title: {
      flex: 1,
      fontSize: responsiveFontSize(20),
      marginHorizontal: 8,
      color: colors.heading,
      fontFamily: fonts.OpenSansBold,
    },
    text3: {
      flex: 1,
      fontSize: responsiveFontSize(15),
      marginHorizontal: widthToDp(13),
      color: colors.grey,
    },
    roundView: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'lightgrey',
      width: '40%',
      borderRadius: 10,
      justifyContent: 'center',
      marginHorizontal: widthToDp(20),
      marginTop: 10,
      flex: 1,
    },
    round: {
      backgroundColor: 'green',
      borderRadius: 30,
      width: widthToDp(4),
      height: heightToDp(2),
      marginHorizontal: widthToDp(2),
    },
    text4: {
      flex: 1,
      marginHorizontal: 5,
      fontFamily: fonts.OpenSansBold,
    },
    bottomView: {
      backgroundColor: colors.primary,
      height: 5,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      marginTop: 12,
    },
    uploadResult: {
      marginTop: heightToDp(4),
    },
    filterView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: heightToDp(8),
      alignItems: 'center',
    },
    text5: {
      color: colors.primary,
      fontFamily: fonts.OpenSansBold,
      fontSize: responsiveFontSize(18),
    },
    pastResultView: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#C9E1F2',
      paddingTop: heightToDp(2),
      paddingBottom: heightToDp(2),
      marginHorizontal: widthToDp(2),
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.primary,
      marginTop: heightToDp(3),
    },
    text6: {
      flex: 1,
      paddingHorizontal: widthToDp(1),
    },
    prImage: {
      height: 20,
      width: 20,
      marginHorizontal: widthToDp(0.1),
    },
    pastResultView2: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: heightToDp(2),
      paddingBottom: heightToDp(2),
      marginHorizontal: widthToDp(2),
      borderColor: colors.primary,
    },
    text7: {
      color: colors.heading,
      fontFamily: fonts.OpenSansBold,
      fontSize: responsiveFontSize(18),
    },
  });
export default styles;
