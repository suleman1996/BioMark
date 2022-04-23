import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalFonts } from '../../../utils/theme/fonts'
import { responsiveFontSize } from '../../../utils/functions/responsiveText'
import colors from '../../../assets/colors/colors'
import { heightToDp } from '../../../utils/functions/responsiveDimentions'

type Props = {
          text: string | undefined
}

const ErrorText = (props: Props) => {
   const {text} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.errorMessage}>{text}</Text>
    </View>
  );
}

export default ErrorText

const styles = StyleSheet.create({
  container: {
          width: '100%',
          marginTop: heightToDp(1)
  },
  errorMessage: {
    fontFamily: GlobalFonts.regular,
    fontSize: responsiveFontSize(15),
    color: colors.danger,
  },
});