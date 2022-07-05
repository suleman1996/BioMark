import { InputWithLabel, Modal } from 'components/base';
import { BioCloseGray } from 'components/svg';
import Bio_id_card_icon from 'components/svg/bio_id_card_icon';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { covidService } from 'services/covid-service';
import { logNow } from 'utils/functions/log-binder';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import makeStyles from './styles';
type Props = {
  setIsVisible: any;
  isVisible: boolean;
};

const ICMissingModal = (props: Props) => {
  const { t } = useTranslation();
  const { setIsVisible, isVisible } = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [number, setNumber] = useState('');

  useEffect(() => {
    logNow(number);
  }, [number]);

  function onSubmitNumber() {
    if (!number) {
      setIsVisible(false);
      return;
    }
    covidService
      .updateUserIcNumber({ ic_number: number })
      .then((res) => {
        logNow(res);
      })
      .catch((err) => {
        logNow(err);
      })
      .finally(() => {
        setIsVisible(false);
        setNumber('');
      });
  }
  // 3. Generate QRCode

  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            setIsVisible(false);
          }}
          style={styles.crossContainer}
        >
          <BioCloseGray width={4} height={4} />
        </Pressable>
        <View style={{ paddingBottom: heightToDp(5) }} />
        <Bio_id_card_icon width={70} height={23} />
        <View style={{ paddingBottom: heightToDp(2) }} />
        <Text style={styles.title}>
          {t('pages.covid.bookCovid.covidICTitle')}
        </Text>
        <Text style={styles.desc}>
          {t('pages.covid.bookCovid.covidICDesc')}
        </Text>

        <InputWithLabel
          label={'NRIC/Passport Number'}
          placeholder={'IC or passport number'}
          onChange={setNumber}
          value={number}
          containerStyles={undefined}
        />

        <View style={styles.bottom2Btns}>
          <Pressable
            onPress={() => setIsVisible(false)}
            style={[styles.btn, { backgroundColor: colors.white }]}
          >
            <Text style={[styles.btnText]}>
              {t('pages.covid.bookCovid.cancel')}
            </Text>
          </Pressable>
          <Pressable onPress={onSubmitNumber} style={styles.btnEnable}>
            <Text style={[styles.btnText2]}>
              {t('pages.covid.bookCovid.continue')}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ICMissingModal;
