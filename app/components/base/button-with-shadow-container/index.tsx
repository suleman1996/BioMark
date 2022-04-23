import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GlobalColors} from '../../../utils/theme/globalColors';
import ButtonComponent from '../button/index';
import {
  heightToDp,
  widthToDp,
} from '../../../utils/functions/responsiveDimentions';
import {GlobalStyles} from '../../../utils/theme/globalStyles';

type Props = {
  onPress: any;
  title?: string;
};

const ButtonWithShadowContainer = ({title, onPress,disabled}: Props) => {
  return (
    <View style={styles.container}>
      <ButtonComponent onPress={onPress} title={title ? title : ''} disabled={disabled}/>
    </View>
  );
};

export default ButtonWithShadowContainer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    backgroundColor: GlobalColors.white,
    bottom: 0,
    paddingHorizontal: widthToDp(6),
    paddingVertical: heightToDp(2),
    ...GlobalStyles.shadow,
  },
});
