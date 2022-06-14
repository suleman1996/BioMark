import { Modal } from 'components/base';
import { BioCloseGray } from 'components/svg';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Barcode from 'react-native-barcode-builder';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';

type Props = {
  setIsVisible: any;
  isVisible: boolean;
  text: string;
};

const BarCodeModal = (props: Props) => {
  const { setIsVisible, isVisible, text } = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <View style={styles.container}>
        <Pressable style={styles.cross} onPress={() => setIsVisible(false)}>
          <BioCloseGray width={4} height={4} />
        </Pressable>
        <Text style={styles.title}>Booking ID - {text}</Text>
        <Barcode value={text} format={'CODE128'} />

        <Text style={styles.title2}>{text}</Text>
      </View>
    </Modal>
  );
};

export default BarCodeModal;
