import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
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
import { userService } from 'services/user-service/user-service';

const Index = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const styles = Styles(colors);
  const dispatch = useDispatch();
  const resultOverView = useSelector(
    (state: IAppState) => state.home.getResultOverViewData
  );

  const [showSummaryummary, setSummary] = React.useState(true);
  const [lapid, setLapid] = React.useState(true);
  const [isInfo, setIsInfo] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [filterOption1] = React.useState([
    { id: 0, title: 'All' },
    { id: 1, title: 'Abnormal' },
  ]);
  const [selectedfilterOption1, setSelectedfilterOption1] = React.useState({
    id: 0,
    title: 'All',
  });
  const [pdfReport, setPdfReport] = React.useState('');

  React.useEffect(() => {
    dispatch(getReduxResultOverview(route?.params?.result?.lab_id));
    console.log('Result OverView Redux ', resultOverView);
    PdfData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const PdfData = async () => {
    try {
      const result = await userService.getResultPdf(resultOverView?.lab_id);

      setPdfReport(result.data);

      //   setPdf(pspPdfLinks.link);
    } catch (err) {
      console.log('Pdf report error ', err);
    }
  };

  const RenderTitle = ({ state, setState, title }) => (
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
        <RenderTitle
          title="Summary"
          state={showSummaryummary}
          setState={setSummary}
        />
      </View>
      {showSummaryummary && (
        <>
          <View style={styles.infoView}>
            <AntDesign color={colors.blue} name="infocirlceo" />
            <Text style={styles.infoText}>
              {/* <Text>You have</Text>
            <Text style={{ color: colors.heading }}> 1 out of 3 </Text>
            <Text>That need attention</Text> */}
              {resultOverView?.result?.summary}
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
      <View style={styles.overLay}>
        <View style={styles.overLayContainer}>
          <RenderHeading title="Results Details" />
          <RenderHeading title="Source" />
          <RenderSubheading subTitle={resultOverView?.provider} />
          <RenderHeading title="Referring Doctor or Clinic" />
          <RenderSubheading subTitle={resultOverView?.result?.doctor} />
          <RenderHeading title="Lab Reference Number" />
          <RenderSubheading subTitle={resultOverView?.ref_no} />
          <RenderHeading title="Report Received" />
          <RenderSubheading
            subTitle={moment(resultOverView?.report_received).format(
              'MMM DD, YYYY'
            )}
          />
          <RenderHeading title="Report Printed" />
          <RenderSubheading
            subTitle={moment(resultOverView?.report_printed).format(
              'MMM DD, YYYY'
            )}
          />

          <View style={{ marginTop: 20 }}>
            <Button
              onPress={() => setIsInfo(false)}
              marginVertical={1}
              marginHorizontal={1}
              title="Close"
            />
          </View>
        </View>
      </View>
    );
  };

  const applyFilter = () => {
    dispatch(
      getReduxResultOverview(
        route?.params?.result?.lab_id,
        selectedfilterOption1?.title
      )
    );
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <ResultsDetails visible={isInfo} />
      <HealthProgressFilter
        option1="Filter Type"
        visible={isVisible}
        setIsVisible={setIsVisible}
        filterOption1={filterOption1}
        selectedfilterOption1={selectedfilterOption1}
        setSelectedfilterOption1={setSelectedfilterOption1}
        onApplyPress={() => applyFilter()}
      />
      <TitleWithBackLayout
        shadow={colors.blue}
        title="Result Overview"
        isShare={true}
        isInfo={true}
        onPressInfo={setIsInfo}
        // onSharePress={() => onShare(pdfReport)}
        onSharePress={async () => {
          await onShare({
            title: 'Sharing pdf file from BioMark',
            message: 'Please take a look at this file',
            url: `data:application/pdf;base64,${pdfReport}`,
          });
        }}
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
              title="See Report"
            />
            {resultOverView?.panel?.map((result) => (
              <>
                <FlatList
                  ListHeaderComponent={
                    <RenderTitle
                      title={result?.name}
                      state={lapid}
                      setState={setLapid}
                    />
                  }
                  data={result?.biomarker}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <RenderResults item={item} />}
                />
                <View style={{ height: 20 }} />
              </>
            ))}
          </ScrollView>
        </View>
      </TitleWithBackLayout>
    </View>
  );
};

export default Index;
