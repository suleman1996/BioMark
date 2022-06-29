import { StyleSheet } from 'react-native';

import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { RFValue } from 'react-native-responsive-fontsize';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    heading: {
      fontFamily: GlobalFonts.extraBold,
      fontSize: RFValue(18),
      color: colors.heading,
    },
    container: {
      flex: 1,
      paddingHorizontal: 20,
    },
    label: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.medium,
      color: colors.darkPrimary,
      marginTop: heightToDp(2),
      marginHorizontal: heightToDp(5),
      fontWeight: 'bold',
    },
    container2: {
      marginTop: 10,
      borderBottomWidth: 0,
      borderColor: colors.darkPrimary,
      backgroundColor: colors.gray,

      // height: 50,
    },
  });

export default makeStyles;
