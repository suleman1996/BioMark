import { StyleSheet } from 'react-native';

import fonts from 'assets/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    label: {
      fontSize: responsiveFontSize(22),
      fontFamily: fonts.mulishSemiBold,
      marginTop: 15,
      marginBottom: 10,
      color: colors.shineBlue,
    },
    container: {
      borderBottomColor: colors.inputBg,
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: 8,
      height: 44,
      backgroundColor: colors.inputBg,
    },
    datePickerStyle: {
      alignSelf: 'center',
      width: '100%',
    },
    dateText: {
      marginLeft: 15,
      color: colors.black,
    },
  });
export default makeStyles;
