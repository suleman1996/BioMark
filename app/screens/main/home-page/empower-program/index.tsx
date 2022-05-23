import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import Icon from '../../../../assets/svgs/empower';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';
import GradientButton from 'components/linear-gradient-button';

import { useTheme } from 'react-native-paper';
import makeStyles from './styles';

const EmpowerProgram = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <TitleWithBackWhiteBgLayout title={undefined}>
      <ScrollView>
        <View style={styles.view}>
          <Icon height={60} />
        </View>
        <Text style={styles.text}>Welcome to the Empower Program</Text>
        <Text style={styles.text2}>
          Welcome to the Empower Program. Our goal is to empower you in your
          treatment journey!
        </Text>
        <GradientButton
          text="Continue to Hypertension Center"
          color={['#2C6CFC', '#2CBDFC']}
          style={styles.gradientButton}
        />
        <GradientButton
          text="Continue to Diabetes Center"
          color={['#2C6CFC', '#2CBDFC']}
          style={styles.gradientButton2}
          onPress={() => navigate(SCREENS.DIABETES_SUPPORT_CENTER)}
        />
      </ScrollView>
    </TitleWithBackWhiteBgLayout>
  );
};
export default EmpowerProgram;
