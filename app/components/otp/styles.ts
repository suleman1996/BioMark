import { StyleSheet } from 'react-native';

import colors from 'assets/colors';

export const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  codeInputFieldStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.heading,
    color: colors.black,
  },
});
