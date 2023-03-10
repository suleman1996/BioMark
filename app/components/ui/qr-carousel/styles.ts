import { StyleSheet } from 'react-native';
// import fonts from 'assets/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      height: heightToDp(50),
    },
    header: {
      fontSize: responsiveFontSize(22),
      fontFamily: GlobalFonts.semiBold,
      color: colors.darkPrimary,
      marginTop: heightToDp(3),
    },
    subHeader: {
      fontSize: responsiveFontSize(18),
      fontFamily: GlobalFonts.light,
      color: colors.black,
      marginBottom: heightToDp(2),
    },
    dotStyle: {
      backgroundColor: colors.white,
      borderColor: colors.inactive,
      borderWidth: 1,
      width: widthToDp(3.5),
      height: widthToDp(3.5),
      borderRadius: widthToDp(1.75),
      marginHorizontal: widthToDp(1),
    },
    activeDotStyle: {
      backgroundColor: colors.primary,
      color: colors.darkPrimary,
      borderColor: colors.darkPrimary,
      borderWidth: 1,
      width: widthToDp(3.5),
      height: widthToDp(3.5),
      borderRadius: widthToDp(1.75),
      marginHorizontal: widthToDp(1),
    },
    dotsContainerStyle: {
      paddingHorizontal: widthToDp(1),
      flexDirection: 'row',
      alignSelf: 'center',
      marginTop: heightToDp(2),
    },
    slide: {
      justifyContent: 'center',
      alignItems: 'center',
      width: widthToDp(100),
    },
    text: {
      color: '#1f2d3d',
      opacity: 0.7,
      fontSize: 48,
      fontWeight: 'bold',
    },
    bottomText1: {
      fontSize: responsiveFontSize(14),
      fontFamily: GlobalFonts.light,
      color: colors.inactive,
      marginTop: heightToDp(6),
      alignSelf: 'center',
    },
    bottomText2: {
      fontSize: responsiveFontSize(22),
      fontFamily: GlobalFonts.light,
      color: colors.inactive,
      alignSelf: 'center',
    },

    emptyContainer: {
      width: widthToDp(100),
      paddingTop: heightToDp(2),
      alignItems: 'center',
    },
    emptyText1: {
      fontSize: responsiveFontSize(22),
      fontFamily: GlobalFonts.extraBold,
      color: colors.darkPrimary,
      alignSelf: 'center',
    },
    emptyText2: {
      fontSize: responsiveFontSize(19),
      fontFamily: GlobalFonts.light,
      color: colors.black,
      alignSelf: 'center',
    },
    emptyText3: {
      fontSize: responsiveFontSize(19),
      fontFamily: GlobalFonts.light,
      marginTop: -heightToDp(0.5),
      color: colors.black,
      alignSelf: 'center',
    },
  });

export default makeStyles;
