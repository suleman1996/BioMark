import { Dimensions, StyleSheet } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

const styles = () =>
  StyleSheet.create({
    // modal
    centeredView: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      marginLeft: 0,
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: '#000',
      paddingHorizontal: widthToDp(5),
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      paddingTop: heightToDp(2),
      paddingBottom: heightToDp(2),
    },
  });
export default styles;
