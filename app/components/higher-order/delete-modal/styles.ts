import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';

export const styles = StyleSheet.create({
  container: {
    width: widthToDp(85),
    padding: widthToDp(4),
    borderRadius: widthToDp(3),
    backgroundColor: GlobalColors.white,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: heightToDp(2),
  },
  heading: {
    fontSize: responsiveFontSize(25),
    fontFamily: GlobalFonts.bold,
    color: GlobalColors.red,
  },
  subHeading: {
    fontSize: responsiveFontSize(17),
    fontFamily: GlobalFonts.regular,
  },
  yesBtn: {
    paddingHorizontal: widthToDp(8),
    paddingVertical: widthToDp(2),
    borderWidth: 0.5,
    borderRadius: widthToDp(3),
  },
  noBtn: {
    paddingHorizontal: widthToDp(8),
    paddingVertical: widthToDp(2),
    backgroundColor: GlobalColors.primary,
    borderRadius: widthToDp(3),
  },
  yesBtnText: {
    fontSize: responsiveFontSize(18),
    fontFamily: GlobalFonts.regular,
    color: GlobalColors.red,
  },
  noBtnText: {
    fontSize: responsiveFontSize(18),
    fontFamily: GlobalFonts.regular,
    color: GlobalColors.white,
  },
});
