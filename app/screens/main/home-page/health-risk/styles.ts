import { StyleSheet } from 'react-native';

import { responsiveFontSize } from 'utils/functions/responsive-text';
// import { GlobalFonts } from 'utils/theme/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    safeareaview: {
      flex: 1,
    },
    view: {
      backgroundColor: colors.white,
      zindex: 0,
      top: -40,
      marginHorizontal: widthToDp(3),
      borderRadius: 10,
      elevation: 3,
    },
    view2: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    diabetes: {
      color: colors.black,
      fontWeight: 'bold',
    },
    text: {
      color: colors.green,
      fontFamily: fonts.extraBold,
    },
    view3: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: widthToDp(3),
      marginTop: heightToDp(2),
      alignItems: 'center',
    },
    text2: {
      color: colors.green,
      textAlign: 'center',
      fontSize: responsiveFontSize('50'),
      fontFamily: fonts.OpenSansBold,
    },
    text3: {
      color: colors.heading,
      textAlign: 'justify',
      marginHorizontal: widthToDp(3),
      marginBottom: 10,
      marginTop: heightToDp(2),
      fontFamily: fonts.OpenSansRegular,
    },
    text4: {
      color: colors.navyblue,
      marginHorizontal: widthToDp(5),
      fontSize: responsiveFontSize('20'),
      fontWeight: 'bold',
    },
    text5: {
      color: colors.heading,
      marginTop: heightToDp(2),
      marginHorizontal: widthToDp(5),
      fontSize: responsiveFontSize('15'),
      paddingBottom: 30,
      fontFamily: fonts.OpenSansRegular,
    },
    flatlistView: {
      backgroundColor: colors.white,
      marginHorizontal: widthToDp(5),
      borderRadius: 10,
      marginBottom: 10,
      elevation: 3,
    },
    flatlisttext: {
      color: colors.black,
      fontWeight: 'bold',
      marginLeft: 5,
    },
    flatlistImage: {
      height: heightToDp(2),
      width: widthToDp(4),
    },
    flatlistView2: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: widthToDp(3),
      marginTop: heightToDp(2),
    },
    flatlisttext2: {
      color: colors.heading,
      marginHorizontal: widthToDp(8),
      marginBottom: 10,
      marginTop: heightToDp(1),
    },
    text6: {
      color: colors.black,
      marginHorizontal: widthToDp(5),
      marginTop: heightToDp(2),
      fontWeight: 'bold',
    },
    text7: {
      color: colors.smoke,
      marginHorizontal: widthToDp(5),
      fontSize: responsiveFontSize('13'),
      marginBottom: 1,
    },
  });
export default makeStyles;
