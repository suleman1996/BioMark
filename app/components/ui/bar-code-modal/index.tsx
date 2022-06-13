import { Modal } from 'components/base';
import { BioCloseGray } from 'components/svg';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import BarcodeCreatorViewManager, {
  BarcodeFormat,
} from 'react-native-barcode-creator';
import { useTheme } from 'react-native-paper';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
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
          {/* <Entypo size={responsiveFontSize(30)} name="cross" /> */}
          <BioCloseGray width={4} height={4} />
        </Pressable>
        <Text style={styles.title}>Booking ID - {text}</Text>
        <BarcodeCreatorViewManager
          value={text}
          background={'#FFFFFF'}
          foregroundColor={'#000000'}
          format={BarcodeFormat.CODE128}
          style={{
            width: widthToDp(88),
            height: heightToDp(10),
          }}
        />
        <Text style={styles.title2}>{text}</Text>
      </View>
    </Modal>
  );
};

export default BarCodeModal;
