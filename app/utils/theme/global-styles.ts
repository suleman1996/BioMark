import { heightToDp, widthToDp } from '../functions/responsive-dimensions';
import { responsiveFontSize } from '../functions/responsive-text';
import { GlobalFonts } from './fonts';

export const GlobalStyles: any = (colors: any) => ({
  question: {
    fontSize: responsiveFontSize(20),
    fontFamily: GlobalFonts.extraBold,
    color: colors.darkPrimary,
    marginTop: heightToDp(2),
  },
  shadow: {
    shadowOffset: { width: 5 },
    shadowColor: 'lightgray',
    shadowOpacity: 0.4,
    elevation: 2,
  },
  shadow2: {
    shadowOffset: { width: 5 },
    shadowColor: 'gray',
    shadowOpacity: 0.7,
    elevation: 0.5,
    // background color must be set
    backgroundColor: 'transparent', // invisible color
  },
  qLabel: {
    paddingHorizontal: widthToDp(4),
    fontSize: responsiveFontSize(23),
    fontFamily: GlobalFonts.medium,
    color: colors.darkPrimary,
    marginTop: heightToDp(2),
  },
  paddingHorizontal: {
    paddingHorizontal: widthToDp(4),
  },
  bottomBtnWithShadow: {
    marginTop: heightToDp(4),
    paddingHorizontal: widthToDp(6),
    paddingBottom: heightToDp(2),
    backgroundColor: colors.white,
    borderTopWidth: heightToDp(0.5),
    borderTopColor: colors.gray,
    paddingTop: heightToDp(2.5),
    alignItems: 'center',
  },
  text1: {
    fontSize: responsiveFontSize(20),
    fontFamily: GlobalFonts.medium,
    color: colors.darkPrimary,
  },
  headerLine: {
    width: widthToDp(86),
    borderWidth: 1,
    borderColor: colors.lightPrimary,
  },
  redDot: {
    width: widthToDp(2.4),
    height: widthToDp(2.4),
    backgroundColor: colors.red,
    borderRadius: widthToDp(1.2),
    position: 'absolute',
    right: 3,
    top: 3,
  },
});
