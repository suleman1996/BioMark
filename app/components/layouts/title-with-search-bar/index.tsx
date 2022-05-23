import React from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';

import { SearchBarWithLeftScanIcon } from 'components/higher-order';
import Ionicons from 'react-native-vector-icons/Ionicons';

import makeStyles from './styles';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { goBack } from 'services/nav-ref';

type Props = {
  children: any;
  title: string;
  isBack?: boolean;
};

const TitleWithSearchBarLayout = ({ children, title, isBack }: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        {/* arrow-back-sharp */}
        {isBack ? (
          <Pressable onPress={() => goBack()} style={styles.iconContainer}>
            <Ionicons
              color={colors.white}
              name="arrow-back-sharp"
              size={responsiveFontSize(25)}
            />
          </Pressable>
        ) : null}
        <Text style={styles.textStyle}>{title}</Text>
      </View>
      <View style={styles.searchBarContainer}>
        <View style={styles.halfPrimary} />
        <SearchBarWithLeftScanIcon />
      </View>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
};

export default TitleWithSearchBarLayout;
