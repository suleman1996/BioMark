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
    text: {
      color: colors.navyblue,
      fontSize: responsiveFontSize('17'),
      marginTop: heightToDp(2),
      marginHorizontal: widthToDp(8),
      marginBottom: heightToDp(4),
    },
    bullets: {
      height: 5,
      width: 5,
      borderRadius: 20,
      backgroundColor: colors.navyblue,
      marginTop: heightToDp(1),
    },
    flatlistText: {
      color: colors.heading,
      marginHorizontal: widthToDp(2),
      fontFamily: fonts.OpenSansRegular,
    },
    flatlistView: {
      flexDirection: 'row',
      marginHorizontal: widthToDp(15),
      marginTop: heightToDp(2),
    },
    checkboxView: {
      flexDirection: 'row',
      marginTop: heightToDp(4),
      marginHorizontal: widthToDp(5),
      marginBottom: 10,
    },
    checkboXText: {
      color: colors.heading,
      marginHorizontal: widthToDp(5),
      fontFamily: fonts.OpenSansRegular,
    },
    gradientButtonView: {
      marginHorizontal: 20,
    },
  });
export default makeStyles;
