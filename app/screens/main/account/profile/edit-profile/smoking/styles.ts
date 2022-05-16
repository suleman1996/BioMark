import { StyleSheet } from 'react-native';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.whiteColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontFamily: fonts.light,
      fontSize: 18,
    },
    label: {
      fontSize: responsiveFontSize(19),
      fontFamily: GlobalFonts.medium,
      color: colors.darkPrimary,
      marginTop: heightToDp(2),
      marginHorizontal: 15,
      fontWeight: 'bold',
    },
    radioContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 15,
      marginVertical: 8,
      borderRadius: 3,
    },
    radioText: {
      fontSize: responsiveFontSize(18),
      fontFamily: GlobalFonts.light,
    },
    textinputView: {
      marginHorizontal: heightToDp(2),
      marginTop: 10,
      borderColor: colors.darkPrimary,
    },
    container2: {
      marginHorizontal: heightToDp(2),
      marginTop: heightToDp(2),
      borderBottomWidth: 0,
      borderRadius: 8,
      borderColor: colors.darkPrimary,
      backgroundColor: colors.lightGray,
      height: 50,
    },
    bottomView: {
      width: '100%',
      height: 50,
      backgroundColor: colors.redish,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute', //Here is the trick
      bottom: 0,
    },
  });
export default makeStyles;
