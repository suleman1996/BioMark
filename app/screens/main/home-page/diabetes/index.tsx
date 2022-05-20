import React from 'react';
import { SafeAreaView, Text, ScrollView } from 'react-native';
import { TitleWithBackLayout } from 'components/layouts';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';
import HealthCard from 'components/health-risk-card';
import HealthListCard from 'components/health-list-card';

const Diabetes = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const Data = [
    {
      image: require('../../../../assets/images/home/people.png'),
      title: 'Age',
      text: 'Your risk increases above the age of 40.',
    },
    {
      image: require('../../../../assets/images/home/people.png'),
      title: 'Gender',
      text: 'Men are more likely to have type 2 diabetes compared to women.',
    },
    {
      image: require('../../../../assets/images/home/GD.png'),
      title: 'Gestational Diabetes',
      text: 'Women who had gestational diabetes are at an increased risk.',
    },
    {
      image: require('../../../../assets/images/home/Familyhod.png'),
      title: 'Fmaily History of Diabetes',
      text: 'A family history of diabetes may increases your risk.',
    },
    {
      image: require('../../../../assets/images/home/HighBloodPressure.png'),
      title: 'High Blood Pressure',
      text: 'Having high blood pressure increases your risk.',
    },
    {
      image: require('../../../../assets/images/home/Exercise.png'),
      title: 'Exercise',
      text: 'Being physically inactive increases your risk.',
    },
    {
      image: require('../../../../assets/images/home/Height.png'),
      title: 'Height',
      text: 'Your height is used to calculate Body Mass Index (BMI).High BMIs increases your risk.',
    },
    {
      image: require('../../../../assets/images/home/Weight.png'),
      title: 'Weight',
      text: 'Your weight is used to calculate Body Mass Index (BMI).High BMIs increases your risk.',
    },
  ];

  return (
    <SafeAreaView style={styles.safeareaview}>
      <ScrollView style={{ flex: 1 }}>
        <TitleWithBackLayout>
          <HealthCard
            H1Text={'Diabetes'}
            H2Text={'Low Risk'}
            number={'3'}
            image={require('../../../../assets/images/home/greenDrop.png')}
            description={
              ' A low score means you have a lower than average probability of developing prediabetes or type 2 diabetes. People with low score may still develop prediabetes or type 2 diabetes.If you develop symptoms of diabetes (frequent urination, thirst, unexplained weight loss, fatigue or blurred vision),please see your doctor.'
            }
          />
          <Text style={styles.text4}>Calculation</Text>
          <Text style={styles.text5}>
            This diabetes risk score is based on the Type 2 Diabetes Risk Test
            by the american Diabetes Association for people who have no prior
            history of diabetes or prediabetes.It takes the following factors
            into account.
          </Text>

          <HealthListCard data={Data} />

          <Text style={styles.text6}>Refrences</Text>
          <Text style={styles.text7}>American Diabetes Association</Text>
          <Text style={styles.text6}>Footnotes</Text>
          <Text style={styles.text7}>
            Your diabetes risk scores is only an estimate.Additionally,your risk
            changes over time.Only a blood test can determine a diagnoses.Please
            discuss with your doctor for more information.
          </Text>
        </TitleWithBackLayout>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Diabetes;
