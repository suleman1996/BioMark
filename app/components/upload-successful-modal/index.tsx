import { View, Text, Modal } from 'react-native';
import React from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import GradientButton from 'components/linear-gradient-button';

const UploadSuccessModal = ({
  title,
  text,
  onPress,
  visible,
  text2,
  color,
}) => {
  const { colors } = useTheme();
  const styles = Styles(colors);

  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalView2}>
            <Text style={styles.modalText}>{title}</Text>
          </View>
          <Text style={styles.modalText2}>{text2}</Text>

          <GradientButton
            text={text}
            color={color}
            // color={['#2C6CFC', '#2CBDFC']}
            style={styles.gradientButton}
            onPress={onPress}
          />
        </View>
      </View>
    </Modal>
  );
};
export default UploadSuccessModal;
