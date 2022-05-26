import { StyleSheet } from 'react-native';

// import { responsiveFontSize } from 'utils/functions/responsive-text';
// import { GlobalFonts } from 'utils/theme/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
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
  });
export default makeStyles;
