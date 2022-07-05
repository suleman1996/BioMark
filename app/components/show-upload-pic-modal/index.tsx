import { View, Modal, Image, Pressable } from 'react-native';
import React from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import Pdf from 'react-native-pdf';

const ShowPicModal = ({ visible, modalData, onClose }) => {
  const { colors } = useTheme();
  const styles = Styles(colors);

  return (
    <Modal
      onRequestClose={onClose}
      animationType="none"
      transparent={true}
      visible={visible}
    >
      <Pressable onPress={onClose} style={styles.centeredView}>
        <View style={styles.modalView}>
          {modalData?.file_type === 'pdf' ? (
            <Pdf
              source={{
                uri: modalData.base64
                  ? modalData.base64
                  : modalData?.document?.url,
              }}
              trustAllCerts={false}
              onError={(error) => {
                console.error(error);
              }}
              style={{ height: 300, width: 250 }}
            />
          ) : (
            <Image
              source={{
                uri: modalData?.uri ? modalData?.uri : modalData?.document?.url,
              }}
              style={{ height: 300, width: 250 }}
            />
          )}
        </View>
      </Pressable>
    </Modal>
  );
};
export default ShowPicModal;
