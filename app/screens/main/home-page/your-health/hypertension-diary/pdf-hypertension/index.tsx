/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Alert, View, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';

import Pdf from 'react-native-pdf';
import { useNavigation } from '@react-navigation/native';
import ReactNativeBlobUtil from 'react-native-blob-util';

import { ActivityIndicator } from 'components';

import makeStyles from './styles';
import Config from 'react-native-config';
import { TitleWithBackLayout } from 'components/layouts';

export default function TermsAndPrivacy({ route }) {
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

  //   const actualDownload = () => {
  //     const { dirs } = ReactNativeBlobUtil.fs;
  //     const dirToSave =
  //       Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
  //     const configfb = {
  //       fileCache: true,
  //       useDownloadManager: true,
  //       notification: true,
  //       mediaScannable: true,
  //       title: privacyPolicy
  //         ? 'Privacy_and_Policy.pdf'
  //         : 'Terms_and_Conditions.pdf',
  //       path: `${dirToSave}/${
  //         privacyPolicy ? 'Privacy_and_Policy.pdf' : 'Terms_and_Conditions.pdf'
  //       }`,
  //     };
  //     const configOptions = Platform.select({
  //       ios: {
  //         fileCache: configfb.fileCache,
  //         title: configfb.title,
  //         path: configfb.path,
  //         appendExt: 'pdf',
  //       },
  //       android: configfb,
  //     });

  //     console.log('The file saved to 23233', configfb, dirs);

  //     ReactNativeBlobUtil.config(configOptions)
  //       .fetch('GET', privacyPolicy ? Config.PRIVACY_POLICY : Config.TNC, {})
  //       .then((res) => {
  //         if (Platform.OS === 'ios') {
  //           ReactNativeBlobUtil.fs.writeFile(configfb.path, res.data, 'base64');
  //           ReactNativeBlobUtil.ios.previewDocument(configfb.path);
  //         }
  //         setisdownloaded(false);
  //         if (Platform.OS == 'android') {
  //           Alert.alert('File downloaded');
  //         }
  //         console.log('The file saved to ', res);
  //       })
  //       .catch((e) => {
  //         setisdownloaded(true);
  //         Alert.alert(e.message);
  //         console.log('The file saved to ERROR', e.message);
  //       });
  //   };
  //   const permissionFunc = async () => {
  //     if (Platform.OS === 'ios') {
  //       actualDownload();
  //     } else {
  //       try {
  //         const granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //           {
  //             title: 'Storage Permission Required',
  //             message:
  //               'Application needs access to your storage to download File',
  //           }
  //         );
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           // Start downloading
  //           downloadFile();
  //           console.log('Storage Permission Granted.');
  //         } else {
  //           // If permission denied then show alert
  //           Alert.alert('Error', 'Storage Permission Not Granted');
  //         }
  //       } catch (err) {
  //         // To handle permission related exception
  //         console.log('++++' + err);
  //       }
  //     }
  //   };
  const fileUrl = privacyPolicy ? Config.PRIVACY_POLICY : Config.TNC;

  return (
    <TitleWithBackLayout isGradient={false} title="PDF HYPERTENSION">
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
