import { Modal } from 'components/base';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';
import { navigate } from './../../../services/nav-ref';
import SCREENS from 'navigation/constants';
import { useTranslation } from 'react-i18next';
type Props = {
  setIsVisible: any;
  isVisible: boolean;
};

const CancelBookingTestModal = (props: Props) => {
  const { t } = useTranslation();
  const { setIsVisible, isVisible } = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  // 3. Generate QRCode

  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {t('pages.covid.bookCovid.cancelBookingProcess')}
        </Text>
        <Text style={styles.desc}>
          {t('pages.covid.bookCovid.cancelBookingProcessDesc')}
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
            <Text style={[styles.btnText]}>
              {t('pages.covid.bookCovid.bookingDialog.yes')}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setIsVisible(false);
            }}
            style={styles.btnEnable}
          >
            <Text style={[styles.btnText2]}>
              {t('pages.covid.bookCovid.bookingDialog.no')}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CancelBookingTestModal;
