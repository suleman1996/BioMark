/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  PermissionsAndroid,
  Alert,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import Pdf from 'react-native-pdf';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReactNativeBlobUtil from 'react-native-blob-util';

import { ActivityIndicator } from 'components';

import { BackIcon } from 'assets/svgs/index';

import makeStyles from './styles';
import Config from 'react-native-config';
import { TitleWithBackLayout } from 'components/layouts';
import { useTranslation } from 'react-i18next';

export default function TermsAndPrivacy({ route }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [loading, setLoading] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(
    route?.params?.privacyPolicy
  );
  const [downloaded, setisdownloaded] = useState(false);
  const header = route?.params?.headerHome;

  const navigations = useNavigation();

  const actualDownload = () => {
    const { dirs } = ReactNativeBlobUtil.fs;
    const dirToSave =
      Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    const configfb = {
      fileCache: true,
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: privacyPolicy
        ? 'Privacy_and_Policy.pdf'
        : 'Terms_and_Conditions.pdf',
      path: `${dirToSave}/${
        privacyPolicy ? 'Privacy_and_Policy.pdf' : 'Terms_and_Conditions.pdf'
      }`,
    };
    const configOptions = Platform.select({
      ios: {
        fileCache: configfb.fileCache,
        title: configfb.title,
        path: configfb.path,
        appendExt: 'pdf',
      },
      android: configfb,
    });

    ReactNativeBlobUtil.config(configOptions)
      .fetch('GET', privacyPolicy ? Config.PRIVACY_POLICY : Config.TNC, {})
      .then((res) => {
        if (Platform.OS === 'ios') {
          ReactNativeBlobUtil.fs.writeFile(configfb.path, res.data, 'base64');
          ReactNativeBlobUtil.ios.previewDocument(configfb.path);
        }
        setisdownloaded(false);
        if (Platform.OS == 'android') {
          Alert.alert('File downloaded');
        }
      })
      .catch((e) => {
        setisdownloaded(true);
        Alert.alert(e.message);
      });
  };
  const permissionFunc = async () => {
    if (Platform.OS === 'ios') {
      actualDownload();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
      }
    }
  };
  const fileUrl = privacyPolicy ? Config.PRIVACY_POLICY : Config.TNC;

  const downloadFile = () => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = ReactNativeBlobUtil;
    let RootDir =
      Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
    let options = {
      //fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then((res) => {
        if (Platform.OS === 'ios') {
          // ReactNativeBlobUtil.ios.openDocument(res.data);
        }
        // Alert after successful downloading

        // alert('File Downloaded Successfully.');
      });
  };

  const getFileExtention = () => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  return (
    <View style={{ height: '100%', backgroundColor: '#fff' }}>
      {header ? (
        <TitleWithBackLayout
          title={t('pages.policies.title')}
          style={{ flex: 0 }}
        />
      ) : (
        <View style={styles.signupNav}>
          <View style={styles.csNav}>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => navigations.goBack()}
            >
              <BackIcon />
            </TouchableOpacity>
            <Text style={styles.signupText}>
              {t('pages.signUp.buttontitle.back')}
            </Text>
          </View>
        </View>
      )}
      <ActivityIndicator visible={loading} />

      <View style={styles.secHeaderText}>
        <TouchableOpacity onPress={() => setPrivacyPolicy(false)}>
          <View
            style={[
              styles.lableView,
              { borderBottomWidth: privacyPolicy ? null : 2 },
            ]}
          >
            <Text
              style={[
                styles.inputLablel,
                { color: privacyPolicy ? colors.inactive : colors.heading },
              ]}
            >
              {t('pages.idVerification.terms.title')}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPrivacyPolicy(true)}>
          <View
            style={[
              styles.lableView,
              { borderBottomWidth: privacyPolicy ? 2 : null },
            ]}
          >
            <Text
              style={[
                styles.inputLablel,
                { color: privacyPolicy ? colors.heading : colors.inactive },
              ]}
            >
              {t('pages.policies.privacyPolicy.title')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%', height: 10 }} />

      {/* <ScrollView keyboardShouldPersistTaps={'handled'}> */}
      {/* </ScrollView> */}
      {privacyPolicy ? (
        <Pdf
          source={{
            uri: Config.PRIVACY_POLICY,
            cache: true,
          }}
          onLoadComplete={(numberOfPages, filePath) => {}}
          onPageChanged={(page, numberOfPages) => {}}
          onError={(error) => {}}
          onPressLink={(uri) => {}}
          trustAllCerts={false}
          style={styles.pdfView}
        />
      ) : (
        <Pdf
          source={{
            uri: Config.TNC,
            cache: true,
          }}
          onLoadComplete={(numberOfPages, filePath) => {}}
          onPageChanged={(page, numberOfPages) => {}}
          onError={(error) => {}}
          onPressLink={(uri) => {}}
          trustAllCerts={false}
          style={styles.pdfView}
        />
      )}
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 20,
          bottom: 40,
          borderRadius: 30,
        }}
        onPress={() => permissionFunc()}
      >
        <View style={styles.iconView}>
          <Icon name="cloud-download" size={30} color={colors.white} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
