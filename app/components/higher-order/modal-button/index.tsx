import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalColors } from 'utils/theme/global-colors';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

type Props = {
  title: string;
  setIsModal: any;
  isModal: boolean;
  drop: boolean;
};

const ModalButtonComponent = ({
  title,
  setIsModal,
  isModal,
  drop,
  history,
  condition_id,
}: Props) => {
  const textColor = isModal
    ? { color: GlobalColors.white }
    : { color: GlobalColors.lightGrey };
  const bgColor = isModal
    ? { backgroundColor: GlobalColors.darkPrimary }
    : { backgroundColor: GlobalColors.white };

  return (
    <Pressable
      onPress={() => {
        setIsModal(!isModal);
        if (!isModal) {
          history.push({
            condition_id: condition_id,
            medical_type: 'family',
            has_condition: true,
          });
        } else {
          history.splice(
            history.map((object) => object.condition_id).indexOf(condition_id),
            1
          );
        }
      }}
      style={[styles.container, bgColor]}
    >
      <Text numberOfLines={1} style={[styles.label, textColor]}>
        {title}
      </Text>
      {drop ? (
        <MaterialCommunityIcons
          size={responsiveFontSize(20)}
          name="chevron-down"
          color={isModal ? GlobalColors.white : 'black'}
        />
      ) : null}
    </Pressable>
  );
};

export default ModalButtonComponent;

const styles = StyleSheet.create({
  container: {
    width: widthToDp(40),
    height: heightToDp(7),
    backgroundColor: GlobalColors.white,
    borderRadius: widthToDp(2),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  label: {
    fontSize: responsiveFontSize(17),
    fontFamily: GlobalFonts.regular,
    color: GlobalColors.gray,
  },
});
