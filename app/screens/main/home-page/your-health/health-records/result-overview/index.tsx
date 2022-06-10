import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';

import { useTheme } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { getReduxResultOverview } from 'store/home/home-actions';
import { useRoute } from '@react-navigation/native';

import Styles from './styles';
import { TitleWithBackLayout } from 'components/layouts';
import SearchMeuBar from 'components/search-menu-bar/index';
import { Button } from 'components/button';
import Pdf from 'assets/svgs/pdf';
import RenderResults from './result-card';
import HealthProgressFilter from 'components/health-progress-filter/index';

const Index = () => {
  const { colors } = useTheme();
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

  React.useEffect(() => {
    dispatch(getReduxResultOverview(route?.params?.result?.lab_id));
    // console.log('Result OverView Redux ', resultOverView);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <View style={styles.infoView}>
          <AntDesign color={colors.blue} name="infocirlceo" />
          <Text style={styles.infoText}>
            {/* <Text>You have</Text>
            <Text style={{ color: colors.heading }}> 1 out of 3 </Text>
            <Text>That need attention</Text> */}
            {resultOverView?.result?.summary}
          </Text>
        </View>
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
          <RenderSubheading subTitle="Gribbles Pathoogy" />
          <RenderHeading title="Referring Doctor or Clinic" />
          <RenderSubheading subTitle="Clinic Queen's Avenue Cilnic" />
          <RenderHeading title="Lab Reference Number" />
          <RenderSubheading subTitle="CVD-HSVOBP" />
          <RenderHeading title="Report Received" />
          <RenderSubheading subTitle="Mar 04,2022" />
          <RenderHeading title="Report Printed" />
          <RenderSubheading subTitle="Mar 04,2022" />

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
      >
        <View style={styles.miniHeader}>
          <Text style={styles.miniHeaderText}>Received on March 23, 2022</Text>
        </View>
        <View style={[styles.container, { paddingHorizontal: 10 }]}>
          <View style={{ marginTop: -18 }}>
            <SearchMeuBar
              onPress={() => setIsVisible(!isVisible)}
              placeHolder="Search Biomark..."
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <RenderSummary />
            <Button svg={<Pdf fill={colors.white} />} title="See Report" />
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
