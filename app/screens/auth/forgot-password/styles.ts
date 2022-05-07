import { StyleSheet } from 'react-native';

import colors from 'assets/colors';
import fonts from 'assets/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  body: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: colors.whiteColor,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: fonts.regular,
    fontSize: 16,
    marginVertical: 20,
    color: colors.black,
    marginBottom: 10,
  },
  inputLablel: {
    fontFamily: fonts.bold,
    color: colors.heading,
    fontSize: 15,
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 15,
  },
  errorMessage: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.danger,
    marginLeft: 10,
  },
});

export default styles;
