import { View, Modal, Image, Pressable } from 'react-native';
import React from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';

const ShowPicModal = ({ visible, image, onClose }) => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  //   const navigation = useNavigation();

  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <Pressable style={styles.centeredView} onPress={onClose}>
        <View style={styles.modalView}>
          <Image source={image} style={{ height: 300, width: 250 }} />
        </View>
      </Pressable>
    </Modal>
  );
};
export default ShowPicModal;
