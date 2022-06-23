import { View, Text } from 'react-native';
import React from 'react';

import moment from 'moment';
import Pdf from 'react-native-pdf';
import { useTheme } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

import Styles from './styles';
import { TitleWithBackLayout } from 'components/layouts';
import { ActivityIndicator } from 'components';
import { Button } from 'components/button';
import { checkPermissionAndDownloadBase64 } from 'utils/functions/download-file';
import PdfIcon from 'assets/svgs/pdf';
import { healthRecordServices } from 'services/health-record-service';
import { useTranslation } from 'react-i18next';

const SeeReport = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = Styles(colors);
  const route = useRoute();

  const [isVisiable, setIsVisible] = React.useState(false);
  const [pdfLink, setPdfLink] = React.useState('');

  React.useEffect(() => {
    PdfData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const PdfData = async () => {
    try {
      setIsVisible(true);
      const result = await healthRecordServices.getResultPdf(
        route?.params?.resultId
      );
      setPdfLink(result.data.replace(/\s/g, ''));

      //   setPdf(pspPdfLinks.link);
      setIsVisible(false);
    } catch (err) {
      setIsVisible(false);
    }
  };

  return (
    <TitleWithBackLayout
      shadow={colors.blue}
      title={t('pages.pdfViewer.title')}
    >
      <View style={styles.miniHeader}>
        <Text style={styles.miniHeaderText}>
          Received on {moment(route?.params.date).format('MMM DD, YYYY')}
        </Text>
      </View>

      <Button
        title={t('pages.pdfViewer.download')}
        svg={<PdfIcon fill={colors.white} />}
        onPress={() =>
          checkPermissionAndDownloadBase64(
            `data:application/pdf;base64,${pdfLink}`
          )
        }
      />
      <View style={{ flex: 1 }}>
        <ActivityIndicator visible={isVisiable} />

        <Pdf
          source={{
            uri: `data:application/pdf;base64,${pdfLink}`,
            cache: true,
          }}
          trustAllCerts={true}
          style={styles.pdfView}
          onError={(error) => {
            console.error(error);
          }}
        />
      </View>
    </TitleWithBackLayout>
  );
};

export default SeeReport;
