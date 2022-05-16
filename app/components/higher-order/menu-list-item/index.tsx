import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import Fontisto from 'react-native-vector-icons/Fontisto';

import { responsiveFontSize } from 'utils/functions/responsive-text';

import makeStyles from './styles';

type Props = {
  Icon?: any;
};

const MenuListItem = ({ Icon }: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon />
        <Text style={styles.text}>Identify Verification</Text>
      </View>
      <Fontisto
        name="angle-right"
        size={responsiveFontSize(22)}
        color={colors.darkPrimary}
      />
    </View>
  );
};

export default MenuListItem;
