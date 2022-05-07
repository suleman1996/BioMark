import { StyleSheet } from 'react-native';
import { GlobalColors } from 'utils/theme/global-colors';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalStyles } from 'utils/theme/global-styles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    // borderWidth: 2,
    backgroundColor: GlobalColors.white,
    bottom: 0,
    paddingHorizontal: widthToDp(6),
    paddingVertical: heightToDp(3),
    ...GlobalStyles.shadow,
  },
});
