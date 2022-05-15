import { StyleSheet } from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    borderStyleBase: {
      width: 30,
      height: 45,
    },
    borderStyleHighLighted: {
      borderColor: colors.greenish,
    },
    underlineStyleBase: {
      width: 30,
      height: 45,
      borderWidth: 0,
      borderBottomWidth: 1,
    },
    underlineStyleHighLighted: {
      borderColor: colors.greenish,
    },
    codeInputFieldStyle: {
      borderWidth: 0,
      borderBottomWidth: 1,
      borderBottomColor: colors.heading,
      color: colors.black,
    },
  });
export default makeStyles;
