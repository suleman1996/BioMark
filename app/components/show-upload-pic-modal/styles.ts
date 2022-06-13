import { StyleSheet } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

const styles = () =>
  StyleSheet.create({
    // modal
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: '#000',
      paddingHorizontal: widthToDp(5),
      marginHorizontal: widthToDp(5),
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      paddingTop: heightToDp(5),
      paddingBottom: heightToDp(5),
    },
  });
export default styles;
