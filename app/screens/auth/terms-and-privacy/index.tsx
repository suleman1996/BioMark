/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Pdf from 'react-native-pdf';

import colors from 'assets/colors';
import BackIcon from 'assets/svgs/back';
import ActivityIndicator from 'components/loader/activity-indicator';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
export default function index() {
  const [loading, setLoading] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);

  const navigations = useNavigation();
  //fuctions

  return (
    <View style={{ height: '100%', backgroundColor: '#fff' }}>
      <ActivityIndicator visible={loading} />
      <View style={styles.signupNav}>
        <View style={styles.csNav}>
          <TouchableOpacity>
            <BackIcon onPress={() => navigations.goBack()} />
          </TouchableOpacity>
          <Text style={styles.signupText}>Back</Text>
        </View>
      </View>
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
            uri: 'https://www.clickdimensions.com/links/TestPDFfile.pdf',
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
            uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
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
  );
}
