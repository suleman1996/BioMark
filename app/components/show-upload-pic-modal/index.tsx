import { View, Image } from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import Pdf from 'react-native-pdf';

const ShowPicModal = ({ visible, modalData, onClose }) => {
  const { colors } = useTheme();
  const styles = Styles(colors);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onBackdropPress={onClose}
    >
      <View onPress={onClose} style={styles.centeredView}>
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
              style={{ flex: 1, width: 350 }}
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
      </View>
    </Modal>
  );
};
export default ShowPicModal;
