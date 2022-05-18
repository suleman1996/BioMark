import { StyleSheet } from 'react-native';

// import { responsiveFontSize } from 'utils/functions/responsive-text';
// import { GlobalFonts } from 'utils/theme/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
// import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    safeareaview: {
      flex: 1,
    },
    view: {
      backgroundColor: colors.white,
      height: heightToDp(10),
      top: -40,
      marginHorizontal: widthToDp(2),
      borderRadius: 10,
    },
  });
export default makeStyles;
