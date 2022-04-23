import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {
  heightToDp,
  widthToDp,
} from '../../../utils/functions/responsive-dimensions';
import { responsiveFontSize } from '../../../utils/functions/responsive-text';
import { GlobalFonts } from '../../../utils/theme/fonts';
import { GlobalColors } from '../../../utils/theme/global-colors';
import SearchBarWithLeftScanIcon from '../../higher-order/search-bar-with-left-scan-icon/index';

type Props = {
  children: any;
  title: string;
};

const TitleWithSearchBarLayout = ({ children, title }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Text style={styles.textStyle}>{title}</Text>
      </View>
      <View style={styles.searchBarContainer}>
        <View style={styles.halfPrimary} />
        <SearchBarWithLeftScanIcon />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
    </View>
  );
};

export default TitleWithSearchBarLayout;

const styles = StyleSheet.create({
  container: {
    width: widthToDp(100),
  },
  titleBar: {
    backgroundColor: GlobalColors.primary,
    paddingVertical: heightToDp(1.1),
    paddingHorizontal: widthToDp(4),
  },
  textStyle: {
    color: GlobalColors.white,
    fontSize: responsiveFontSize(30),
    fontFamily: GlobalFonts.bold,
  },
  searchBarContainer: {
    alignItems: 'center',
  },
  halfPrimary: {
    height: heightToDp(3),
    width: '100%',
    backgroundColor: GlobalColors.primary,
    position: 'absolute',
    top: 0,
  },
});
