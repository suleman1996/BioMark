import { View } from 'react-native';
import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import makeStyles from './styles';
import LabResultProgressBar from 'components/lab-result-pregress-bar/index';
import { SmallButton } from 'components/button';
import { useTranslation } from 'react-i18next';
const RendreLabResult = ({ item, setVisible, stepIndicatorIcons }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <>
      <View style={styles.resultStatusView}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.resultStatus}>
            {t('pages.dashboard.yourLabResultStatus')}
          </Text>
          <Text style={[styles.barcode]}>
            {t('pages.dashboard.barcode')} {item?.lab_ref_id}
          </Text>
        </View>
        <LabResultProgressBar
          currentPosition={5 - item?.status_order}
          icons={stepIndicatorIcons}
        />
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.resultStatus}>{item?.status_name}</Text>
          <Text style={[styles.barcode]}>{item?.status_message}</Text>
        </View>
        {item?.result_status === 'verified' ? (
          <View
            style={{
              width: '40%',
              alignSelf: 'center',
              paddingVertical: 10,
            }}
          >
            <SmallButton
              title={t('pages.dashboard.seeResult')}
              style={{ height: 45 }}
              onPress={() => setVisible(true)}
            />
          </View>
        ) : null}
      </View>
    </>
  );
};
export default RendreLabResult;
