import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Button, Modal } from 'components/base';
import { BioCloseGray } from 'components/svg';

import makeStyles from './styles';
import { useTranslation } from 'react-i18next';

type Props = {
  isVisible: boolean;
  setIsVisible: any;
  callMe: any;
};

const MarketingConsentModal = (props: Props) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const { isVisible, setIsVisible, callMe } = props;

  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {t('pages.marketingConsent.dialog.title')}
          </Text>
          <Pressable onPress={() => setIsVisible(false)}>
            <BioCloseGray width={4} height={4} />
          </Pressable>
        </View>
        <Text style={styles.contentText}>
          {t('pages.marketingConsent.dialog.description')}
        </Text>
        <Button
          onPress={() => callMe()}
          title={t('pages.marketingConsent.dialog.buttonText')}
          disabled={false}
        />
        <Button
          bg={'transparent'}
          color={'gray'}
          onPress={() => setIsVisible(false)}
          title={t('pages.marketingConsent.dialog.cancelButtonText')}
          disabled={false}
        />
      </View>
    </Modal>
  );
};

export default MarketingConsentModal;
