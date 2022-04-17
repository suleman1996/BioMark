import { StyleSheet } from "react-native";
import colors from "../../../assets/colors/colors";
import fonts from "../../../assets/fonts/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: fonts.light,
    fontSize: 18,
  },
});
