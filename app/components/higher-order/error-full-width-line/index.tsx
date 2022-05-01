import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';

type Props = {
  error: string | undefined | null;
};
const ErrorLineFullWidth = (props: Props) => {
  const { error } = props;
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{error}</Text>
      </View>
    );
  } else {
    return null;
  }
};

export default ErrorLineFullWidth;

const styles = StyleSheet.create({
  container: {
    width: widthToDp(100),
    backgroundColor: GlobalColors.red,
    padding: widthToDp(1.5),
    justifyContent: 'center',
    position: 'absolute',
    bottom: 100,
  },
  text: {
    fontSize: responsiveFontSize(18),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.white,
    paddingLeft: widthToDp(4),
  },
});
