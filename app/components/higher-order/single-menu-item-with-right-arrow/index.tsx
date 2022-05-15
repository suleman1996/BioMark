import React from 'react';
import { Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import { TouchableRipple } from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalColors } from 'utils/theme/global-colors';

import makeStyles from './styles';

type Props = {
  onPress: any;
  title: string;
};

const SingleMenuItemWithArrow = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

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
