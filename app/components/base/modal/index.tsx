import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {
  heightToDp,
  widthToDp,
} from '../../../utils/functions/responsive-dimensions';
import {GlobalColors} from '../../../utils/theme/global-colors';

type Props = {
  isVisible: boolean;
  children: any;
  setIsVisible: any;
};

const ModalComponent = ({isVisible, children, setIsVisible}: Props) => {
  return (
    <View>
      <Modal
        deviceWidth={widthToDp(100)}
        deviceHeight={heightToDp(100)}
        backdropColor={GlobalColors.transparentBlack}
        isVisible={isVisible}>
        <View style={styles.mainView}>{children}</View>
      </Modal>
    </View>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  mainView: {alignItems: 'center'},
});
