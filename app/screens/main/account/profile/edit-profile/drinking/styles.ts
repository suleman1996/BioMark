import { StyleSheet } from 'react-native';

import { heightToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    radioContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
      borderRadius: 3,
    },
    radioText: {
      fontSize: responsiveFontSize(18),
      fontFamily: GlobalFonts.light,
    },
    label: {
      fontSize: responsiveFontSize(18),
      fontFamily: colors.medium,
      color: colors.darkPrimary,
      marginTop: heightToDp(2),
      fontWeight: 'bold',
    },
    drinkingView: {
      flexDirection: 'row',
      height: 50,
      alignItems: 'center',
      marginBottom: 20,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#ffffff50',
    },
  });

export default makeStyles;
