import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';

// let deviceWidth = Dimensions.get('window').width;

const styles = (colors: any) =>
  StyleSheet.create({
    overLay: {
      position: 'absolute',
      backgroundColor: '#3D3D3D90',
      // width: deviceWidth,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      borderRadius: 10,
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
      padding: 5,
      alignItems: 'center',
    },
    headingText: {
      fontFamily: fonts.bold,
      fontSize: 18,
      color: colors.heading,
    },
    subHeading: {
      fontFamily: fonts.bold,
      fontSize: 14,
      color: colors.heading,
      marginLeft: 5,
    },
    radio: {
      height: 15,
      width: 15,
      borderRadius: 7.5,
      marginRight: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 5,
      borderWidth: 2,
      backgroundColor: colors.white,
    },
    innerRadio: {
      height: 7,
      width: 7,
      backgroundColor: colors.heading,
      borderRadius: 3.5,
    },
  });
export default styles;
