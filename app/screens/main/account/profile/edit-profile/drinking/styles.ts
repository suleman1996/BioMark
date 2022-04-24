import { StyleSheet } from 'react-native';

import { heightToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalColors } from 'utils/theme/global-colors';
import { GlobalFonts } from 'utils/theme/fonts';

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 3,
  },
  radioText: {
    fontSize: responsiveFontSize(18),
    fontFamily: GlobalFonts.light,
  },
  label: {
    fontSize: responsiveFontSize(18),
    fontFamily: GlobalColors.medium,
    color: GlobalColors.darkPrimary,
    marginTop: heightToDp(2),
    fontWeight: 'bold',
  },
});

export default styles;
