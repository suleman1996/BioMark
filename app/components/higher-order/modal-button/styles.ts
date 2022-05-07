import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalColors } from 'utils/theme/global-colors';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const styles = StyleSheet.create({
  container: {
    width: widthToDp(40),
    height: heightToDp(7),
    backgroundColor: GlobalColors.white,
    borderRadius: widthToDp(2),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  label: {
    fontSize: responsiveFontSize(17),
    fontFamily: GlobalFonts.regular,
    color: GlobalColors.gray,
  },
});
