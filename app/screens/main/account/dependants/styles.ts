import { StyleSheet } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    paddingBottom: heightToDp(3),
    width: widthToDp(100),
    paddingHorizontal: widthToDp(6),
  },
});
