import { StyleSheet } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

const styles = (colors: any) =>
  StyleSheet.create({
    // modal
    circleView: {
      borderColor: colors.blueOpacity,
      height: widthToDp(10),
      width: widthToDp(10),
      borderRadius: widthToDp(13),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary,
    },
    blueBar: {
      height: heightToDp(0.3),
      width: '15%',
      backgroundColor: colors.primary,
    },
  });
export default styles;
