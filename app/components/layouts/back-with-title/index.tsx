import React from 'react';
import { Text, View, Pressable, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

import { responsiveFontSize } from 'utils/functions/responsive-text';

import { hitSlop } from 'constants/hit-slop';
import { goBack } from 'services/nav-ref';

import makeStyles from './styles';

type Props = {
  children: any;
  title: string;
  style: any;
  isGradient: boolean;
  isInfo: boolean;
  isShare: boolean;
};

const TitleWithBackLayout = ({
  children,
  title,
  style,
  isGradient,
  isInfo,
  isShare,
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
        <View style={styles.header}>
          <View style={{ flexDirection: 'row' }}>
            <Pressable hitSlop={hitSlop.one} onPress={() => goBack()}>
              <MaterialIcons
                color={colors.white}
                size={responsiveFontSize(35)}
                name="arrow-back-ios"
              />
            </Pressable>
            {}
            <View style={styles.optionsView}>
              {isShare && (
                <TouchableOpacity>
                  <AntDesignIcons
                    color={colors.white}
                    size={responsiveFontSize(22)}
                    name="sharealt"
                    style={{ marginRight: 20 }}
                  />
                </TouchableOpacity>
              )}
              {isInfo && (
                <TouchableOpacity>
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
