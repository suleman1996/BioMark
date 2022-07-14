import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Alert, SafeAreaView } from 'react-native';
import { useTheme } from 'react-native-paper';
import WebView from 'react-native-webview';

import { TryvitalsService } from 'services/tryvitals-service/tryvitals-service';
import makeStyles from './styles';
import { setDeviceChanged } from 'store/tryvital/tryvital-actions';

const DeviceConnection = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const styles = makeStyles(colors);

  const navigation = useNavigation();

  const [linkToken, setLinkToken] = useState('');

  useEffect(() => {
    TryvitalsService.linkToken()
      .then((resp) => {
        console.log(resp);
        if (!resp['link_token']) navigation.goBack();

        setLinkToken(resp['link_token']);
      })
      .catch(() => {
        navigation.goBack();
      });
  }, [navigation]);

  const url = `https://link.tryvital.io/?token=${linkToken}&env=sandbox&region=eu&isMobile=true`;

  const handleMessage = (event: any) => {
    if (event.nativeEvent.data === 'LINK_EVENT::SUCCESS') {
      Alert.alert('Device connected successfully...!!!');
    }
    if (event.nativeEvent.data === 'LINK_EVENT::CLOSE') {
      dispatch(setDeviceChanged(true));
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {linkToken?.length > 0 && (
        <WebView
          source={{ uri: url }}
          onMessage={handleMessage}
          style={styles.webview}
        />
      )}
    </SafeAreaView>
  );
};

export default DeviceConnection;
