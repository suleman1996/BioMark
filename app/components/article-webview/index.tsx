import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

const ArticleWebView = (url: any) => {
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <WebView source={{ uri: url.url }} />
    </View>
  );
};
export default ArticleWebView;
