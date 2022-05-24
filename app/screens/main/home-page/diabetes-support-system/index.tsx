import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import Icon from '../../../../assets/svgs/empower';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';
import GradientButton from 'components/linear-gradient-button';

import { useTheme } from 'react-native-paper';
import makeStyles from './styles';

const DiabetesSupportCenter = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <TitleWithBackWhiteBgLayout title={undefined}>
      <ScrollView>
        <View style={styles.view}>
          <Icon height={60} />
        </View>
        <Text style={styles.text}>Welcome to your Diabetes Support Center</Text>
        <Text style={styles.text2}>
          Here you can track your blood sugar, medications, and access resources
          to help you manage your diabetes.
        </Text>

        <GradientButton
          text="Continue"
          color={['#2C6CFC', '#2CBDFC']}
          style={styles.gradientButton2}
          onPress={() => navigate(SCREENS.DIABETES_CENTER)}
        />
      </ScrollView>
    </TitleWithBackWhiteBgLayout>
  );
};
export default DiabetesSupportCenter;
