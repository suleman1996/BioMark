import React from 'react';
import { View } from 'react-native';
// import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const ArticleWebView = (url: any) => {
  console.log('===================>>>>>>>', url.url);

  return (
    <View style={{ height: '100%', width: '100%' }}>
      <WebView source={{ uri: url.url }} />
    </View>
  );
};
export default ArticleWebView;
