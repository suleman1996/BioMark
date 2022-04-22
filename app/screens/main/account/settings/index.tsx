import React from 'react';
import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TitleWithBackWhiteBgLayout from '../../../../components/layouts/back-with-title-white-bg';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { responsiveFontSize } from '../../../../utils/functions/responsiveText';
import { GlobalColors } from '../../../../utils/theme/globalColors';
import {styles} from './styles'
import SingleMenuItemWithArrow from '../../../../components/higher-order/single-menu-item-with-right-arrow';
type Props = {};

const SettingsScreen = (props: Props) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <TitleWithBackWhiteBgLayout title="Settings">
        <SingleMenuItemWithArrow onPress={undefined} title={'Password'} />
        <SingleMenuItemWithArrow onPress={undefined} title={'Email'} />
        <SingleMenuItemWithArrow onPress={undefined} title={'Phone Number'} />
        <SingleMenuItemWithArrow onPress={undefined} title={'Marketing Consent'} />
        <SingleMenuItemWithArrow onPress={undefined} title={'Data privacy Query'} />
        <SingleMenuItemWithArrow onPress={undefined} title={'Account Deactivation'} />
      </TitleWithBackWhiteBgLayout>
    </SafeAreaView>
  );
};

export default SettingsScreen;
