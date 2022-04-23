import { StyleSheet } from "react-native";
import { heightToDp, widthToDp } from "../../../../../utils/functions/responsiveDimentions";
import { responsiveFontSize } from "../../../../../utils/functions/responsiveText";
import { GlobalFonts } from "../../../../../utils/theme/fonts";
import { GlobalColors } from "../../../../../utils/theme/globalColors";
import { GlobalStyles } from "../../../../../utils/theme/globalStyles";

export const styles = StyleSheet.create({
  container: {
    width: widthToDp(100),
    paddingHorizontal: widthToDp(6),
    paddingVertical: heightToDp(2.5),
    flex: 1,
    alignSelf: 'stretch',
    flexGrow: 1,
  },
  textHeader: {
    fontFamily: GlobalFonts.extraLight,
    color: GlobalColors.darkPrimary,
    fontSize: responsiveFontSize(21),
  },
  bottomBtnContainer: {
    marginBottom: heightToDp(4),
    marginTop: heightToDp(2),
    justifyContent: 'flex-end'
  },
});