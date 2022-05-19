import { StyleSheet } from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
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
