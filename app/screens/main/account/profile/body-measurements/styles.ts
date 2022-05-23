import { StyleSheet } from 'react-native';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      borderColor: colors.danger,
      flexDirection: 'column',
      color: colors.blue,
    },
    label: {
      fontSize: responsiveFontSize(22),
      fontFamily: GlobalFonts.medium,
      color: colors.darkPrimary,
      marginTop: heightToDp(2),
    },
    radioContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    radioText: {
      fontSize: responsiveFontSize(18),
      fontFamily: GlobalFonts.light,
    },
  });
export default makeStyles;
