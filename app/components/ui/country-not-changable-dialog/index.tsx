import { Modal } from 'components/base';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import makeStyles from './styles';
type Props = {
  setIsVisible: any;
  isVisible: boolean;
};

const CountryNotChangeDialog = (props: Props) => {
  const { setIsVisible, isVisible } = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  // 3. Generate QRCode

  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <View style={styles.container}>
        <Text style={styles.title}>Why can't I change Countries?</Text>
        <View style={{ height: heightToDp(2) }} />
        <Text style={styles.desc}>
          Users are limited to one country for each booking order. If you wish
          to book for another country you would need to start another booking
          order.
        </Text>
        <View style={{ height: heightToDp(2) }} />

        <View style={styles.bottom2Btns}>
          <Pressable
            onPress={() => {
              setIsVisible(false);
            }}
            style={styles.btnEnable}
          >
            <Text style={[styles.btnText2]}>Okey</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CountryNotChangeDialog;
