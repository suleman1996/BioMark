import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import moment from 'moment';
import { TitleWithBackLayout } from 'components/layouts';
import Styles from './styles';
import fonts from 'assets/fonts';
import { userService } from 'services/user-service/user-service';
import Charts from './charts';
import { ActivityIndicator } from 'components/';

const MoreInfo = () => {
  const { colors } = useTheme();
  const route = useRoute();

  const styles = Styles(colors);

  const [summary, setSummary] = React.useState({});
  const [chartState, setChartState] = React.useState(false);
  const [summaryState, setSummaryState] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

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

  const getPdf = async (id) => {
    try {
      setIsLoading(true);
      const result = await userService.getResultPdf(id);
      console.log('her is the download pdf  ', result.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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

  const RenderDownload = ({ width, resultId }) => (
    <View
      style={{ width: width, alignItems: 'center', justifyContent: 'center' }}
    >
      <TouchableOpacity onPress={() => getPdf(resultId)}>
        <MaterialCommunityIcons
          name="download"
          style={{ fontSize: 30, color: colors.greenDark }}
        />
      </TouchableOpacity>
    </View>
  );

  const RenderTable = ({ data }) => (
    <View style={{ flexDirection: 'row' }}>
      <RenderView
        width={80}
        title={moment(data.date_of_test).format('MMMM D YYYY')}
      />
      <RenderView width={80} title={data.observation_value} />
      <RenderView width={70} title={data.unit} />
      <RenderView width={100} title={data.reference_range} />
      <RenderView
        width={110}
        title={data?.is_abnormal_flag ? 'Abnormal' : ''}
      />
      <RenderView width={120} title={data?.comment} />
      <RenderView width={130} title={data.provider_name} />
      <RenderDownload resultId={data?.id} width={70} />
    </View>
  );

  const RenderTableHeader = () => (
    <View style={{ flexDirection: 'row' }}>
      <RenderView color={colors.black} width={80} title="Date" />
      <RenderView color={colors.black} width={80} title="Result" />
      <RenderView color={colors.black} width={70} title="Unit" />
      <RenderView color={colors.black} width={100} title="Ref. Range" />
      <RenderView color={colors.black} width={110} title="Abnormal" />
      <RenderView color={colors.black} width={120} title="Comments" />
      <RenderView color={colors.black} width={130} title="Lab Source" />
    </View>
  );

  return (
    <TitleWithBackLayout title={summary?.name}>
      <ActivityIndicator visible={isLoading} />
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', margin: 10 }}>
          <TouchableOpacity
            onPress={() => {
              setSummaryState(true), setChartState(false);
            }}
          >
            <Text
              style={[
                styles.heading,
                { marginLeft: 10, fontSize: summaryState ? 18 : 16 },
              ]}
            >
              Summary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setChartState(true), setSummaryState(false);
            }}
          >
            <Text
              style={[
                styles.heading,
                { marginLeft: 20, fontSize: chartState ? 18 : 16 },
              ]}
            >
              Charts
            </Text>
          </TouchableOpacity>
        </View>
        {summaryState ? (
          <>
            <ScrollView>
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
                    {moment(summary?.latest?.date_of_test).format(
                      'MMMM D YYYY'
                    )}
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
                <View style={styles.gestureView}>
                  <MaterialCommunityIcons
                    name="gesture-swipe-horizontal"
                    style={{
                      fontSize: 30,
                      color: colors.greenDark,
                      marginTop: 10,
                    }}
                  />
                </View>
                {summary.definition != '' && (
                  <>
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
                      <Text style={styles?.definationText}>
                        {summary?.definition}
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </ScrollView>
          </>
        ) : (
          <ScrollView>
            <View style={{ flex: 1, margin: 15 }}>
              <Charts />
            </View>
          </ScrollView>
        )}
      </View>
    </TitleWithBackLayout>
  );
};

export default MoreInfo;
