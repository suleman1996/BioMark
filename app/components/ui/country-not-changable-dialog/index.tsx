import { Modal } from 'components/base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import makeStyles from './styles';
type Props = {
  setIsVisible: any;
  isVisible: boolean;
};

const CountryNotChangeDialog = (props: Props) => {
  const { t } = useTranslation();
  const { setIsVisible, isVisible } = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  // 3. Generate QRCode

  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {t('pages.covid.bookCovid.testBooking.countryInfoDialogTitle')}
        </Text>
        <View style={{ height: heightToDp(2) }} />
        <Text style={styles.desc}>
          {t('pages.covid.bookCovid.testBooking.countryInfoDialogDescription')}
        </Text>
        <View style={{ height: heightToDp(2) }} />

        <View style={styles.bottom2Btns}>
          <Pressable
            onPress={() => {
              setIsVisible(false);
            }}
            style={styles.btnEnable}
          >
            <Text style={[styles.btnText2]}>
              {t(
                'pages.covid.bookCovid.testBooking.countryInfoDialogButtonText'
              )}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CountryNotChangeDialog;
