import { StyleSheet } from 'react-native';

import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';

export const styles = StyleSheet.create({
  container: {
    marginTop: heightToDp(2),
  },
  label: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
  },
  textFieldStyle: {
    fontSize: responsiveFontSize(40),
    width: '80%',
    color: '#3D3D3D',
    backgroundColor: GlobalColors.gray,
    fontFamily: GlobalFonts.bold,
    borderWidth: 0,
    borderBottomWidth: 0,
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: GlobalColors.gray,
    alignItems: 'center',
    borderRadius: widthToDp(2),
  },
  popupMenu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: widthToDp(25),
  },
  singleMenuItem: {
    width: '100%',
  },
  menuText: {
    fontSize: responsiveFontSize(20),
    padding: widthToDp(2),
  },
});
