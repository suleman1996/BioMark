import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { StyleSheet } from 'react-native';

import fonts from 'assets/fonts';
import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    navBar: {
      backgroundColor: colors.blue,
      height: 80,
      width: '100%',
      marginBottom: 15,
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
    headingText: {
      fontFamily: fonts.bold,
      fontSize: 16,
      color: colors.heading,
    },

    lowerContainer: {
      backgroundColor: colors.white,
      alignItems: 'center',
      flex: 1,
      //   marginBottom: heightToDp(10),
      borderStartColor: 'red',
    },
    pagerView: {
      width: widthToDp(92),
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: heightToDp(1.5),
      paddingBottom: heightToDp(10),
      //   backgroundColor: 'yellow',
    },
    tabScrollContainerSize: { paddingBottom: heightToDp(10) },
    tabNameContainer: {
      //   width: widthToDp(90),
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingTop: heightToDp(2),
      //   width: '100%',
    },
    tab: {
      marginRight: 2,
      paddingHorizontal: widthToDp(3),
      alignItems: 'center',
      borderColor: colors.lightDark,
      backgroundColor: colors.lightPrimary,
      borderRadius: 5,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
    tabText: {
      fontFamily: GlobalFonts.bold,
      color: colors.darkPrimary,
      fontSize: responsiveFontSize(20),
    },

    outerTarget: {
      borderWidth: 0.7,
      borderColor: colors.darkGray,
      borderRadius: 8,
      marginVertical: 10,
    },
    targetsContainer: {
      paddingHorizontal: 15,
      borderColor: colors.darkGray,
      paddingVertical: 15,
      borderBottomWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    targetText: {
      fontFamily: fonts.mulishRegular,
      fontSize: 17,
    },
    targetLabel: {
      fontFamily: fonts.mulishBold,
      fontSize: 17,
    },
    fixedIconView: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      marginRight: 20,
      marginBottom: 20,
    },
  });
export default makeStyles;
