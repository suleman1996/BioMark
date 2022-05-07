import { StyleSheet } from 'react-native';

import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';

export const styles = StyleSheet.create({
  title: {
    fontFamily: GlobalFonts.bold,
    fontSize: 14,
    color: GlobalColors.heading,
    marginTop: 20,
  },
  bar: {
    backgroundColor: GlobalColors.fieldGrey,
    width: '100%',
    height: 10,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'row',
  },
  smallDot: {
    backgroundColor: GlobalColors.heading,
    height: '100%',
    width: 10,
    borderRadius: 5,
  },
  bigDot: {
    backgroundColor: GlobalColors.heading,
    height: 25,
    width: 25,
    borderRadius: 13,
    top: -8,
  },
  selectView: {
    width: '20%',
    alignItems: 'center',
  },
  headingView: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
  },
  headingText: {
    fontFamily: GlobalFonts.regular,
    fontSize: 12,
    color: GlobalColors.heading,
  },
});
