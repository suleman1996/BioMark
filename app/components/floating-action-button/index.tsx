import React, { useState } from 'react';
import { View } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { IconsImages } from 'assets/icons';
import SCREENS from '../../navigation/constants/index';
import makeStyles from './styles';

const FloatingActionButton = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const navigation = useNavigation();

  const { DEVICE_CONNECTION } = SCREENS;

  const actions = [
    {
      icon: IconsImages.hcpConnection,
      label: 'Add HCP Connection',
      onPress: () => console.log('Add HCP Connection'),
    },
    {
      icon: IconsImages.deviceConnection,
      label: 'Add Device',
      onPress: () => navigation.navigate(DEVICE_CONNECTION),
    },
    {
      icon: IconsImages.manualEntry,
      label: 'Add Manual Entry',
      onPress: () => console.log('Add Manual Entry'),
    },
  ];

  return (
    <View style={{ height: '40%', marginTop: '85%' }}>
      <FAB.Group
        fabStyle={styles.button}
        visible={visible}
        open={open}
        icon="plus"
        actions={actions}
        onStateChange={(state) => {
          setOpen(state.open);
          setVisible(!state.open);
        }}
      />
    </View>
  );
};

export default FloatingActionButton;
