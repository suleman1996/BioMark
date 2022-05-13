import { StyleSheet } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
  },
  bottomBtnContainer: {
    alignItems: 'center',
    bottom: 0,
    paddingBottom: heightToDp(3),
    width: widthToDp(100),
  },
});

export default styles;
