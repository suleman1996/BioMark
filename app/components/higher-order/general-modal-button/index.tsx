import React from 'react';
import { Text, Pressable } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { GlobalColors } from 'utils/theme/global-colors';
import { responsiveFontSize } from 'utils/functions/responsive-text';

import { styles } from './styles';

type Props = {
  isSelected: boolean;
  title: string;
  setIsModal: any;
  isModal: boolean;
  drop: boolean;
  history: any;
  condition_id: any;
};

const GeneralModalButton = ({
  isSelected,
  title,
  setIsModal,
  isModal,
  drop,
}: Props) => {
  const textColor = isSelected
    ? { color: GlobalColors.white }
    : { color: GlobalColors.lightGrey };

  const bgColor = isSelected
    ? { backgroundColor: GlobalColors.darkPrimary }
    : { backgroundColor: GlobalColors.white };

  return (
    <Pressable
      onPress={() => {
        setIsModal(true);
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

export default GeneralModalButton;
