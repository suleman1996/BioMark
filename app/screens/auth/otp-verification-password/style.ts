import { StyleSheet } from 'react-native';

import colors from 'assets/colors';
import fonts from 'assets/fonts';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
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
    color: colors.heading,
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 15,
  },
  resendText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default styles;
