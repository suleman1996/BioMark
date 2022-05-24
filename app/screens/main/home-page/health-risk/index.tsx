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
  const listData = route.params.cardData;
  const refData = route.params.refData;
  const footNote = route.params.footNotesData;
  const calculations = route.params.calc;

  useEffect(() => {
    console.log(calculations, 'callllllllll');
  });

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
            data={listData}
            renderItem={renderItem}
            Refrences={refData && 'Refrences'}
            RefText={refData ? refData.text : undefined}
            FootNotes={footNote && 'Footnotes'}
            NotesText={footNote ? footNote.text : undefined}
            Calculation={calculations ? 'Calculation' : undefined}
            CalcText={calculations ? calculations.text : undefined}
          />
        </TitleWithBackLayout>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HealthRisk;
