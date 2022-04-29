import { StyleSheet } from 'react-native';
import { widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalColors } from 'utils/theme/global-colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: widthToDp(4),
    backgroundColor: GlobalColors.white,
  },
});
