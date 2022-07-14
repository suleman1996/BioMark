import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { t } from 'i18next';

import { GoogleFitButton } from 'components/button';
import VitalsMenu from './vitals-menu';

import SCREENS from 'navigation/constants';
import MyImage from 'assets/images';
import makeStyles from './styles';

type Props = {
  device_connected: boolean;
};

const HealthSnapshot = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const { device_connected } = props;

  const navigation = useNavigation();

  return (
    <View>
      <Text style={styles.heading}>{t('healthSnapshot.title')}</Text>
      <View
        style={[
          styles.container,
          device_connected ? styles.containerNC : styles.containerC,
        ]}
      >
        {device_connected ? (
          <VitalsMenu />
        ) : (
          <ImageBackground
            source={MyImage.healthRing}
            style={{
              height: '100%',
              width: '100%',
              paddingHorizontal: 15,
              justifyContent: 'center',
            }}
          >
            <GoogleFitButton
              disabled={false}
              title="Connect your wearable devices"
              onPress={() => navigation.navigate(SCREENS.DEVICE_CONNECTION)}
            />
          </ImageBackground>
        )}
      </View>
    </View>
  );
};

export default HealthSnapshot;
