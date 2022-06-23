import React, { useEffect, useState } from 'react';

import ButtonComponent from 'components/base/button';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNQRGenerator from 'rn-qr-generator';

import { dateFormat1 } from 'utils/functions/date-format';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { covidService } from './../../../../services/covid-service/index';
import { CovidResponseData } from './../../../../types/api/covid';
import makeStyles from './styles';
import { API_URLS } from 'services/url-constants';
import { logNow } from 'utils/functions/log-binder';
import { sharePdfFile } from 'utils/functions/share-online';

type Props = {
  route?: any;
};

const SingleCovidResult = (props: Props) => {
  const { route } = props;
  const id = route?.params?.id;

  const { colors }: any = useTheme();
  const styles = makeStyles(colors);

  const [data, setData] = useState<CovidResponseData>();
  const [qrImg, setQrImg] = useState('');

  const getData = async () => {
    covidService.getCovidSingleResults(id).then((res) => {
      setData(res);
    });
  };

  /*eslint-disable */

  useEffect(() => {
    getData();
  }, []);
  /*eslint-enable */

  const {
    testingCenter = '',
    testDate = '',
    testingType = '',
    reportDate = '',
    testQr = '',
    testResult = '',
  } = {
    testingCenter: data?.test_center,
    testDate: data?.test_date,
    testingType: data?.test_type,
    reportDate: data?.test_report_date,
    testQr: data?.test_qr,
    testResult: data?.test_result,
  };

  useEffect(() => {
    RNQRGenerator.generate({
      value: testQr,
      height: 400,
      width: 400,
    })
      .then((response) => {
        const { uri } = response;
        setQrImg(uri);
      })
      .catch((error) => console.warn('Cannot create QR code', error));
  }, [testQr]);

  const SingleResult = () => {
    const isPositiveColor =
      testResult == 'POSITIVE' || testResult == 'DETECTED'
        ? colors.red
        : colors.green;
    const isPositiveIcon =
      testResult == 'POSITIVE' || testResult == 'DETECTED'
        ? 'pluscircle'
        : 'minuscircle';
    const isPositiveText =
      testResult == 'POSITIVE' || testResult == 'DETECTED'
        ? 'Please isolate and quarantine yourself.'
        : 'Continue to practice safe distancing.';

    return (
      <Pressable style={styles.parent}>
        <AntDesign
          name={isPositiveIcon}
          size={responsiveFontSize(100)}
          color={isPositiveColor}
        />
        <Text style={styles.text1}>
          Your Test result is{' '}
          <Text style={[styles.text2, { color: isPositiveColor }]}>
            {testResult}
          </Text>{' '}
          for COVID-19
        </Text>
        <View style={{ marginTop: heightToDp(1) }} />
        <View style={styles.headerLine} />
        <View style={{ marginTop: heightToDp(1) }} />
        <View style={styles.row}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={styles.title}>Testing Center</Text>
            <Text style={styles.content}>{testingCenter}</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              paddingLeft: widthToDp(4),
            }}
          >
            <Text style={styles.title}>Test Date</Text>
            <Text style={styles.content}>{dateFormat1(testDate)}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.itemContainer}>
            <Text style={styles.title}>Testing Type</Text>
            <Text style={styles.content}>{testingType}</Text>
          </View>
          <View style={[styles.itemContainer, { paddingLeft: widthToDp(4) }]}>
            <Text style={styles.title}>Report Date</Text>
            <Text style={styles.content}>{dateFormat1(reportDate)}</Text>
          </View>
        </View>
        <View style={{ marginTop: heightToDp(1) }} />
        <View style={styles.headerLine} />
        <View style={{ marginTop: heightToDp(1) }} />
        <Text style={styles.text1}>Share to share Covid-19 Test Result</Text>
        <View style={{ marginTop: heightToDp(2) }} />
        {/* <QRCode value={testQr} /> */}
        <Image
          resizeMode="cover"
          source={{ uri: qrImg }}
          style={{ width: 300, height: 300 }}
        />
        <View style={{ marginTop: heightToDp(1) }} />
        <Text style={styles.text3}>{`COVID-19 ${testResult} (${dateFormat1(
          reportDate
        )})`}</Text>
        <Text style={styles.text4}>{isPositiveText}</Text>
        <View style={{ marginTop: heightToDp(2) }} />
        <ButtonComponent
          onPress={() => {
            covidService.getCovidResultDownload(id).then((res) => {
              sharePdfFile(res);
            });
            logNow(`${API_URLS.COVID_GET_RESUTLS_DOWNLOAD_V1}/${id}/download`);
            // checkPermissionAndDownload(
            //   `https://bm-dev-api.biomarking.com/${API_URLS.COVID_GET_RESUTLS}/${id}/download`
            // );
          }}
          title={'Share Test Result'}
        />
      </Pressable>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SingleResult />
        </ScrollView>
      </View>
    </>
  );
};

export default SingleCovidResult;
