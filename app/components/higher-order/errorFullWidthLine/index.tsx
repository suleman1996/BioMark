import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightToDp, widthToDp } from '../../../utils/functions/responsiveDimentions'
import { GlobalColors } from '../../../utils/theme/globalColors'

type Props = {}

const ErrorLineFullWidth = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>ErrorLineFullWidth</Text>
    </View>
  )
}

export default ErrorLineFullWidth

const styles = StyleSheet.create({
  container: {
            width: widthToDp(100),
            height: heightToDp(4),
            backgroundColor: GlobalColors.red,
  }
});