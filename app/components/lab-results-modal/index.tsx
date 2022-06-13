import { View, Text, TouchableOpacity, Modal } from 'react-native';
import React from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import Close from '../../assets/svgs/close';
import ButtonComponent from 'components/base/button';

const LabResultModal = ({
  title,
  visible,
  closeModal,
  onTakePhoto,
  onUploadFromGallery,
  onUploadPdf,
}) => {
  const { colors } = useTheme();
  const styles = Styles(colors);

  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalView2}>
            <Text style={styles.modalText}>{title}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Close />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonView}>
            <ButtonComponent title="Take Photo" onPress={onTakePhoto} />
          </View>
          <View style={styles.buttonView}>
            <ButtonComponent
              title="Upload From Gallery"
              onPress={onUploadFromGallery}
            />
          </View>
          <View style={styles.buttonView}>
            <ButtonComponent title="Upload PDF" onPress={onUploadPdf} />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default LabResultModal;
