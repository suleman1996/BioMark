import { heightToDp, widthToDp } from "../functions/responsiveDimentions";
import { responsiveFontSize } from "../functions/responsiveText";
import { GlobalFonts } from "./fonts";
import { GlobalColors } from "./globalColors";

export const GlobalStyles = {
  shadow: {
    shadowOffset: {width: 5, height: -5},
    shadowColor: 'lightgray',
    shadowOpacity: 0.4,
    elevation: 2,
    // background color must be set
    // backgroundColor: '#0000', // invisible color
  },
  shadow2: {
    shadowOffset: {width: 5, height: -5},
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
    paddingHorizontal: widthToDp(4)
  }
};