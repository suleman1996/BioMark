import { View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

import { Text, useTheme } from 'react-native-paper';
import { TitleWithBackLayout } from 'components/layouts';
import { useRoute } from '@react-navigation/native';

import Styles from './styles';
import CrossIcon from 'react-native-vector-icons/AntDesign';
import { userService } from 'services/user-service/user-service';
import fonts from 'assets/fonts';

const Search = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const styles = Styles(colors);

  const [searchText, setSearchText] = React.useState('');
  const [searchDummy] = React.useState([
    {
      id: 5,
      header_name: 'Liver Function',
      mapping_priority: 5,
      biomarkers: [
        {
          id: 119,
          name: 'Alkaline Phosphatase',
        },
        {
          id: 120,
          name: 'Albumin',
        },
        {
          id: 121,
          name: 'Albumin',
        },
        {
          id: 122,
          name: 'Alanine Transaminase (ALT)',
        },
        {
          id: 151,
          name: 'Aspartate Transferase (AST)',
        },
        {
          id: 152,
          name: 'Albumin',
        },
        {
          id: 153,
          name: 'Albumin',
        },
        {
          id: 154,
          name: 'Aspartate Transferase (AST)',
        },
      ],
    },
    {
      id: 6,
      header_name: 'Lipid Studies',
      mapping_priority: 6,
      biomarkers: [
        {
          id: 105,
          name: 'Apolipoprotein B',
        },
        {
          id: 115,
          name: 'Aspartate Transferase (AST)',
        },
        {
          id: 116,
          name: 'Alkaline Phosphatase',
        },
        {
          id: 156,
          name: 'Alkaline Phosphatase',
        },
        {
          id: 157,
          name: 'Aspartate Transferase (AST)',
        },
        {
          id: 158,
          name: 'Alkaline Phosphatase',
        },
        {
          id: 167,
          name: 'Apolipoprotein A1',
        },
        {
          id: 168,
          name: 'Aspartate Transferase (AST)',
        },
        {
          id: 170,
          name: 'Apo B / Apo A1 Ratio',
        },
      ],
    },
  ]);

  const searchResult = async () => {
    try {
      const result = await userService.getSearchResult(route?.params?.labId);
      console.log('Search Result ', result.data);
    } catch (error) {
      console.log('error ', error);
    }
  };

  const RenderSearch = ({ item }) => (
    <View style={styles.renderSearchView}>
      <Text style={{ fontFamily: fonts.regular, fontSize: 14 }}>
        {item?.name}
      </Text>
    </View>
  );

  return (
    <TitleWithBackLayout shadow={colors.blue} title="Result">
      <View style={styles.container}>
        <View style={styles.searchView}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onChangeText={(item) => {
                setSearchText(item), searchResult();
              }}
              value={searchText}
              placeholder={'Search BioMarker..'}
            />
            <TouchableOpacity onPress={() => setSearchText('')}>
              <CrossIcon style={{ marginRight: 10 }} size={18} name="close" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          {searchText !== '' &&
            searchDummy?.map((item) => (
              <>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    color: colors.heading,
                    marginVertical: 15,
                    fontSize: 18,
                  }}
                >
                  {item?.header_name}
                </Text>
                {item?.biomarkers?.map((lable) => (
                  <RenderSearch item={lable} />
                ))}
              </>
            ))}
        </ScrollView>
      </View>
    </TitleWithBackLayout>
  );
};

export default Search;
