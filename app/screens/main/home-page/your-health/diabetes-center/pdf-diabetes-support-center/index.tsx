/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import Pdf from 'react-native-pdf';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';
import { getReduxPspPdfLink } from 'store/home/home-actions';
import { ActivityIndicator } from 'components';

import makeStyles from './styles';
import { TitleWithBackLayout } from 'components/layouts';

export default function PdfDiabetesSupportCenter({ route }) {
  const { colors } = useTheme();
  const [pdf, setPdf] = useState('');
  const [isVisiable, setIsVisible] = React.useState(false);

  const styles = makeStyles(colors);
  const dispatch = useDispatch();
  const pspPdfLinks = useSelector(
    (state: IAppState) => state.home.PspDataContents
  );

  const item = route.params.code;

  useEffect(() => {
    PdfData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const PdfData = async () => {
    try {
      setIsVisible(true);
      await dispatch(getReduxPspPdfLink(item.item.code));

      setPdf(pspPdfLinks.link);
      setIsVisible(false);
    } catch (err) {
      setIsVisible(false);
    }
  };

  const [loading, setLoading] = useState(false);
  return (
    <TitleWithBackLayout isGradient={false} title={item.item.name}>
      <View style={{ height: '100%' }}>
        <ActivityIndicator visible={isVisiable} />
        {/* <ActivityIndicator visible={loading} /> */}
        <Pdf
          source={{
            uri: pspPdfLinks.link,
            cache: true,
          }}
          onLoadComplete={(numberOfPages, filePath) => {}}
          onPageChanged={(page, numberOfPages) => {}}
          onError={(error) => {}}
          onPressLink={(uri) => {}}
          trustAllCerts={false}
          style={styles.pdfView}
        />
      </View>
    </TitleWithBackLayout>
  );
}
