import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';

import { widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';

const styles = StyleSheet.create({
  container: {
    width: widthToDp(92),
    borderRadius: widthToDp(3),
    borderWidth: 0.5,
    borderColor: GlobalColors.lightGrey,
  },
  singleItem: {
    width: widthToDp(92),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: widthToDp(3),
    paddingVertical: widthToDp(3),
    paddingLeft: widthToDp(4),
    alignItems: 'center',
  },
  text: {
    color: GlobalColors.darkPrimary,
    fontFamily: GlobalFonts.light,
    fontSize: responsiveFontSize(20),
    paddingLeft: widthToDp(3),
  },
  divider: {
    borderBottomWidth: 2,
    borderColor: GlobalColors.primary,
    opacity: 0.3,
  },
  secondText: {
    color: GlobalColors.primary,
    fontFamily: fonts.mulishRegular,
    paddingRight: widthToDp(2),
  },
  iconWithSecondText: {
    flexDirection: 'row',
  },
});

export default styles;
