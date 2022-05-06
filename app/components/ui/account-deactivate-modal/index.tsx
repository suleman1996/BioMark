import { Button, Modal } from 'components/base';
import { BioCloseGray } from 'components/svg';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';

type Props = {
  isVisible: boolean;
  setIsVisible: any;
  callMe: any;
};

const AccountDeActivateModal = (props: Props) => {
  const { isVisible, setIsVisible, callMe } = props;
  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Are You Sure?</Text>
          <Pressable onPress={() => setIsVisible(false)}>
            <BioCloseGray width={4} height={4} />
          </Pressable>
        </View>
        <Text style={styles.contentText}>
          Are you sure you would like to deactivate your BioMark account?
        </Text>
        <Button onPress={callMe} title={'Confirm'} disabled={false} />
        <Button
          bg={'transparent'}
          color={'gray'}
          onPress={() => setIsVisible(false)}
          title={'Not Now'}
          disabled={false}
        />
      </View>
    </Modal>
  );
};

export default AccountDeActivateModal;

const styles = StyleSheet.create({
  container: {
    width: widthToDp(92),
    backgroundColor: GlobalColors.white,
    borderRadius: widthToDp(3),

    paddingHorizontal: widthToDp(4),
    paddingVertical: heightToDp(2),
    alignItems: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: GlobalFonts.medium,
    fontSize: responsiveFontSize(25),
    color: GlobalColors.darkPrimary,
  },
  contentText: {
    fontFamily: GlobalFonts.light,
    fontSize: responsiveFontSize(20),
    color: 'gray',
    lineHeight: responsiveFontSize(30),
    marginTop: heightToDp(3),
    marginBottom: heightToDp(3),
  },
});
