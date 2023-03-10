import React from 'react';
import { Text, View, Pressable, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import SCREENS from 'navigation/constants';
import { goBack, navigate } from 'services/nav-ref';

import { hitSlop } from 'constants/hit-slop';

import makeStyles from './styles';

type Props = {
  children: any;
  title: string;
  style: any;
  isGradient: boolean;
  isInfo: boolean;
  isShare: boolean;
  shadow: string;
  onPressInfo: any;
  onSharePress: any;
  deleteIcon: any;
  shouldGoBack?: boolean;
  pressdeleteIcon?: any;
  iconName?: string;
};

const TitleWithBackLayout = ({
  children,
  title,
  style,
  isGradient,
  isInfo,
  isShare,
  shadow,
  onPressInfo,
  onSharePress,
  deleteIcon,
  shouldGoBack,
  pressdeleteIcon,
  iconName,
}: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        colors={[
          isGradient ? '#2C6CFC' : colors.primary,
          isGradient ? '#2CBDFC' : colors.primary,
        ]}
        style={{ borderRadius: 0 }}
      >
        <View style={[styles.header, { backgroundColor: shadow }]}>
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              hitSlop={hitSlop.one}
              onPress={() =>
                shouldGoBack ? navigate(SCREENS.HEALTH_RECORD) : goBack()
              }
            >
              <MaterialIcons
                color={colors.white}
                size={responsiveFontSize(35)}
                name="arrow-back-ios"
              />
            </Pressable>
            <View style={styles.optionsView}>
              {deleteIcon && (
                <MaterialCommunityIcons
                  color={colors.white}
                  size={responsiveFontSize(35)}
                  name={iconName}
                  onPress={pressdeleteIcon}
                />
              )}
            </View>

            <View style={styles.optionsView}>
              {isShare && (
                <TouchableOpacity onPress={onSharePress}>
                  <AntDesignIcons
                    color={colors.white}
                    size={responsiveFontSize(22)}
                    name="sharealt"
                    style={{ marginRight: 20 }}
                  />
                </TouchableOpacity>
              )}
              {isInfo && (
                <TouchableOpacity onPress={() => onPressInfo(true)}>
                  <AntDesignIcons
                    color={colors.white}
                    size={responsiveFontSize(22)}
                    name="infocirlceo"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.textStyle}>{title ? title : ''}</Text>
          </View>
        </View>
      </LinearGradient>
      {children}
    </View>
  );
};

export default TitleWithBackLayout;
