/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text } from 'react-native';
import React from 'react';

import { TitleWithBackWhiteBgLayout } from 'components/layouts';

import Styles from './styles';
import { useTheme } from 'react-native-paper';

const Index = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  //   const navigation = useNavigation();

  return (
    <TitleWithBackWhiteBgLayout title={''}>
      <View>
        <Text>Hbac1 content</Text>
      </View>
    </TitleWithBackWhiteBgLayout>
  );
};

export default Index;
