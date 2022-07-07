import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: widthToDp(6),
      paddingVertical: heightToDp(2),
      flex: 1,
      alignSelf: 'stretch',
      flexGrow: 1,
    },
    textHeader: {
      fontFamily: GlobalFonts.light,
      color: colors.darkPrimary,
      fontSize: responsiveFontSize(22),
    },
    bottomBtnContainer: {
      marginBottom: heightToDp(4),
      marginTop: heightToDp(2),
      justifyContent: 'flex-end',
    },
    passValue: {
      color: colors.darkPrimary,
      fontFamily: GlobalFonts.light,
      marginRight: widthToDp(4),
    },
    passValueContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    passValueProgress: {
      width: widthToDp(10),
      height: heightToDp(0.5),
      backgroundColor: colors.darkPrimary,
      borderRadius: widthToDp(2),
    },
  });
export default makeStyles;
