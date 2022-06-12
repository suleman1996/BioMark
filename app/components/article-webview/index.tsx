import React from 'react';
import { View } from 'react-native';
// import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const ArticleWebView = () => {
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <WebView
        source={{ uri: 'https://www.medicalnewstoday.com/articles/273451.php' }}
      />
    </View>
  );
};
export default ArticleWebView;
