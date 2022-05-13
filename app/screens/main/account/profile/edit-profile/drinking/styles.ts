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
  drinkingView: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ffffff50',
  },
});

export default styles;
