/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Alert, View, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';

import Pdf from 'react-native-pdf';
import { useNavigation } from '@react-navigation/native';

import { ActivityIndicator } from 'components';

import makeStyles from './styles';
import Config from 'react-native-config';
import { TitleWithBackLayout } from 'components/layouts';

export default function PdfDiabetesSupportCenter({ route }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [loading, setLoading] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(
    route?.params?.privacyPolicy
  );
  const [downloaded, setisdownloaded] = useState(false);
  const header = route?.params?.headerHome;
  console.log('route?.params', route);

  const navigations = useNavigation();

  const fileUrl = privacyPolicy ? Config.PRIVACY_POLICY : Config.TNC;

  return (
    <TitleWithBackLayout isGradient={false} title="PDF DIABETES">
      <View style={{ height: '100%' }}>
        <ActivityIndicator visible={loading} />
        {privacyPolicy ? (
          <Pdf
            source={{
              uri: Config.PRIVACY_POLICY,
              cache: true,
            }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            trustAllCerts={false}
            style={styles.pdfView}
          />
        ) : (
          <Pdf
            source={{
              uri: Config.TNC,
              cache: true,
            }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            trustAllCerts={false}
            style={styles.pdfView}
          />
        )}
      </View>
    </TitleWithBackLayout>
  );
}
