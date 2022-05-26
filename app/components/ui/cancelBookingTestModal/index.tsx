import { Modal } from 'components/base';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';
import { navigate } from './../../../services/nav-ref';
import SCREENS from 'navigation/constants';
type Props = {
  setIsVisible: any;
  isVisible: boolean;
};

const CancelBookingTestModal = (props: Props) => {
  const { setIsVisible, isVisible } = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  // 3. Generate QRCode

  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Cancel Entire Test Booking {`\n`} Process
        </Text>
        <Text style={styles.desc}>
          By not proceeding you are not guranteed a test slot. Do you want to
          cancel?
        </Text>

        <View style={styles.bottom2Btns}>
          <Pressable
            onPress={() =>
              navigate(SCREENS.MAIN_NAVIGATOR, {
                screen: SCREENS.HOME,
              })
            }
            style={[styles.btn, { backgroundColor: colors.white }]}
          >
            <Text style={[styles.btnText]}>Yes</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setIsVisible(false);
            }}
            style={styles.btnEnable}
          >
            <Text style={[styles.btnText2]}>No</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CancelBookingTestModal;
