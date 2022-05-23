import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {},
    question: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.medium,
      color: colors.darkPrimary,
      marginTop: heightToDp(2),
      paddingHorizontal: heightToDp(5),
      fontWeight: 'bold',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      width: '85%',
      height: heightToDp(5),
      borderRadius: widthToDp(2),
      marginTop: heightToDp(2),
      marginRight: widthToDp(2),
      backgroundColor: colors.primaryGray,
    },
    addBtn: {
      width: widthToDp(20),
      height: heightToDp(5),
      borderRadius: widthToDp(5),
      backgroundColor: colors.primary,
      position: 'absolute',
      right: widthToDp(6),
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tagsWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: widthToDp(4),
      marginTop: heightToDp(3),
    },
    tag: {
      borderWidth: 1,
      borderColor: colors.darkPrimary,
      paddingHorizontal: widthToDp(3),
      paddingVertical: widthToDp(2),
      borderRadius: widthToDp(4),
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: widthToDp(3),
      marginTop: heightToDp(1.5),
    },
    tagText: {
      marginRight: widthToDp(2),
      fontFamily: GlobalFonts.regular,
      fontSize: responsiveFontSize(15),
    },
  });
export default makeStyles;
