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

import Pdf from 'react-native-pdf';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReactNativeBlobUtil from 'react-native-blob-util';

import { ActivityIndicator } from 'components';

import colors from 'assets/colors';
import { BackIcon } from 'assets/svgs/index';

import styles from './styles';
import Config from 'react-native-config';
import { TitleWithBackLayout } from 'components/layouts';

export default function TermsAndPrivacy({ route }) {
  const [loading, setLoading] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(
    route?.params?.privacyPolicy
  );
  const [downloaded, setisdownloaded] = useState(false);
  const header = route?.params?.headerHome;
  console.log('route?.params', route);

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
      title: privacyPolicy ? 'Privacy_and_Policy.pdf' : 'Terms and Conditions',
      path: `${dirToSave}/${
        privacyPolicy ? 'Privacy_and_Policy.pdf' : 'Terms and Conditions'
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

    console.log('The file saved to 23233', configfb, dirs);

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
        console.log('The file saved to ', res);
      })
      .catch((e) => {
        setisdownloaded(true);
        Alert.alert(e.message);
        console.log('The file saved to ERROR', e.message);
      });
  };
  const permissionFunc = async () => {
    if (Platform.OS == 'ios') {
      actualDownload();
    } else {
      if (downloaded) {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            actualDownload();
          } else {
            Alert.alert(
              'You need to give storage permission to download the file'
            );
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        Alert.alert('File is already downloaded.');
      }
    }
  };

  return (
    <View style={{ height: '100%', backgroundColor: '#fff' }}>
      {header ? (
        <TitleWithBackLayout title="Policies" style={{ flex: 0 }} />
      ) : (
        <View style={styles.signupNav}>
          <View style={styles.csNav}>
            <TouchableOpacity>
              <BackIcon onPress={() => navigations.goBack()} />
            </TouchableOpacity>
            <Text style={styles.signupText}>Back</Text>
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
              Terms & Conditions
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
              Privacy Policy
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
      <TouchableOpacity onPress={() => permissionFunc()}>
        <View style={styles.iconView}>
          <Icon name="cloud-download" size={30} color={colors.whiteColor} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
