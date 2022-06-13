import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalStyles } from 'utils/theme/global-styles';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      position: 'absolute',
      // borderWidth: 2,
      backgroundColor: colors.white,
      bottom: 0,
      paddingHorizontal: widthToDp(6),
      paddingVertical: heightToDp(3),
      ...GlobalStyles(colors).shadow,
    },
    title: {
      textAlign: 'center',
      color: colors.white,
      fontFamily: fonts.OpenSansBold,
    },
    button: {
      backgroundColor: colors.pureRed,
      paddingTop: heightToDp(2),
      paddingBottom: heightToDp(2),
      borderRadius: 8,
    },
  });

export default makeStyles;
