import React from 'react';
import { Text } from 'react-native';

import { TouchableRipple } from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalColors } from 'utils/theme/global-colors';

import { styles } from './styles';

type Props = {
  onPress: any;
  title: string;
};

const SingleMenuItemWithArrow = (props: Props) => {
  const { onPress, title } = props;

  return (
    <TouchableRipple onPress={onPress} style={styles.menuItem}>
      <>
        <Text style={styles.menuItemText}>{title}</Text>
        <Fontisto
          name="angle-right"
          size={responsiveFontSize(20)}
          color={GlobalColors.darkPrimary}
        />
      </>
    </TouchableRipple>
  );
};

export default SingleMenuItemWithArrow;
