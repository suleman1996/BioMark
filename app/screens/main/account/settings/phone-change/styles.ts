import { StyleSheet } from "react-native";
import { widthToDp } from "../../../../../utils/functions/responsiveDimentions";
import { responsiveFontSize } from "../../../../../utils/functions/responsiveText";
import { GlobalFonts } from "../../../../../utils/theme/fonts";
import { GlobalColors } from "../../../../../utils/theme/globalColors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: widthToDp(6),
    paddingVertical: widthToDp(4),
  },
  phoneText: {
            fontSize: responsiveFontSize(23),
            fontFamily: GlobalFonts.medium,
            color: GlobalColors.darkPrimary
  }
});