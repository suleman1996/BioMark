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

import Styles from './styles';
import { TitleWithBackLayout } from 'components/layouts';
import SearchMeuBar from 'components/search-menu-bar/index';
import { Button } from 'components/button';
import Pdf from 'assets/svgs/pdf';
import RenderResults from './result-card';

const Index = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  const dispatch = useDispatch();
  const resultOverView = useSelector(
    (state: IAppState) => state.home.getResultOverViewData
  );

  const [showSummaryummary, setSummary] = React.useState(true);
  const [lapid, setLapid] = React.useState(true);
  const [isInfo, setIsInfo] = React.useState(false);
  const [lipidData] = React.useState([
    {
      id: 0,
      title: 'Total Cholestrol',
      subTitle: '4 mmol/L',
      summary:
        'Unlike the calculated LDL, this Direct LDL actually meassures the level of your LDL or bad cholestrol. This test is used to access your risk of cardiovascular disease and monitor your LDL level.',
    },
    {
      id: 1,
      title: 'Total Cholestrol',
      subTitle: '4 mmol/L',
      summary:
        'Unlike the calculated LDL, this Direct LDL actually meassures the level of your LDL or bad cholestrol. This test is used to access your risk of cardiovascular disease and monitor your LDL level.',
      status: 'danger',
    },
    {
      id: 3,
      title: 'Total Cholestrol',
      subTitle: '4 mmol/L',
      summary:
        'Unlike the calculated LDL, this Direct LDL actually meassures the level of your LDL or bad cholestrol. This test is used to access your risk of cardiovascular disease and monitor your LDL level.',
    },
  ]);

  React.useEffect(() => {
    dispatch(getReduxResultOverview());
    console.log('Result OverView Redux ', resultOverView);

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

  return (
    <View style={styles.container}>
      <ResultsDetails visible={isInfo} />
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
            <SearchMeuBar placeHolder="Search Biomark..." />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <RenderSummary />
            <Button svg={<Pdf fill={colors.white} />} title="See Report" />
            <RenderTitle
              title="LIPID STUDIES"
              state={lapid}
              setState={setLapid}
            />
            {lapid && (
              <>
                <FlatList
                  data={lipidData}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <RenderResults item={item} />}
                />
              </>
            )}
          </ScrollView>
        </View>
      </TitleWithBackLayout>
    </View>
  );
};

export default Index;
