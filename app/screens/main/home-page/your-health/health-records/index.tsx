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

const HealthRecord = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [latestResult, setLatestResult] = useState('');
  const [pastResults, setPastResults] = useState([]);
  // const [checked, setChecked] = React.useState('');

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
    console.log('past results ', pastResult);
    setPastResults(pastResult);
    console.log('latest results =======>', newResult);
    // alert(JSON.stringify(newResult.result.summary));
    setLatestResult(newResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem2 = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(SCREENS.RESULT_OVERVIEW)}
      style={styles.pastResultMainView}
    >
      <View style={styles.view}>
        <Image
          source={require('../../../../../assets/images/home/GD.png')}
          style={{ height: 30, width: 30 }}
        />
        <Text style={styles.title}>{item.name}</Text>
      </View>
      <Text style={styles.text3}>{item.received}</Text>
      <Text style={styles.text3}>REF: {item.ref_no}</Text>

      <View style={styles.pastResultView}>
        <Image
          source={require('../../../../../assets/images/home/GD.png')}
          style={styles.prImage}
        />
        <Text style={styles.text6}>{item.result.summary}</Text>
      </View>

      <View style={styles.pastResultView2}>
        <Image
          source={require('../../../../../assets/images/home/GD.png')}
          style={styles.prImage}
        />
        <Text style={styles.text7}>{item.result.doctor}</Text>
      </View>

      <View style={styles.bottomView}></View>
    </TouchableOpacity>
  );

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

          <LatestResultCard
            title="Your Latest Results"
            name={latestResult?.name}
            received={latestResult?.received}
            ref_no={latestResult?.ref_no}
            summary={latestResult?.result?.summary}
            doctor={latestResult?.result?.doctor}
          />
          {/* <FlatList
            data={latestResult}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          /> */}
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

          <HealthRecordFilter
            visible={modalVisible}
            title="Filter Results"
            title2="Document Upload Type"
            cancelModal={() => setModalVisible(!modalVisible)}
            closeModal={() => setModalVisible(!modalVisible)}
            firstValue={'first'}
            secondValue={'second'}
            // clearFilter={()=>set}
            // status={checked === 'first' ? 'checked' : 'unchecked'}
            // onPressRadio1={() => setChecked('first')}
            // touchableRadio1={() => setChecked('first')}
          />

          <FlatList
            data={pastResults}
            renderItem={renderItem2}
            keyExtractor={(item) => item.id}
          />

          <TouchableOpacity style={styles.uploadResult}>
            <GoogleFitButton
              disabled={false}
              title="Load more data"
              onPress={() => console.log('pressed')}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};
export default HealthRecord;
