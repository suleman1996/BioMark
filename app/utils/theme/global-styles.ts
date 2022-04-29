import { heightToDp, widthToDp } from '../functions/responsive-dimensions';
import { responsiveFontSize } from '../functions/responsive-text';
import { GlobalFonts } from './fonts';
import { GlobalColors } from './global-colors';

export const GlobalStyles = {
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
    color: GlobalColors.darkPrimary,
    marginTop: heightToDp(2),
  },
  paddingHorizontal: {
    paddingHorizontal: widthToDp(4),
  },
  bottomBtnWithShadow: {
    marginTop: heightToDp(4),
    paddingHorizontal: widthToDp(6),
    paddingBottom: heightToDp(2),
    backgroundColor: GlobalColors.white,
    borderTopWidth: heightToDp(0.5),
    borderTopColor: GlobalColors.gray,
    paddingTop: heightToDp(2.5),
    alignItems: 'center',
  },
};
