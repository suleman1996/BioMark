import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalColors } from './../../../utils/theme/globalColors';
import ButtonComponent from './../button/index';
import { heightToDp, widthToDp } from '../../../utils/functions/responsiveDimentions';
import { GlobalStyles } from './../../../utils/theme/globalStyles';

const ButtonWithShadowContainer = ({title, onPress,disabled}) => {
  return (
    <View style={styles.container}>
      <ButtonComponent
        onPress={onPress}
        disabled={disabled}
        title={title ? title : 'Save & Continue'}
      />
    </View>
  );
}

export default ButtonWithShadowContainer

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    backgroundColor: GlobalColors.white,
    bottom: 0,
    paddingHorizontal: widthToDp(8),
    paddingVertical: heightToDp(3),
    ...GlobalStyles.shadow,
  },
});