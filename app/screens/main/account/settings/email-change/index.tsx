import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TitleWithBackWhiteBgLayout from '../../../../../components/layouts/back-with-title-white-bg'
import { styles } from './styles'
import InputWithLabel from '../../../../../components/base/inputWithLabel'
import ButtonComponent from '../../../../../components/base/button'

type Props = {}

const EmailChangeScreen = (props: Props) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <TitleWithBackWhiteBgLayout title="Email">
        <View style={styles.container}>
          <InputWithLabel
            labelFontSize={25}
            label={'Email Address'}
            placeholder={'Enter your email address'}
            onChange={undefined}
          />
          <InputWithLabel
            labelFontSize={25}
            label={'Confirm Email Address'}
            placeholder={'Enter your email address'}
            onChange={undefined}
          />
        </View>
      </TitleWithBackWhiteBgLayout>
      <View style={styles.bottomBtnContainer}>
        <ButtonComponent disabled onPress={undefined} title={'Save'} />
      </View>
    </SafeAreaView>
  );
}

export default EmailChangeScreen;