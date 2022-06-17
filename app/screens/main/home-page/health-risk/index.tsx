import React from 'react';
import { SafeAreaView, Text, ScrollView, View, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import SCREENS from 'navigation/constants';
import { TitleWithBackLayout } from 'components/layouts';
import HealthCard from 'components/health-risk-card';
import HealthListCard from 'components/health-list-card';

import makeStyles from './styles';
import fonts from 'assets/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { Button } from 'components/button';
import ButtonComponent from 'components/base/button';

const HealthRisk = ({ route }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const navigation = useNavigation();

  const listItems = route.params.item;
  const listData = route.params.cardData;
  const refData = route.params.refData;
  const footNote = route.params.footNotesData;
  const calculations = route.params.calc;
  const color = route.params.clr;
  const SVG = route.params.SVG;

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

  // console.log(RISK_BTNS[listItems?.button_type]);

  return (
    <SafeAreaView style={styles.safeareaview}>
      <ScrollView style={{ flex: 1 }}>
        <TitleWithBackLayout>
          <HealthCard
            H1Text={listItems.name}
            H2Text={listItems.card_status}
            H2TextStyle={{ color: color, fontFamily: fonts.extraBold }}
            number={listItems.value}
            numberStyle={{
              textAlign: 'center',
              fontSize: responsiveFontSize('50'),
              fontFamily: fonts.OpenSansBold,
              color: color,
            }}
            svg={<SVG fill={color} />}
            description={listItems.summary}
          />
          {route?.params?.title && (
            <View style={{ alignItems: 'center', paddingBottom: 20 }}>
              <ButtonComponent
                onPress={() => navigation.navigate(route?.params?.onPress)}
                title={route?.params?.title}
              />
            </View>
          )}
          {Object.keys(listItems?.button_type).includes(
            listItems?.button_type
          ) && (
            <Button
              marginVertical={1}
              title={RISK_BTNS[listItems?.button_type].btn}
              onPress={() => navigate(RISK_BTNS[listItems?.button_type].url)}
            />
          )}
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

const RISK_BTNS: any = {
  blood_test: {
    url: SCREENS.RESULT_UPLOAD,
    btn: 'Upload Blood Test',
  },
  medical: {
    url: SCREENS.MEDICAL_HISTORY,
    btn: 'Complete Medical History',
  },
  lifestyle: { url: SCREENS.EDIT_PROFILE, btn: 'Input Profile Data' },
  ethnic: {
    url: SCREENS.MEDICAL_HISTORY,
    btn: 'Input Ethnicity',
  },
  exercise: {
    url: SCREENS.EXERCISE,
    btn: 'Input Excersise Value',
  },

  bp: {
    url: SCREENS.BLOOD_PRESSURE,
    btn: 'Input Blood Pressure',
  },
  bmi: {
    url: SCREENS.BODY_MEASUREMENT,
    btn: 'Upload Height and Weight',
  },
  family_medical: {
    url: SCREENS.FAMILY_MEDICAL_HISTORY,
    btn: 'Complete Familty Medical History',
  },
  hw: {
    url: SCREENS.BODY_MEASUREMENT,
    btn: 'Upload Height and Weight',
  },
  smoking: {
    url: SCREENS.SMOKING,
    btn: 'Input Smoking Data',
  },
  stress: {
    url: SCREENS.STRESS,
    btn: 'Input Stress Data',
  },
  drinking: {
    url: SCREENS.DRINKING,
    btn: 'Input Drinking Data',
  },
  sleep: {
    url: SCREENS.SLEEP,
    btn: 'Input Sleep Data',
  },
  notFound: { url: null, btn: '' },
};
