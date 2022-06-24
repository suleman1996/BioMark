import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const InfoModal = ({ title, text, onPress, visible, text2, color }) => {
  const { colors } = useTheme();
  const styles = Styles(colors);

  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalView2}>
            <Text style={styles.modalText}>{title}</Text>
            <Text style={styles.modalText2}>{text2}</Text>
          </View>
          {/* 
          <GradientButton
            text={text}
            color={color}
            // color={['#2C6CFC', '#2CBDFC']}
            style={styles.gradientButton}
            onPress={onPress}
          /> */}
          <TouchableOpacity onPress={onPress} style={styles.gradientButton}>
            <View style={styles.btnView}>
              <Text style={styles.btnText}>{text}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default InfoModal;
