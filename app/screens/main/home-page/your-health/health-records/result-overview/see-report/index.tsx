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
import { userService } from 'services/user-service/user-service';
import { checkPermissionAndDownloadBase64 } from 'utils/functions/download-file';
import PdfIcon from 'assets/svgs/pdf';

const SeeReport = () => {
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
      const result = await userService.getResultPdf(route?.params?.resultId);
      setPdfLink(result.data.replace(/\s/g, ''));

      //   setPdf(pspPdfLinks.link);
      setIsVisible(false);
    } catch (err) {
      setIsVisible(false);
    }
  };

  return (
    <TitleWithBackLayout shadow={colors.blue} title="Result Overview">
      <View style={styles.miniHeader}>
        <Text style={styles.miniHeaderText}>
          Received on {moment(route?.params.date).format('MMM DD, YYYY')}
        </Text>
      </View>

      <Button
        title="Download Report Result"
        svg={<PdfIcon fill={colors.white} />}
        onPress={() => checkPermissionAndDownloadBase64(pdfLink)}
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
            console.log(error);
          }}
        />
      </View>
    </TitleWithBackLayout>
  );
};

export default SeeReport;
