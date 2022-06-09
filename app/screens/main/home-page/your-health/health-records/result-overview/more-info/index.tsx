import { View, Text, ScrollView, FlatList } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

import { useTheme } from 'react-native-paper';

import moment from 'moment';
import { TitleWithBackLayout } from 'components/layouts';
import Styles from './styles';
import fonts from 'assets/fonts';
import { userService } from 'services/user-service/user-service';

const MoreInfo = () => {
  const { colors } = useTheme();
  const route = useRoute();

  const styles = Styles(colors);

  const [summary, setSummary] = React.useState();

  const moreInfoData = async () => {
    try {
      const result = await userService.getMoreInfoResult(
        route?.params?.result_id
      );
      setSummary(result.data);
      console.log('success ', result.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    moreInfoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <RenderView
        width={80}
        title={moment(data.date_of_test).format('MMMM D YYYY')}
      />
      <RenderView width={65} title={data.observation_value} />
      <RenderView width={70} title={data.unit} />
      <RenderView width={100} title={data.reference_range} />
      <RenderView
        width={110}
        title={data?.is_abnormal_flag ? 'Abnormal' : ''}
      />
      <RenderView width={120} title={data?.comment} />
      <RenderView width={130} title={data.provider_name} />
    </View>
  );

  const RenderTableHeader = () => (
    <View style={{ flexDirection: 'row' }}>
      <RenderView color={colors.black} width={80} title="Date" />
      <RenderView color={colors.black} width={65} title="Result" />
      <RenderView color={colors.black} width={70} title="Unit" />
      <RenderView color={colors.black} width={100} title="Ref. Range" />
      <RenderView color={colors.black} width={110} title="Abnormal" />
      <RenderView color={colors.black} width={120} title="Comments" />
      <RenderView color={colors.black} width={130} title="Lab Source" />
    </View>
  );

  return (
    <TitleWithBackLayout title={summary?.name}>
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
                {moment(summary?.latest?.date_of_test).format('MMMM D YYYY')}
              </Text>
              <Text style={[styles.heading, { alignSelf: 'center' }]}>
                {summary?.latest?.value} {summary?.latest?.unit}
              </Text>
              <View style={styles.divider} />
              <Text style={styles.heading}>
                <Text style={{ fontSize: 14 }}>Reference Range : </Text>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular }}>
                  {summary?.latest?.ref_range}
                </Text>
              </Text>
              <Text style={styles.heading}>
                <Text style={{ fontSize: 14 }}>Source : </Text>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular }}>
                  {summary?.latest?.provider_name}
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
                  data={summary?.history}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <RenderTable data={item} />}
                  ListHeaderComponent={() => <RenderTableHeader />}
                />
              </ScrollView>
            </View>

            <Text
              style={[
                styles.heading,
                {
                  marginLeft: 10,
                  color: colors.greenDark,
                  marginVertical: 10,
                },
              ]}
            >
              DEFINITION
            </Text>
            <View style={styles.definationView}>
              <Text style={styles?.definationText}>{summary?.definition}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </TitleWithBackLayout>
  );
};

export default MoreInfo;
