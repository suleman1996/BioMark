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
import { checkPermissionAndDownloadBase64 } from 'utils/functions/download-file';
import Styles from './styles';
import fonts from 'assets/fonts';
import Charts from './charts';
import { ActivityIndicator } from 'components/';
import DescriptiveBtn from 'components/descriptive-btn';
import { healthRecordServices } from 'services/health-record-service';
import { useTranslation } from 'react-i18next';

const MoreInfo = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const route = useRoute();
  const regexOfRemoveTags = /(<([^>]+)>)/gi;

  const styles = Styles(colors);

  const [summary, setSummary] = React.useState({});
  const [chartState, setChartState] = React.useState(false);
  const [summaryState, setSummaryState] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const moreInfoData = async () => {
    try {
      const result = await healthRecordServices.getMoreInfoResult(
        route?.params?.result_id
      );
      setSummary(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getPdf = async (id) => {
    try {
      setIsLoading(true);
      const result = await healthRecordServices.getResultPdf(id);

      checkPermissionAndDownloadBase64(result.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    moreInfoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const RenderView = ({ width, title, color, bgColor, font }) => (
    <View
      style={{
        width: width,
        justifyContent: 'center',
        backgroundColor: bgColor,
      }}
    >
      <Text
        style={{
          fontFamily: font ? font : fonts.regular,
          color: color ? color : colors.bg,
          fontSize: 14,
        }}
      >
        {title}
      </Text>
    </View>
  );

  const RenderDownload = ({ width, resultId, name, bgColor }) => (
    <View
      style={{
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgColor,
      }}
    >
      <TouchableOpacity onPress={() => getPdf(resultId)}>
        <MaterialCommunityIcons
          name={name}
          style={{ fontSize: 30, color: colors.greenDark }}
        />
      </TouchableOpacity>
    </View>
  );

  const RenderTable = ({ data }) => (
    <View style={{ flexDirection: 'row' }}>
      <RenderDownload
        name="chart-timeline-variant"
        resultId={data?.id}
        width={60}
        bgColor={
          (data?.is_abnormal_flag || data?.finding == 'low') && colors.abnormal
        }
      />
      <RenderView
        width={70}
        title={moment(data.date_of_test).format('MMMM D YYYY')}
        bgColor={
          (data?.is_abnormal_flag || data?.finding == 'low') && colors.abnormal
        }
        color={colors.heading}
      />
      <RenderView
        width={80}
        title={data.observation_value}
        bgColor={
          (data?.is_abnormal_flag || data?.finding == 'low') && colors.abnormal
        }
        color={colors.heading}
      />
      <RenderView
        width={70}
        title={data.unit}
        bgColor={
          (data?.is_abnormal_flag || data?.finding == 'low') && colors.abnormal
        }
        color={colors.heading}
      />
      <RenderView
        width={100}
        title={data.reference_range}
        bgColor={
          (data?.is_abnormal_flag || data?.finding == 'low') && colors.abnormal
        }
        color={colors.heading}
      />
      <RenderView
        width={110}
        title={data?.is_abnormal_flag || data?.finding == 'low' ? 'YES' : ''}
        bgColor={
          (data?.is_abnormal_flag || data?.finding == 'low') && colors.abnormal
        }
        color={
          (data?.is_abnormal_flag || data?.finding == 'low') && colors.high
        }
      />
      <RenderView
        width={120}
        title={data?.comment}
        bgColor={
          (data?.is_abnormal_flag || data?.finding == 'low') && colors.abnormal
        }
        color={colors.heading}
      />
      <RenderView
        width={130}
        title={data.provider_name}
        bgColor={
          (data?.is_abnormal_flag || data?.finding == 'low') && colors.abnormal
        }
        color={colors.heading}
      />
      <RenderDownload
        name="download"
        resultId={data?.id}
        width={70}
        bgColor={
          (data?.is_abnormal_flag || data?.finding == 'low') && colors.abnormal
        }
      />
    </View>
  );

  const RenderTableHeader = () => (
    <View style={{ flexDirection: 'row' }}>
      <RenderView color={colors.black} width={60} />
      <RenderView
        color={colors.black}
        font={fonts.bold}
        width={70}
        title="Date"
      />
      <RenderView
        color={colors.black}
        font={fonts.bold}
        width={80}
        title="Result"
      />
      <RenderView
        color={colors.black}
        font={fonts.bold}
        width={70}
        title="Unit"
      />
      <RenderView
        color={colors.black}
        font={fonts.bold}
        width={100}
        title="Ref. Range"
      />
      <RenderView
        color={colors.black}
        font={fonts.bold}
        width={110}
        title="Abnormal"
      />
      <RenderView
        color={colors.black}
        font={fonts.bold}
        width={120}
        title="Comments"
      />
      <RenderView
        color={colors.black}
        font={fonts.bold}
        width={130}
        title="Lab Source"
      />
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
              {t('pages.resultSummary.tabs.summary.title')}
            </Text>
          </TouchableOpacity>
          {summary?.providers?.length !== 0 && (
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
                {t('pages.resultSummary.tabs.chart.title')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {summaryState ? (
          <>
            <ScrollView>
              <View style={styles.innerContainer}>
                <Text
                  style={[
                    styles.heading,
                    {
                      marginLeft: 10,
                      color: colors.greenDark,
                      fontFamily: fonts.OpenSansBold,
                    },
                  ]}
                >
                  YOUR LAST RESULT
                </Text>
                <View style={styles.lastResult}>
                  <Text
                    style={{
                      fontFamily: fonts.regular,
                      fontSize: 11,
                      color: colors.heading,
                    }}
                  >
                    {moment(summary?.latest?.date_of_test).format(
                      'MMMM D YYYY'
                    )}
                  </Text>
                  <Text
                    style={[
                      styles.heading,
                      {
                        alignSelf: 'center',
                        fontFamily: fonts.OpenSansBold,
                        color:
                          summary?.latest?.finding == 'low' ||
                          summary?.latest?.finding == 'high'
                            ? colors.red
                            : summary?.latest?.finding == 'normal'
                            ? colors.greenDark
                            : colors.heading,
                      },
                    ]}
                  >
                    {summary?.latest?.value} {summary?.latest?.unit}
                  </Text>
                  <View style={styles.divider} />

                  <Text style={styles.heading}>
                    <Text
                      style={{ fontSize: 14, fontFamily: fonts.OpenSansBold }}
                    >
                      {t('pages.resultSummary.tabs.summary.referenceRange')}
                    </Text>
                    <Text style={{ fontSize: 14, fontFamily: fonts.open }}>
                      {summary?.latest?.ref_range}
                    </Text>
                  </Text>
                  <Text style={styles.heading}>
                    <Text
                      style={{ fontSize: 14, fontFamily: fonts.OpenSansBold }}
                    >
                      {t('pages.resultSummary.tabs.summary.source')}
                    </Text>
                    <Text style={{ fontSize: 14, fontFamily: fonts.light }}>
                      {summary?.latest?.provider_name}
                    </Text>
                  </Text>
                </View>
                <Text
                  style={[
                    styles.heading,
                    {
                      marginLeft: 10,
                      color: colors.greenDark,
                      marginTop: 10,
                      fontFamily: fonts.OpenSansBold,
                    },
                  ]}
                >
                  {t('pages.resultSummary.tabs.summary.history')}
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
                      {t('pages.resultSummary.tabs.summary.definition')}
                    </Text>
                    <View style={styles.definationView}>
                      <Text style={styles?.definationText}>
                        {summary?.definition}
                      </Text>
                    </View>
                  </>
                )}

                {summary?.description?.normal_reading !== null && (
                  <DescriptiveBtn
                    status="normal"
                    question={`What if my ${summary?.name} is normal?`}
                    description={summary?.description?.normal_reading.replace(
                      regexOfRemoveTags,
                      ''
                    )}
                  />
                )}
                {summary?.description?.low_reading !== null && (
                  <DescriptiveBtn
                    status="low"
                    question={`What if my ${summary?.name} is low?`}
                    description={summary?.description?.low_reading.replace(
                      regexOfRemoveTags,
                      ''
                    )}
                  />
                )}
                {summary?.description?.high_reading !== null && (
                  <DescriptiveBtn
                    status="high"
                    question={`What if my ${summary?.name} is high?`}
                    description={summary?.description?.high_reading.replace(
                      regexOfRemoveTags,
                      ''
                    )}
                  />
                )}
              </View>
            </ScrollView>
          </>
        ) : (
          <ScrollView>
            <View style={{ flex: 1, margin: 15 }}>
              <Charts
                provider={summary?.providers}
                biomarker_id={route?.params?.result_id}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </TitleWithBackLayout>
  );
};
export default MoreInfo;
