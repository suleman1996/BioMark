import React, { useEffect, useState } from 'react';

import { FlatList, Text, View } from 'react-native';
import { TouchableRipple, useTheme } from 'react-native-paper';

import BookTestButton from 'components/button/book-test';
import TestBookinButton from 'components/button/bookings';
import DependentButton from 'components/button/dependents';
import ViewResultsButton from 'components/button/view-results';
import QRCarousel from 'components/ui/qr-carousel';
import { TitleWithSearchBarLayout } from 'components/layouts';

import { logNow } from 'utils/functions/log-binder';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import makeStyles from './styles';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';
import { getCovidHomeResultsR } from 'store/covid/covid-actions';
import { CovidLatestResponse } from 'types/api';

type Props = {};

const Covid19Home = (props: Props) => {
  const {} = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();

  const [selectedHorizontal, setSelectedHorizontal] = useState(0);

  const focused = useIsFocused();
  const covidHomeResults = useSelector(
    (state: IAppState) => state.covid.covidHomeResults
  );
  // const data = [];

  /*eslint-disable */
  const getCovidHomeResults = async () => {
    const res: any = await dispatch(getCovidHomeResultsR());
  };

  useEffect(() => {
    getCovidHomeResults();
  }, [focused]);
  /*eslint-enable */

  const horizontalListItem = ({
    item,
    index,
  }: {
    item: CovidLatestResponse;
    index: number;
  }) => {
    const { name = '' } = item;
    const ifST =
      selectedHorizontal === index
        ? { color: colors.darkPrimary }
        : { color: colors.inactive };
    const ifSBLine =
      selectedHorizontal === index
        ? { borderBottomWidth: 2 }
        : { borderBottomWidth: 0 };
    return (
      <TouchableRipple
        onPress={() => {
          logNow('hello');
          setSelectedHorizontal(index);
        }}
        style={[styles.horizontalListItem, ifSBLine]}
      >
        <Text style={[styles.horizontalListItemText, ifST]}>{name}</Text>
      </TouchableRipple>
    );
  };

  return (
    <>
      {/* <ActivityIndicator visible={isLoading} /> */}
      <TitleWithSearchBarLayout isBack title={'COVID-19'}>
        <View style={styles.container}>
          <View style={styles.badgesContainer}>
            <BookTestButton />
            <TestBookinButton />
          </View>
          <View style={styles.badgesContainer}>
            <ViewResultsButton />
            <DependentButton />
          </View>
          <View style={{ marginTop: heightToDp(2) }} />
          <FlatList
            style={{ flexGrow: 0 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={<View style={{ width: widthToDp(10) }} />}
            ListFooterComponent={<View style={{ width: widthToDp(10) }} />}
            data={covidHomeResults}
            renderItem={horizontalListItem}
          />
          <QRCarousel data={covidHomeResults[selectedHorizontal]} />
        </View>
      </TitleWithSearchBarLayout>
    </>
  );
};

export default Covid19Home;
