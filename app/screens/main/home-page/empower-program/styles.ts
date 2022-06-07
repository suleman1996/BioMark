import { StyleSheet } from 'react-native';

import { responsiveFontSize } from 'utils/functions/responsive-text';
// import { GlobalFonts } from 'utils/theme/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    view: {
      marginTop: heightToDp(10),
    },
    text: {
      textAlign: 'center',
      color: colors.heading,
      fontSize: responsiveFontSize(28),
      marginTop: heightToDp(10),
      fontFamily: fonts.RobotoBold,
    },
    text2: {
      textAlign: 'center',
      color: colors.heading,
      fontSize: responsiveFontSize(20),
      marginHorizontal: widthToDp(4),
      marginTop: heightToDp(5),
      fontFamily: fonts.OpenSansRegular,
    },
    gradientButton: {
      marginTop: heightToDp(15),
    },
    gradientButton2: {
      marginTop: heightToDp(1),
      marginBottom: 10,
    },
    gradientButtonView: {
      marginHorizontal: widthToDp(8),
    },
  });
export default makeStyles;
