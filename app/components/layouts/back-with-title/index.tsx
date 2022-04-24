import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalColors } from 'utils/theme/global-colors';
import { GlobalFonts } from 'utils/theme/fonts';
import { hitSlop } from 'constants/hit-slop';
import { goBack } from 'services/nav-ref';

type Props = {
  children: any;
  title: string;
};

const TitleWithBackLayout = ({ children, title }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable hitSlop={hitSlop.one} onPress={() => goBack()}>
          <MaterialIcons
            color={GlobalColors.white}
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

export default TitleWithBackLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: widthToDp(100),
    backgroundColor: GlobalColors.primary,
    paddingHorizontal: widthToDp(4),
    paddingTop: heightToDp(2.5),
    paddingBottom: heightToDp(2),
    borderBottomWidth: 0.3,
  },
  titleContainer: {
    paddingVertical: heightToDp(1),
  },
  textStyle: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.medium,
    marginTop: heightToDp(2),
    color: GlobalColors.white,
  },
});
