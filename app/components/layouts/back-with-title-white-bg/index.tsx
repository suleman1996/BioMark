import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { responsiveFontSize } from 'utils/functions/responsive-text';

import { goBack } from 'services/nav-ref';

import { hitSlop } from 'constants/hit-slop';

import makeStyles from './styles';

type Props = {
  children?: any;
  title?: string;
  style?: any;
  binIcon?: boolean;
  onPressIcon?: any;
};

const TitleWithBackWhiteBgLayout = ({
  children,
  title,
  style,
  binIcon,
  onPressIcon,
}: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Pressable hitSlop={hitSlop.one} onPress={() => goBack()}>
            <MaterialIcons
              color={colors.darkPrimary}
              size={responsiveFontSize(35)}
              name="arrow-back-ios"
            />
          </Pressable>
          {binIcon ? (
            <Pressable hitSlop={hitSlop.one} onPress={() => onPressIcon()}>
              <MaterialIcons
                color={colors.darkPrimary}
                size={responsiveFontSize(35)}
                name="delete"
              />
            </Pressable>
          ) : null}
        </View>
        {title && <Text style={styles.textStyle}>{title}</Text>}
      </View>
      {children}
    </View>
  );
};

export default TitleWithBackWhiteBgLayout;
