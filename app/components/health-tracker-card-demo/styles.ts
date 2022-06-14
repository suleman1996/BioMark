import { StyleSheet } from 'react-native';

const styles = (colors: any) =>
  StyleSheet.create({
    healthTrackerHeading: {
      //   fontFamily: fonts.bold,
      fontWeight: 'bold',
      fontSize: 11,
      color: colors.lightDark,
      textAlign: 'center',
    },
    renderHealthView: {
      height: 120,
      width: 120,
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
      marginHorizontal: 5,
    },
  });
export default styles;
