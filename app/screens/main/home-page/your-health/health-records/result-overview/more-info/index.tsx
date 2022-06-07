import { View, Text, ScrollView, FlatList } from 'react-native';
import React from 'react';

import { useTheme } from 'react-native-paper';

import { TitleWithBackLayout } from 'components/layouts';
import Styles from './styles';
import fonts from 'assets/fonts';

const MoreInfo = () => {
  const { colors } = useTheme();

  const styles = Styles(colors);

  const [history] = React.useState([
    {
      id: 0,
      date: 'March 04 2022',
      result: 3.7,
      unit: 'mmol/L',
      range: '2.5-8.0',
      labSource: 'Chugtai Lab',
    },
    {
      id: 1,
      date: 'March 04 2022',
      result: 3.7,
      unit: 'mmol/L',
      range: '2.5-8.0',
      labSource: 'Chugtai Lab',
    },
    {
      id: 0,
      date: 'March 04 2022',
      result: 3.7,
      unit: 'mmol/L',
      range: '2.5-8.0',
      labSource: 'Chugtai Lab',
    },
    {
      id: 1,
      date: 'March 04 2022',
      result: 3.7,
      unit: 'mmol/L',
      range: '2.5-8.0',
      labSource: 'Chugtai Lab',
    },
    {
      id: 0,
      date: 'March 04 2022',
      result: 3.7,
      unit: 'mmol/L',
      range: '2.5-8.0',
      labSource: 'Chugtai Lab',
    },
    {
      id: 1,
      date: 'March 04 2022',
      result: 3.7,
      unit: 'mmol/L',
      range: '2.5-8.0',
      labSource: 'Chugtai Lab',
    },
  ]);

  const RenderView = ({ width, title, color }) => (
    <View
      style={{ width: width, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text
        style={{
          fontFamily: fonts.bold,
          color: color && colors.black,
          fontSize: color && 16,
        }}
      >
        {title}
      </Text>
    </View>
  );

  const RenderTable = ({ data }) => (
    <View style={{ flexDirection: 'row' }}>
      <RenderView width={80} title={data.date} />
      <RenderView width={50} title={data.result} />
      <RenderView width={70} title={data.unit} />
      <RenderView width={100} title={data.range} />
      <RenderView width={110} title="Abnormal" />
      <RenderView width={120} title="Comments" />
      <RenderView width={130} title={data.labSource} />
    </View>
  );

  const RenderTableHeader = () => (
    <View style={{ flexDirection: 'row' }}>
      <RenderView color={colors.black} width={80} title="Date" />
      <RenderView color={colors.black} width={50} title="Result" />
      <RenderView color={colors.black} width={70} title="Unit" />
      <RenderView color={colors.black} width={100} title="Ref. Range" />
      <RenderView color={colors.black} width={110} title="Abnormal" />
      <RenderView color={colors.black} width={120} title="Comments" />
      <RenderView color={colors.black} width={130} title="Lab Source" />
    </View>
  );

  return (
    <TitleWithBackLayout title="ORF1ab Gene Covid-19">
      <ScrollView>
        <View style={styles.container}>
          <Text style={[styles.heading, { marginLeft: 10 }]}>Summary</Text>
          <View style={styles.innerContainer}>
            <Text
              style={[
                styles.heading,
                { marginLeft: 10, color: colors.greenDark },
              ]}
            >
              YOUR LAST RESULT
            </Text>
            <View style={styles.lastResult}>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: 11,
                  color: colors.blue,
                }}
              >
                March 3, 2022
              </Text>
              <Text style={[styles.heading, { alignSelf: 'center' }]}>
                See PDF
              </Text>
              <View style={styles.divider} />
              <Text style={styles.heading}>
                <Text style={{ fontSize: 14 }}>Source : </Text>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular }}>
                  Hyper Tension
                </Text>
              </Text>
            </View>
            <Text
              style={[
                styles.heading,
                { marginLeft: 10, color: colors.greenDark, marginTop: 10 },
              ]}
            >
              HISTORY
            </Text>

            <View style={[styles.lastResult]}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <FlatList
                  data={history}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <RenderTable data={item} />}
                  ListHeaderComponent={() => <RenderTableHeader />}
                />
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
    </TitleWithBackLayout>
  );
};

export default MoreInfo;
