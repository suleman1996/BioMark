import React, { useEffect } from 'react';

import { FlatList, Pressable, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';

import makeStyles from './styles';
import { getAllCovidResultsR } from 'store/covid/covid-actions';
import { CovidResultListResponse } from 'types/api';
import { IAppState } from './../../../store/IAppState';
import { dateFormat1 } from 'utils/functions/date-format';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';
import BioEmptyTestResult from 'components/svg/bio-empty-test-result';

type Props = {};

const ViewCovidResults = (props: Props) => {
  const {} = props;
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const { colors }: any = useTheme();
  const styles = makeStyles(colors);

  const data = useSelector((state: IAppState) => state.covid.allCovidResults);
  // const data = [];

  /*eslint-disable */
  const getAllCovidResults = async () => {
    await dispatch(getAllCovidResultsR());
  };

  useEffect(() => {
    getAllCovidResults();
  }, [focused]);
  /*eslint-enable */

  const singleFlatListItem = ({ item }: { item: CovidResultListResponse }) => {
    const changeBtnBg =
      item.test_result == 'NEGATIVE' || item.test_result == 'NOT DETECTED'
        ? { backgroundColor: colors.lightGreen }
        : { backgroundColor: colors.red };
    return (
      <Pressable
        onPress={() =>
          navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
            screen: SCREENS.SINGLECOVIDRESULT,
            params: { id: item.id },
          })
        }
        style={styles.parent}
      >
        <View style={styles.header}>
          <Text style={styles.whoText}>{item.name}</Text>
          <Text style={styles.header2}>
            Booking ID -{' '}
            <Text style={styles.testCodeText}>{item.order_id}</Text>
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.testType} numberOfLines={3}>
            {item.test_type}
          </Text>
          <View style={[styles.testResult, changeBtnBg]}>
            <Text style={styles.testResultText}>{item.test_result}</Text>
          </View>
        </View>
        <Text style={styles.dateText}>{dateFormat1(item.date_of_test)}</Text>
      </Pressable>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={singleFlatListItem}
          ListEmptyComponent={() => {
            return (
              <View style={styles.emptyResult}>
                <BioEmptyTestResult width={22} height={22} />
                <Text style={styles.emptyTxt1}>No Test Results</Text>
                <Text style={styles.emptyTxt2}>
                  You have no Test results recorded.
                </Text>
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

export default ViewCovidResults;
