import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.innerBackground,
      flex: 1,
      paddingHorizontal: widthToDp(7),
      paddingTop: heightToDp(3),
    },
    label: {
      fontSize: responsiveFontSize(18),
      fontFamily: fonts.mulishSemiBold,
      color: colors.darkPrimary,
      marginTop: heightToDp(3),
    },
    rowContainer: {
      marginTop: heightToDp(2),
      marginBottom: heightToDp(0.5),
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'space-between',
      paddingBottom: heightToDp(7),
    },
  });
export default makeStyles;
