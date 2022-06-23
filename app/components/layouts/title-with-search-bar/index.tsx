import React from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';

import { SearchBarWithLeftScanIcon } from 'components/higher-order';
import Ionicons from 'react-native-vector-icons/Ionicons';

import makeStyles from './styles';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { goBack } from 'services/nav-ref';
import ChangeLanguage from 'components/change_language';
import { heightToDp } from 'utils/functions/responsive-dimensions';

type Props = {
  children: any;
  title: string;
  isBack?: boolean;
  translation?: boolean;
  scroll?: boolean;
};

const TitleWithSearchBarLayout = ({
  children,
  title,
  isBack,
  translation,
  scroll,
}: Props) => {
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
        {translation ? (
          <View style={styles.translationView}>
            <ChangeLanguage />
          </View>
        ) : null}
      </View>
      <View style={styles.searchBarContainer}>
        <View style={styles.halfPrimary} />
        <SearchBarWithLeftScanIcon />
      </View>
      {scroll === false ? (
        <View style={{ marginTop: heightToDp(5) }}>{children}</View>
      ) : (
        <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      )}
    </View>
  );
};

export default TitleWithSearchBarLayout;
