import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';

const styles = (colors: any) =>
  StyleSheet.create({
    overLay: {
      position: 'absolute',
      backgroundColor: '#3D3D3D90',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    filterView: {
      //   height: 400,
      width: '90%',
      backgroundColor: colors.white,
      padding: 10,
      borderRadius: 5,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      alignItems: 'center',
    },
    headingText: {
      fontFamily: fonts.regular,
      fontSize: 18,
      color: colors.heading,
    },
    subHeading: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.blue,
    },
    radio: {
      height: 15,
      width: 15,
      borderRadius: 7.5,

      marginRight: 5,
    },
  });
export default styles;
