import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalColors } from 'utils/theme/global-colors';
import { GlobalFonts } from 'utils/theme/fonts';

type Props = {};

const OtherNotificationItem = (props: Props) => {
  const {} = props;
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome
          color={GlobalColors.primary}
          name="plus"
          size={responsiveFontSize(25)}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentHeaderText}>
          Please Complete Your Health Declaration
        </Text>
        <Text style={styles.contentext}>
          You will be undergoing a covid test in 24 hours.
        </Text>
      </View>
      <Text style={styles.dateText}>May 08</Text>
    </View>
  );
};

export default OtherNotificationItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: widthToDp(4),
    width: widthToDp(86),
    paddingVertical: heightToDp(2.5),
    backgroundColor: GlobalColors.lightPrimary,
    marginVertical: heightToDp(0.3),
  },
  iconContainer: {
    width: widthToDp(5),
  },
  contentContainer: {
    width: widthToDp(60),
    paddingLeft: widthToDp(4),
    paddingRight: widthToDp(6),
  },
  dateText: {
    fontFamily: GlobalFonts.light,
    fontSize: responsiveFontSize(20),
    color: GlobalColors.darkGray,
  },
  contentHeaderText: {
    fontFamily: GlobalFonts.bold,
    lineHeight: responsiveFontSize(35),
    fontSize: responsiveFontSize(25),
    color: GlobalColors.darkPrimary,
    marginTop: -4,
  },
  contentext: {
    fontFamily: GlobalFonts.bold,
    fontSize: responsiveFontSize(20),
    color: GlobalColors.darkPrimary,
  },
});
