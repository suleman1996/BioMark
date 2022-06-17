import { StyleSheet } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      width: widthToDp(88),
      justifyContent: 'space-between',
    },
    singleTimeItem: {
      paddingHorizontal: widthToDp(2),
      paddingVertical: widthToDp(1),
      borderWidth: 0.2,
      borderColor: colors.inactive,
      borderRadius: widthToDp(1),
      marginRight: widthToDp(2),
      marginBottom: heightToDp(1),
    },
    singleTimeItemText: {},
  });

export default makeStyles;
