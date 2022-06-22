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

const HealthRecord = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [latestResult, setLatestResult] = useState('');
  const [pastResults, setPastResults] = useState([]);
  const [checked, setChecked] = React.useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(new Date());
  const [page, setPage] = useState(1);
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
    console.log('latesttttttttt-------------', pastResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pastResult]);

  const onConfirm = async () => {
    try {
      const result = await userService.getFilterResult({
        page: page,
        type: checked,
        start: startDate,
        end: endDate,
      });
      setModalVisible(!modalVisible);
      setPastResults(result?.data);
      console.log('resultttt-----------------------dataaaa', result?.data);
    } catch (error) {
      console.log(error);
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
    var str = 'hello how are you';
    const welcomeText = str.split(' ')[0];
    const welcomeText2 = str.split(' ')[1];
    const fullName = welcomeText + welcomeText2;
    console.log(fullName);
    // const splitOnSpace = fullName.split(' ');
    // console.log('first', splitOnSpace[0]);
    // console.log('second', splitOnSpace[1]);
    return (
      <TouchableOpacity
        onPress={() => {
          item?.result?.status == 'Pending'
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
          <Text style={styles.title}>{item?.name}</Text>
        </View>
        <Text style={styles.text3}>
          {moment(item?.received).format('MMMM D, YYYY hh:mma')}
        </Text>
        {item.ref_no == null ? null : (
          <Text style={styles.text3}>REF: {item?.ref_no}</Text>
        )}

        {item.result.summary && (
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowBack fill={colors.white} />
          </TouchableOpacity>
          <Text style={styles.navHeading}>Health Records</Text>
        </View>
        <View style={styles.navSearch}>
          <SearchBarWithLeftScanIcon />
        </View>
      </View>
      <View style={styles.containerBody}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.healthReports}>
            <Text style={styles.text}>Your Health Reports</Text>
            <Text style={styles.text2}>
              This is your health reports where you can view present and past
              results from lab reports.
            </Text>
          </View>

          <Text style={styles.latestResult}>Your Latest Results</Text>
          {latestResult.message === 'No latest result' ? (
            <Text style={styles.resultMessage}>{latestResult.message}</Text>
          ) : (
            <LatestResultCard
              title="Your Latest Results"
              name={latestResult?.name}
              received={moment(latestResult?.received).format(
                'MMMM D, YYYY hh:mma'
              )}
              ref_no={latestResult?.ref_no}
              status={latestResult?.result?.status}
              onPress={() =>
                latestResult?.result?.status == 'Converted'
                  ? navigation.navigate(SCREENS.RESULT_OVERVIEW)
                  : null
              }
              summary={latestResult?.result?.summary}
              doctor={latestResult?.result?.doctor}
            />
          )}

          <TouchableOpacity
            style={styles.uploadResult}
            onPress={() => navigation.navigate(SCREENS.RESULT_UPLOAD)}
          >
            <GoogleFitButton disabled={false} title="Upload Results" />
          </TouchableOpacity>

          <View style={styles.filterView}>
            <Text style={styles.text5}>Past Results</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Filter fill={colors.heading} />
            </TouchableOpacity>
          </View>

          <Text style={styles.resultMessage}>
            {pastResults?.message == 'No results' && 'No Result Found'}
          </Text>

          <HealthRecordFilter
            visible={modalVisible}
            title="Filter Results"
            title2="Document Upload Type"
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
          />

          {!pastResults?.message && (
            <FlatList
              data={pastResults}
              renderItem={renderItem2}
              keyExtractor={(item) => item.id}
            />
          )}

          {pastResults.length > 0 && page == 1 ? (
            <TouchableOpacity style={styles.uploadResult}>
              <GoogleFitButton
                disabled={false}
                title="Load more data"
                onPress={() => setPage((prev) => prev + 1)}
              />
            </TouchableOpacity>
          ) : pastResults?.message == 'No results' ? null : (
            <Text style={styles.loadMoreText}>
              You dont't have any more past results
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};
export default HealthRecord;
