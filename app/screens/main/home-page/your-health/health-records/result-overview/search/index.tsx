import { View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

import { Text, useTheme } from 'react-native-paper';
import { TitleWithBackLayout } from 'components/layouts';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import Styles from './styles';
import CrossIcon from 'react-native-vector-icons/AntDesign';
import fonts from 'assets/fonts';
import SCREENS from 'navigation/constants/index';
import { healthRecordServices } from 'services/health-record-service';
import { useTranslation } from 'react-i18next';

const Search = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const route = useRoute();
  const styles = Styles(colors);
  const navigation = useNavigation();

  const [searchText, setSearchText] = React.useState('');
  const [searchData, setSearchData] = React.useState();

  const searchResult = async (search) => {
    try {
      const result = await healthRecordServices.getSearchResult(
        route?.params?.labId,
        search
      );
      console.log(
        'Here is the search results data',
        result.data,
        ' ',
        route?.params?.labId
      );

      setSearchData(result.data.results);
    } catch (error) {
      console.error('search result error ', error);
    }
  };

  const RenderSearch = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(SCREENS.MORE_INFO, {
          result_id: item?.biomarker_id ? item?.biomarker_id : item?.id,
        })
      }
      style={styles.renderSearchView}
    >
      <Text style={{ fontFamily: fonts.regular, fontSize: 14 }}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  );

  const RenderSearchPanel = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSearchData({ biomarker_card: [...item.biomarkers] }),
          setSearchText(item.header_name);
      }}
      style={styles.renderSearchView}
    >
      <Text style={{ fontFamily: fonts.regular, fontSize: 14 }}>
        {item?.header_name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <TitleWithBackLayout
      shadow={colors.blue}
      title={t('pages.resultSummary.tabs.summary.tableHeaders.result')}
    >
      <View style={styles.container}>
        <View style={styles.searchView}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onChangeText={(item) => {
                setSearchText(item);
                searchResult(item);
              }}
              value={searchText}
              placeholder={'Search BioMarker..'}
              autoFocus={true}
            />
            <TouchableOpacity onPress={() => setSearchText('')}>
              <CrossIcon style={{ marginRight: 10 }} size={18} name="close" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          {searchText !== '' && (
            <>
              {searchData?.biomarker_card?.length > 0 && (
                <Text style={styles.searchHeadingTExt}>BIOMARKERS</Text>
              )}
              {searchData?.biomarker_card?.map((lable) => (
                <RenderSearch item={lable} />
              ))}
              {searchData?.panel_card?.length > 0 && (
                <Text style={styles.searchHeadingTExt}>PANEL</Text>
              )}
              {searchData?.panel_card?.map((lable) => (
                <RenderSearchPanel item={lable} />
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </TitleWithBackLayout>
  );
};

export default Search;
