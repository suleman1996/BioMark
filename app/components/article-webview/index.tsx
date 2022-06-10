import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const ArticleWebView = () => {
  return (
    <WebView
      source={{ uri: 'https://www.medicalnewstoday.com/articles/273451.php' }}
    />
  );
};
export default ArticleWebView;
