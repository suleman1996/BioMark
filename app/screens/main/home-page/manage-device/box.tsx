import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { useTheme } from 'react-native-paper';

import MyImage from 'assets/images';
import makeStyles from './styles';

const Device = ({ device, setModalVisible, setDeleteDevice }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.box}>
      <Image
        source={{
          uri: 'https://storage.googleapis.com/vital-assets/fitbit.png',
        }}
        style={styles.image}
      />
      <View style={{ flexDirection: 'column', paddingLeft: 20 }}>
        <Text style={{ color: '#054E8B', fontSize: 15, fontWeight: '700' }}>
          {device.name}
        </Text>
        <Text style={{ color: '#8493AE', fontSize: 13, fontWeight: '400' }}>
          {device.slug}
        </Text>
      </View>
      <TouchableOpacity
        style={{ marginLeft: 'auto', paddingRight: 20 }}
        onPress={() => {
          setDeleteDevice(device);
          setModalVisible(true);
        }}
      >
        <Image source={MyImage.binIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default Device;
