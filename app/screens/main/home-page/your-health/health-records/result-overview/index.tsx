import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';

import moment from 'moment';
import { useTheme } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { getReduxResultOverview } from 'store/home/home-actions';
import { useRoute, useNavigation } from '@react-navigation/native';

import Styles from './styles';
import { TitleWithBackLayout } from 'components/layouts';
import { onShare } from 'components/social-share/index';
import SearchMeuBar from 'components/search-menu-bar/index';
import { Button } from 'components/button';
import Pdf from 'assets/svgs/pdf';
import RenderResults from './result-card';
import HealthProgressFilter from 'components/health-progress-filter/index';
import SCREENS from 'navigation/constants/index';
import { healthRecordServices } from 'services/health-record-service';
import { useTranslation } from 'react-i18next';
import ReactNativeBlobUtil from 'react-native-blob-util';

const Index = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const styles = Styles(colors);
  const dispatch = useDispatch();
  const resultOverView = useSelector(
    (state: IAppState) => state.home.getResultOverViewData
  );

  const [showSummaryummary, setSummary] = React.useState(true);

  const [isInfo, setIsInfo] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [filterOption1] = React.useState([
    { id: 0, title: t('pages.encodedResults.filters.all') },
    { id: 1, title: t('pages.encodedResults.filters.abnormal') },
  ]);
  const [selectedfilterOption1, setSelectedfilterOption1] = React.useState({
    id: 0,
    title: t('pages.encodedResults.filters.all'),
  });
  const [pdfReport, setPdfReport] = React.useState('');

  console.log(
    'result ',
    route?.params?.result
      ? route?.params?.result?.lab_id
      : route?.params?.lab_id
  );

  React.useEffect(() => {
    dispatch(
      getReduxResultOverview(
        route?.params?.result
          ? route?.params?.result?.lab_id
          : route?.params?.lab_id
      )
    );
    PdfData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const PdfData = async () => {
    try {
      const result = await healthRecordServices.getResultPdf(
        resultOverView?.lab_id
      );

      // setPdfReport(result.data);
      convertBase64(result.data);
      //   setPdf(pspPdfLinks.link);
    } catch (err) {
      console.error('Pdf report error ', err);
    }
  };

  const RenderSummaryTitle = ({ state, setState, title }) => (
    <TouchableOpacity
      onPress={() => setState(!state)}
      style={styles.titleContainer}
    >
      <Text style={styles.renderTitle}>{title}</Text>
      <AntDesign color={colors.blue} size={15} name={state ? 'up' : 'down'} />
    </TouchableOpacity>
  );

  const RenderSummary = () => (
    <View style={styles.summaryContainer}>
      <View style={{ marginHorizontal: 5 }}>
        <RenderSummaryTitle
          title={t('pages.resultSummary.tabs.summary.title')}
          state={showSummaryummary}
          setState={setSummary}
        />
      </View>
      {showSummaryummary && (
        <>
          <View style={styles.infoView}>
            <AntDesign color={colors.blue} name="infocirlceo" />
            <Text style={styles.infoText}>
              <Text>
                {
                  resultOverView?.result?.summary.split(
                    /[0-9]+ out of [0-9]+/
                  )[0]
                }
              </Text>
              <Text style={{ color: colors.heading, fontWeight: 'bold' }}>
                {resultOverView?.result?.summary.match(/[0-9]+ out of [0-9]+/)}
              </Text>
              <Text>
                {
                  resultOverView?.result?.summary.split(
                    /[0-9]+ out of [0-9]+/
                  )[1]
                }
              </Text>
            </Text>
          </View>
          <Text style={[styles.overLayHeading, { fontSize: 16 }]}>
            {resultOverView?.result?.doctor}
          </Text>
        </>
      )}
    </View>
  );

  const RenderHeading = ({ title }) => (
    <Text style={styles.overLayHeading}>{title}</Text>
  );

  const RenderSubheading = ({ subTitle }) => (
    <Text style={styles.overLaySubHeading}>{subTitle}</Text>
  );

  const ResultsDetails = ({ visible = false }) => {
    if (!visible) {
      return null;
    }
    return (
      <Pressable style={styles.overLay} onPress={() => setIsInfo(false)}>
        <View style={styles.overLayContainer}>
          <RenderHeading title={t('pages.encodedResults.info.title')} />
          {resultOverView?.provider !== '' && (
            <>
              <RenderHeading title={t('pages.encodedResults.info.source')} />
              <RenderSubheading subTitle={resultOverView?.provider} />
            </>
          )}
          {resultOverView?.result?.doctor !== '' && (
            <>
              <RenderHeading title={t('pages.encodedResults.info.reference')} />
              <RenderSubheading subTitle={resultOverView?.result?.doctor} />
            </>
          )}
          {resultOverView?.ref_no !== '' && (
            <>
              <RenderHeading
                title={t('pages.encodedResults.info.labReference')}
              />
              <RenderSubheading subTitle={resultOverView?.ref_no} />
            </>
          )}
          {resultOverView?.report_received !== '' && (
            <>
              <RenderHeading title={t('pages.encodedResults.info.received')} />
              <RenderSubheading
                subTitle={moment(resultOverView?.report_received).format(
                  'MMM DD, YYYY'
                )}
              />
            </>
          )}
          {resultOverView?.report_printed !== '' && (
            <>
              <RenderHeading title={t('pages.encodedResults.info.printed')} />
              <RenderSubheading
                subTitle={moment(resultOverView?.report_printed).format(
                  'MMM DD, YYYY'
                )}
              />
            </>
          )}

          <View style={{ marginTop: 20 }}>
            <Button
              onPress={() => setIsInfo(false)}
              marginVertical={1}
              marginHorizontal={1}
              title={t('pages.encodedResults.info.close')}
            />
          </View>
        </View>
      </Pressable>
    );
  };

  const applyFilter = (filter1) => {
    setSelectedfilterOption1(filter1);

    dispatch(
      getReduxResultOverview(
        route?.params?.result
          ? route?.params?.result?.lab_id
          : route?.params?.lab_id,
        filter1?.title
      )
    );
    setIsVisible(false);
  };

  const convertBase64 = (link) => {
    const fs = ReactNativeBlobUtil.fs;
    let imagePath = null;
    ReactNativeBlobUtil.config({
      fileCache: true,
    })
      .fetch('GET', link)

      .then((resp) => {
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then((base64Data) => {
        setPdfReport(base64Data);

        return fs.unlink(imagePath);
      });
  };

  return (
    <View style={styles.container}>
      <ResultsDetails visible={isInfo} />
      <HealthProgressFilter
        option1={t('pages.encodedResults.filters.type')}
        visible={isVisible}
        setIsVisible={setIsVisible}
        filterOption1={filterOption1}
        selectedfilterOption1={selectedfilterOption1}
        setSelectedfilterOption1={setSelectedfilterOption1}
        onApplyPress={applyFilter}
        values={{ selectedfilterOption1 }}
        filterModalClose={() => setIsVisible(false)}
      />
      <TitleWithBackLayout
        shadow={colors.blue}
        title={t('pages.labResultOverview.title')}
        isShare={true}
        isInfo={true}
        onPressInfo={setIsInfo}
        onSharePress={async () => {
          await onShare({
            title: 'Sharing pdf file from BioMark',
            url: `data:application/pdf;base64,${pdfReport}`,
          });
        }}
        // shouldGoBack
      >
        <View style={styles.miniHeader}>
          <Text style={styles.miniHeaderText}>
            Received on{' '}
            {moment(resultOverView?.report_received).format('MMM DD, YYYY')}
          </Text>
        </View>
        <View style={[styles.container, { paddingHorizontal: 10 }]}>
          <View style={{ marginTop: -18 }}>
            <SearchMeuBar
              onPress={() => setIsVisible(!isVisible)}
              placeHolder="Search Biomark..."
              LabId={route?.params?.result?.lab_id}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <RenderSummary />
            <Button
              svg={<Pdf fill={colors.white} />}
              onPress={() =>
                navigation.navigate(SCREENS.SEE_REPORT, {
                  date: resultOverView?.report_received,
                  resultId: resultOverView?.lab_id,
                })
              }
              title={t('pages.labResultOverview.seeResults')}
            />
            {resultOverView?.panel?.map((result) => (
              <>
                <RenderResults result={result} />
              </>
            ))}
          </ScrollView>
        </View>
      </TitleWithBackLayout>
    </View>
  );
};
export default Index;
