import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TitleWithBackWhiteBgLayout from '../../../../../components/layouts/back-with-title-white-bg';
import { styles } from './styles';
import PhoneNumberWithLabel from '../../../../../components/base/phone-with-label';

type Props = {};

const PhoneChangeScreen = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleWithBackWhiteBgLayout title="Phone">
        <View style={styles.container}>
          <Text style={styles.phoneText}>Mobile Number</Text>
          <PhoneNumberWithLabel disabled={true} placeholder={'454545454545'} />
        </View>
      </TitleWithBackWhiteBgLayout>
    </SafeAreaView>
  );
};

export default PhoneChangeScreen;
