import { StyleSheet } from 'react-native';

import colors from 'assets/colors';
import fonts from 'assets/fonts';

export const styles = StyleSheet.create({
  overLay: {
    position: 'absolute',
    backgroundColor: colors.bg,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  view: {
    width: '90%',
    backgroundColor: colors.whiteColor,
    borderRadius: 5,
    padding: 20,
    paddingBottom: 10,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 15,
    textAlign: 'center',
    color: colors.placeHolder,
  },
  heading: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    color: colors.blue,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
