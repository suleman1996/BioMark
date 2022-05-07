import { Text, View } from 'react-native';
import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { GlobalColors } from 'utils/theme/global-colors';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { styles } from './styles';

type Props = {
  Icon?: any;
};

const MenuListItem = ({ Icon }: Props) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon />
        <Text style={styles.text}>Identify Verification</Text>
      </View>
      <Fontisto
        name="angle-right"
        size={responsiveFontSize(22)}
        color={GlobalColors.darkPrimary}
      />
    </View>
  );
};

export default MenuListItem;
