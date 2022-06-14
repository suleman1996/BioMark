import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';

const styles = (colors: any) =>
  StyleSheet.create({
    healthTrackerHeading: {
      fontFamily: fonts.mulishBold,
      // fontWeight: 'bold',
      fontSize: 14,
      color: colors.lightDark,
      textAlign: 'center',
    },
    renderHealthView: {
      height: 110,
      width: 100,
      backgroundColor: colors.white,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
      paddingHorizontal: 10,
      margin: 5,
      // marginHorizontal: 5,
    },
  });
export default styles;
