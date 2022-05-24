import React, { useEffect } from 'react';
import { SafeAreaView, Text, ScrollView, View, Image } from 'react-native';
import { TitleWithBackLayout } from 'components/layouts';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';
import HealthCard from 'components/health-risk-card';
import HealthListCard from 'components/health-list-card';

const HealthRisk = ({ route }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const listItems = route.params.item;
  const db = route.params.diabetes;
  const hd = route.params.heartDisease;

  useEffect(() => {
    console.log(JSON.stringify(listItems));
    console.log(db, 'diabetes');
    console.log(hd, 'heartdiseas');
  });

  // const Data = [
  //   {
  //     image: require('../../../../assets/images/home/people.png'),
  //     title: 'Age',
  //     text: 'Your risk increases above the age of 40.',
  //   },
  //   {
  //     image: require('../../../../assets/images/home/people.png'),
  //     title: 'Gender',
  //     text: 'Men are more likely to have type 2 diabetes compared to women.',
  //   },
  //   {
  //     image: require('../../../../assets/images/home/GD.png'),
  //     title: 'Gestational Diabetes',
  //     text: 'Women who had gestational diabetes are at an increased risk.',
  //   },
  //   {
  //     image: require('../../../../assets/images/home/Familyhod.png'),
  //     title: 'Fmaily History of Diabetes',
  //     text: 'A family history of diabetes may increases your risk.',
  //   },
  //   {
  //     image: require('../../../../assets/images/home/HighBloodPressure.png'),
  //     title: 'High Blood Pressure',
  //     text: 'Having high blood pressure increases your risk.',
  //   },
  //   {
  //     image: require('../../../../assets/images/home/Exercise.png'),
  //     title: 'Exercise',
  //     text: 'Being physically inactive increases your risk.',
  //   },
  //   {
  //     image: require('../../../../assets/images/home/Height.png'),
  //     title: 'Height',
  //     text: 'Your height is used to calculate Body Mass Index (BMI).High BMIs increases your risk.',
  //   },
  //   {
  //     image: require('../../../../assets/images/home/Weight.png'),
  //     title: 'Weight',
  //     text: 'Your weight is used to calculate Body Mass Index (BMI).High BMIs increases your risk.',
  //   },
  // ];

  const renderItem = ({ item }) => {
    return (
      <>
        <View style={styles.flatlistView}>
          <View style={styles.flatlistView2}>
            <Image source={item.image} style={styles.flatlistImage} />
            <Text style={styles.flatlisttext}>{item.title}</Text>
          </View>
          <Text style={styles.flatlisttext2}>{item.text}</Text>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safeareaview}>
      <ScrollView style={{ flex: 1 }}>
        <TitleWithBackLayout>
          <HealthCard
            H1Text={listItems.name}
            H2Text={listItems.card_status}
            number={listItems.value}
            image={require('../../../../assets/images/home/greenDrop.png')}
            description={listItems.summary}
          />
          <HealthListCard
            data={hd}
            renderItem={renderItem}
            Refrences={'Refrences'}
            RefText={'American Diabetes Association'}
            FootNotes={'Footnotes'}
            NotesText={
              'Your diabetes risk scores is only an estimate.Additionally,your risk changes over time.Only a blood test can determine a diagnoses.Please discuss with your doctor for more information.'
            }
            Calculation={'Calculation'}
            CalcText={
              'This diabetes risk score is based on the Type 2 Diabetes Risk Test by the american Diabetes Association for people who have no prior history of diabetes or prediabetes.It takes the following factors into account.'
            }
          />
        </TitleWithBackLayout>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HealthRisk;
