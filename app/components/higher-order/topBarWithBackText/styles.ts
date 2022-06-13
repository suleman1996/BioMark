import { StyleSheet } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from './../../../utils/functions/responsive-text';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {},
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: widthToDp(4),
      paddingVertical: heightToDp(1.5),
      borderColor: colors.black,
    },
    topBarBackText: {
      fontFamily: GlobalFonts.regular,
      fontSize: responsiveFontSize(22),
      paddingLeft: widthToDp(6),
    },
  });
export default makeStyles;
