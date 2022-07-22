import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import Styles from './styles';
import { SearchBarWithLeftScanIcon } from 'components/higher-order';
import { useTheme } from 'react-native-paper';
import { ArrowBack } from 'assets/svgs';
import { useNavigation } from '@react-navigation/native';
import { GoogleFitButton } from 'components/button';
import { userService } from 'services/user-service/user-service';

import HealthRecordFilter from 'components/health-records-filter';

import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';
import {
  getReduxLatestResult,
  getReduxPastResult,
} from 'store/home/home-actions';

import Filter from '../../../../../assets/svgs/filter';
import SCREENS from 'navigation/constants/index';
import LatestResultCard from 'components/latest-result-card';
import moment from 'moment';
import fonts from 'assets/fonts';
import { showMessage } from 'react-native-flash-message';
import { useTranslation } from 'react-i18next';
import { navigate } from 'services/nav-ref';

const HealthRecord = () => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [latestResult, setLatestResult] = useState('');
  const [latestResultItem, setLatestResultItem] = useState('');
  const [pastResults, setPastResults] = useState([]);
  const [checked, setChecked] = React.useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [noMore, setNoMore] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  const { colors } = useTheme();

  const styles = Styles(colors);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const newResult = useSelector(
    (state: IAppState) => state.home.getLatestResultData
  );
  const pastResult = useSelector(
    (state: IAppState) => state.home.getPastResultData
  );

  useEffect(() => {
    dispatch(getReduxLatestResult());
    dispatch(getReduxPastResult());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPastResults(pastResult);
    setLatestResult(newResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pastResult]);

  useEffect(() => {
    if (page !== 1) onConfirm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const onConfirm = async () => {
    try {
      const result = await userService.getFilterResult({
        page: page,
        type: checked,
        start: startDate,
        end: endDate,
      });
      setModalVisible(false);
      if (result?.data?.message === 'No results') {
        setNoMore(true);
        return;
      }
      setPastResults([...pastResults, ...result?.data]);
      // setPastResults(result?.data);
    } catch (error) {
      if (error.errMsg.status == '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error.errMsg.status == false) {
        showMessage({
          message: error.errMsg.data.message,
          type: 'danger',
        });
      } else {
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
      }
    }
  };

  //startDate
  const handleConfirm = (date) => {
    setStartDate(date);
    cancelDatePicker();
  };
  const cancelDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  //endDate
  const handleConfirm2 = (date) => {
    setEndDate(date);
    cancelEndDatePicker();
  };
  const cancelEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };
  const showEndDatePicker = () => {
    if (!startDate) {
      setEndDatePickerVisibility(false);
    } else {
      setEndDatePickerVisibility(true);
    }
  };

  const renderItem2 = ({ item }) => {
    setLatestResultItem(item);
    return (
      <TouchableOpacity
        onPress={() => {
          item?.result?.status == 'Pending' ||
          item?.result?.status == 'In Progress' ||
          item?.result?.status == 'For Deletion' ||
          item?.result?.status == 'Format Not Supported'
            ? navigation.navigate(SCREENS.PENDING_RESULT_OVERVIEW, {
                result: item,
              })
            : navigation.navigate(SCREENS.RESULT_OVERVIEW, {
                result: item,
              });
        }}
        style={styles.pastResultMainView}
      >
        <View style={styles.view}>
          <Image
            source={require('assets/images/home/pad.png')}
            style={{ height: 30, width: 30 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item?.name}</Text>
            <Text style={styles.text3}>
              {moment(item?.received).format('MMMM D, YYYY hh:mma')}
            </Text>
            {item.ref_no == null ? null : (
              <Text style={styles.text3}>REF: {item?.ref_no}</Text>
            )}
          </View>
        </View>

        {item?.result?.summary && (
          <View style={styles.pastResultView}>
            <Image
              source={require('assets/images/home/info.png')}
              style={styles.prImage}
            />
            <Text style={styles.text6}>
              {item?.result?.summary.split(/[0-9]+ out of [0-9]+/)[0]}
              <Text style={styles.summaryText}>
                {item?.result?.summary.match(/[0-9]+ out of [0-9]+/)}
              </Text>
              {item?.result?.summary.split(/[0-9]+ out of [0-9]+/)[1]}
            </Text>
          </View>
        )}

        {item?.result?.status == 'Pending' ? (
          <View style={styles.pendingView}>
            <View style={styles.pendingView2}>
              <View style={styles.pendingRoundView}></View>
              <Text
                style={{
                  marginHorizontal: 8,
                  fontFamily: fonts.OpenSansBold,
                  color: 'black',
                }}
              >
                {item?.result?.status == 'Pending' ? 'Under Review' : null}
              </Text>
            </View>
          </View>
        ) : item?.result?.status == 'In Progress' ? (
          <View style={styles.pendingView}>
            <View style={styles.pendingView2}>
              <View style={styles.inProgressRoundView}></View>
              <Text
                style={{
                  marginHorizontal: 8,
                  fontFamily: fonts.OpenSansBold,
                  color: 'black',
                }}
              >
                {item?.result?.status == 'In Progress' ? 'In Progress' : null}
              </Text>
            </View>
          </View>
        ) : item?.result?.status == 'For Deletion' ? (
          <View style={styles.pendingView}>
            <View style={styles.forDeletionView2}>
              <View style={styles.forDeletionRoundView}></View>
              <Text
                style={{
                  marginHorizontal: 8,
                  fontFamily: fonts.OpenSansBold,
                  color: '#EFEFF0',
                }}
              >
                {item?.result?.status == 'For Deletion' ? 'For Deletion' : null}
              </Text>
            </View>
          </View>
        ) : item?.result?.status == 'Format Not Supported' ? (
          <View style={styles.pendingView}>
            <View style={styles.notSupportedView2}>
              <View style={styles.notSupportedRoundView}></View>
              <Text
                style={{
                  marginHorizontal: 8,
                  fontFamily: fonts.OpenSansBold,
                  color: 'black',
                }}
              >
                {item?.result?.status == 'Format Not Supported'
                  ? 'Not Supported'
                  : null}
              </Text>
            </View>
          </View>
        ) : item?.result?.status == 'Converted' ? (
          <View style={styles.pendingView}>
            <View style={styles.pendingView2}>
              <View style={styles.convertedRoundView}></View>
              <Text
                style={{
                  marginHorizontal: 8,
                  fontFamily: fonts.OpenSansBold,
                  color: 'black',
                }}
              >
                {item.result.status}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.pastResultView2}>
            <Image
              source={require('../../../../../assets/images/home/doctor.png')}
              style={styles.prImage}
            />
            <Text style={styles.text7}>{item.result.doctor}</Text>
          </View>
        )}

        <View style={styles.bottomView}></View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}
        >
          <TouchableOpacity onPress={() => navigate(SCREENS.YOUR_HEALTH)}>
            <ArrowBack fill={colors.white} />
          </TouchableOpacity>
          <Text style={styles.navHeading}>
            {t('pages.search.recordKeeping.suggestions.healthRecords')}
          </Text>
        </View>
        <View style={styles.navSearch}>
          <SearchBarWithLeftScanIcon />
        </View>
      </View>
      <View style={styles.containerBody}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.healthReports}>
            <Text style={styles.text}>{t('pages.results.healthReport')}</Text>
            <Text style={styles.text2}>
              {t('pages.results.healthReportDesc')}
            </Text>
          </View>

          <Text style={styles.latestResult}>
            {t('pages.results.latestResults')}
          </Text>
          {latestResult.message === 'No latest result' ? (
            <Text style={styles.resultMessage}>{latestResult.message}</Text>
          ) : (
            <LatestResultCard
              title={t('pages.results.latestResults')}
              name={latestResult?.name}
              received={moment(latestResult?.received).format(
                'MMMM D, YYYY hh:mma'
              )}
              ref_no={latestResult?.ref_no}
              status={latestResult?.result?.status}
              onPress={() =>
                latestResult?.result?.status == 'Converted'
                  ? navigation.navigate(SCREENS.RESULT_OVERVIEW, {
                      result: latestResultItem,
                    })
                  : navigation.navigate(SCREENS.RESULT_OVERVIEW, {
                      result: latestResultItem,
                    })
              }
              summary={latestResult?.result?.summary}
              doctor={latestResult?.result?.doctor}
            />
          )}

          <TouchableOpacity
            style={styles.uploadResult}
            onPress={() => navigation.navigate(SCREENS.RESULT_UPLOAD)}
          >
            <GoogleFitButton
              disabled={false}
              title={t('pages.results.uploadResults')}
            />
          </TouchableOpacity>

          <View style={styles.filterView}>
            <Text style={styles.text5}>{t('pages.results.pastResults')}</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true), setPastResults([]);
              }}
            >
              <Filter fill={colors.heading} />
            </TouchableOpacity>
          </View>

          <Text style={styles.resultMessage}>
            {pastResults?.message == 'No results' &&
              t('pages.searchResults.noResults')}
          </Text>

          <HealthRecordFilter
            visible={modalVisible}
            title={t('pages.results.filters.title')}
            title2={t('pages.results.filters.uploadType')}
            cancelModal={() => setModalVisible(!modalVisible)}
            closeModal={() => setModalVisible(!modalVisible)}
            firstValue={'first'}
            secondValue={'second'}
            touchableRadio1={() => setChecked('first')}
            onPressRadio1={() => setChecked('first')}
            status={checked === 'first' ? 'checked' : 'unchecked'}
            touchableRadio2={() => setChecked('second')}
            onPressRadio2={() => setChecked('second')}
            status2={checked === 'second' ? 'checked' : 'unchecked'}
            startDateText={
              startDate ? moment(startDate).format('MM/DD/YYYY') : null
            }
            endDateText={endDate ? moment(endDate).format('MM/DD/YYYY') : null}
            handleConfirm={handleConfirm}
            handleConfirm2={handleConfirm2}
            onPressClearFilter={() => {
              setChecked(''),
                setStartDate(''),
                setEndDate(new Date()),
                setPastResults(pastResult);
            }}
            onConifrm={() => onConfirm()}
            cancelDatePicker={cancelDatePicker}
            showDatePicker={showDatePicker}
            isDatePickerVisible={isDatePickerVisible}
            cancelEndDatePicker={cancelEndDatePicker}
            showEndDatePicker={showEndDatePicker}
            isEndDatePickerVisible={isEndDatePickerVisible}
            onModalClose={() => setModalVisible(false)}
          />

          {!pastResults?.message && (
            <FlatList
              data={pastResults}
              renderItem={renderItem2}
              keyExtractor={(item) => item.id}
            />
          )}

          {!noMore ? (
            <TouchableOpacity style={styles.uploadResult}>
              <GoogleFitButton
                disabled={false}
                title={t('pages.results.loadMoreData')}
                onPress={() => {
                  setPage((prev) => prev + 1);
                }}
              />
            </TouchableOpacity>
          ) : pastResults?.message == 'No results' ? null : (
            <Text style={styles.loadMoreText}>
              {t('pages.results.noMorePastResults')}
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};
export default HealthRecord;
