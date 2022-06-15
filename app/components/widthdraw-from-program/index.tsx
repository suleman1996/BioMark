import { View, Text, TouchableOpacity, Modal } from 'react-native';
import React from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import Close from '../../assets/svgs/close';
import GradientButton from 'components/linear-gradient-button';

const WithdrawProgram = ({
  title,
  text,
  onPress,
  cancel,
  visible,
  cancelModal,
  closeModal,
  text2,
  color,
}) => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  //   const navigation = useNavigation();

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
          <Text style={styles.modalText2}>{text2}</Text>

          <GradientButton
            text={text}
            color={color}
            // color={['#2C6CFC', '#2CBDFC']}
            style={styles.gradientButton}
            onPress={onPress}
          />
          <TouchableOpacity style={styles.cancel} onPress={cancelModal}>
            <Text style={styles.cancelText}>{cancel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default WithdrawProgram;
