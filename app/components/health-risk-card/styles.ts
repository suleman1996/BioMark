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
      marginHorizontal: widthToDp(2),
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
    green: {
      height: 20,
      width: 20,
    },
  });
export default makeStyles;
