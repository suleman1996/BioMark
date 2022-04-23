import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GlobalColors} from '../../../utils/theme/global-colors';
import ButtonComponent from '../button/index';
import {
  heightToDp,
  widthToDp,
} from '../../../utils/functions/responsive-dimensions';
import {GlobalStyles} from '../../../utils/theme/global-styles';

type Props = {
  onPress: any;
  disabled: boolean;
  title?: string;
};

const ButtonWithShadowContainer = ({title, onPress, disabled}: Props) => {
  return (
    <View style={styles.container}>
      <ButtonComponent
        onPress={onPress}
        title={title ? title : 'Save'}
        disabled={disabled}
      />
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
    paddingVertical: heightToDp(3),
    ...GlobalStyles.shadow,
  },
});
