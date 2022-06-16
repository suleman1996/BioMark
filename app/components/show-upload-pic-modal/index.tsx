import { View, Modal, Image, Pressable } from 'react-native';
import React from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import Pdf from 'react-native-pdf';

const ShowPicModal = ({ visible, modalData, onClose }) => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  //   const navigation = useNavigation();
  console.log('modalData', modalData?.uri);

  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <Pressable style={styles.centeredView} onPress={onClose}>
        <View style={styles.modalView}>
          {modalData?.filetype === 'pdf' ? (
            <Pdf
              source={{
                uri: modalData.base64,
              }}
              trustAllCerts={true}
              style={{ height: 300, width: 250 }}
            />
          ) : (
            <Image
              source={{ uri: modalData?.uri }}
              style={{ height: 300, width: 250 }}
            />
          )}
        </View>
      </Pressable>
    </Modal>
  );
};
export default ShowPicModal;
