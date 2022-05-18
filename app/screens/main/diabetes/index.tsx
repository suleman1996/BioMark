import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { TitleWithBackLayout } from 'components/layouts';
import { useTheme } from 'react-native-paper';

import makeStyles from './styles';

const Diabetes = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <SafeAreaView style={styles.safeareaview}>
      <TitleWithBackLayout>
        <View style={styles.view}>
          <View></View>
        </View>
      </TitleWithBackLayout>
    </SafeAreaView>
  );
};
export default Diabetes;
