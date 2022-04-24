import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: widthToDp(4),
  },
  bottomBtnContainer: {
    marginTop: heightToDp(4),
    paddingHorizontal: widthToDp(6),
    paddingBottom: heightToDp(3),
  },
});
