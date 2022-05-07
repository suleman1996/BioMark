import React from 'react';
import { Text, View, Pressable } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalColors } from 'utils/theme/global-colors';

import { goBack } from 'services/nav-ref';

import { hitSlop } from 'constants/hit-slop';

import { styles } from './styles';

type Props = {
  children: any;
  title: string;
};

const TitleWithBackWhiteBgLayout = ({ children, title }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable hitSlop={hitSlop.one} onPress={() => goBack()}>
          <MaterialIcons
            color={GlobalColors.darkPrimary}
            size={responsiveFontSize(35)}
            name="arrow-back-ios"
          />
        </Pressable>
        <View>
          <Text style={styles.textStyle}>{title ? title : ''}</Text>
        </View>
      </View>
      {children}
    </View>
  );
};

export default TitleWithBackWhiteBgLayout;
