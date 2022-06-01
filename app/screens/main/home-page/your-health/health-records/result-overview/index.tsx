import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { useTheme } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Styles from './styles';
import { TitleWithBackLayout } from 'components/layouts';
import SearchMeuBar from 'components/search-menu-bar/index';

const Index = () => {
  const { colors } = useTheme();

  const styles = Styles(colors);

  const [showSummaryummary, setSummary] = React.useState(false);

  const RenderTitle = ({ state, setState }) => (
    <TouchableOpacity
      onPress={() => setState(!state)}
      style={styles.titleContainer}
    >
      <Text style={styles.renderTitle}>Summary</Text>
      <AntDesign color={colors.blue} size={15} name={state ? 'up' : 'down'} />
    </TouchableOpacity>
  );

  const RenderSummary = () => (
    <View style={styles.summaryContainer}>
      <View style={{ marginHorizontal: 5 }}>
        <RenderTitle state={showSummaryummary} setState={setSummary} />
      </View>
      {showSummaryummary && (
        <View style={styles.infoView}>
          <AntDesign color={colors.blue} name="infocirlceo" />
          <Text style={styles.infoText}>
            <Text>You have</Text>
            <Text style={{ color: colors.heading }}> 1 out of 3 </Text>
            <Text>That need attention</Text>
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TitleWithBackLayout
        shadow={colors.blue}
        title="Result Overview"
        isShare={true}
        isInfo={true}
      >
        <View style={styles.miniHeader}>
          <Text style={styles.miniHeaderText}>Received on March 23, 2022</Text>
        </View>
        <View style={[styles.container, { paddingHorizontal: 10 }]}>
          <View style={{ marginTop: -18 }}>
            <SearchMeuBar placeHolder="Search Biomark..." />
          </View>
          <RenderSummary />
        </View>
      </TitleWithBackLayout>
    </View>
  );
};

export default Index;
