import { StyleSheet } from 'react-native';
import fonts from '../../assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    countryPickerView: {
      alignSelf: 'center',
      backgroundColor: colors.inputBg,
      justifyContent: 'flex-start',
      borderRadius: 9,
      alignContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      height: 45,
    },
    pickerButtonStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 5,
    },
    textInputStyle: {
      paddingLeft: 10,
      color: colors.black,
      fontSize: 14,
      width: '60%',
      fontFamily: fonts.regular,
      paddingRight: 10,
    },
  });

export default makeStyles;
