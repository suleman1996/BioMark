import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'
import {styles} from './styles'
import { responsiveFontSize } from '../../../utils/functions/responsiveText'
import { GlobalColors } from '../../../utils/theme/globalColors'

type Props = {
          onPress: any,
          title: string
}

const SingleMenuItemWithArrow = (props: Props) => {
          const {onPress, title} = props;
  return (
    <Pressable onPress={onPress} style={styles.menuItem}>
      <Text style={styles.menuItemText}>{title}</Text>
      <Fontisto
        name="angle-right"
        size={responsiveFontSize(22)}
        color={GlobalColors.darkPrimary}
      />
    </Pressable>
  );
}

export default SingleMenuItemWithArrow