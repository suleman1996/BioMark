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
  getReduxHealthTracker,
  getReduxDashboard,
  getHealthTrackerRisks,
} from 'store/home/home-actions';

import Filter from '../../../../../assets/svgs/filter';
import SCREENS from 'navigation/constants/index';

const HealthRecord = () => {
  const [modalVisible, setModalVisible] = useState(false);
  // const [checked, setChecked] = React.useState('');

  const { colors } = useTheme();

  const styles = Styles(colors);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const hell = useSelector((state: IAppState) => state.home.healthTracker);
  const dashboard = useSelector((state: IAppState) => state.home.dashboard);
  const healthRisk = useSelector((state: IAppState) => state.home.healthRisks);

  useEffect(() => {
    dispatch(getReduxHealthTracker());
    console.log('Health Trackeer api =======>', hell);
    dispatch(getReduxDashboard());
    console.log('Dashboard api =======>', dashboard);
    dispatch(getHealthTrackerRisks());
    console.log('healthRisk api =======>', healthRisk);
    // handleHEalthTracker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const latestResult = [
    {
      title: 'Test',
      text: 'March 22, 2022 09:00pm',
      Ref: 'REF:555444333',
      text2: 'Converted',
    },
  ];

  const pastResult = [
    {
      title: 'Result Printed on March 22, 2022',
      text: 'March 21, 2022 09:00pm',
      Ref: 'CVD-VGTKYP',
      text2: 'You have 6 out of 25 tests that need attention',
      text3: 'Clinic Queen Avenue Clinic',
    },
    {
      title: 'Result Printed on March 22, 2022',
      text: 'March 21, 2022 09:00pm',
      Ref: 'CVD-VGTKYP',
      text2: 'You have 6 out of 25 tests that need attention',
      text3: 'Clinic Queen Avenue Clinic',
    },
    {
      title: 'Result Printed on March 22, 2022',
      text: 'March 21, 2022 09:00pm',
      Ref: 'CVD-VGTKYP',
      text2: 'You have 6 out of 25 tests that need attention',
      text3: 'Clinic Queen Avenue Clinic',
    },
    {
      title: 'Result Printed on March 22, 2022',
      text: 'March 21, 2022 09:00pm',
      Ref: 'CVD-VGTKYP',
      text2: 'You have 6 out of 25 tests that need attention',
      text3: 'Clinic Queen Avenue Clinic',
    },
  ];

  const renderItem = ({ item }) => (
    <View
      style={{
        backgroundColor: 'white',
        paddingTop: 10,
        marginTop: 20,
        borderRadius: 10,
        elevation: 7,
        marginBottom: 10,
      }}
    >
      <View style={styles.view}>
        <Image
          source={require('../../../../../assets/images/home/GD.png')}
          style={{ height: 30, width: 30 }}
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Text style={styles.text3}>{item.text}</Text>
      <Text style={styles.text3}>{item.Ref}</Text>

      <View style={styles.roundView}>
        <View style={styles.round}></View>
        <Text style={styles.text4}>{item.text2}</Text>
      </View>
      <View style={styles.bottomView}></View>
    </View>
  );

  const renderItem2 = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(SCREENS.RESULT_OVERVIEW)}
      style={{
        backgroundColor: 'white',
        paddingTop: 10,
        marginTop: 20,
        borderRadius: 10,
        elevation: 10,
        marginBottom: 0,
      }}
    >
      <View style={styles.view}>
        <Image
          source={require('../../../../../assets/images/home/GD.png')}
          style={{ height: 30, width: 30 }}
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Text style={styles.text3}>{item.text}</Text>
      <Text style={styles.text3}>{item.Ref}</Text>

      <View style={styles.pastResultView}>
        <Image
          source={require('../../../../../assets/images/home/GD.png')}
          style={styles.prImage}
        />
        <Text style={styles.text6}>{item.text2}</Text>
      </View>

      <View style={styles.pastResultView2}>
        <Image
          source={require('../../../../../assets/images/home/GD.png')}
          style={styles.prImage}
        />
        <Text style={styles.text7}>{item.text3}</Text>
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

          <Text style={styles.latestResult}>Your Latest Results</Text>
          <FlatList
            data={latestResult}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />

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
            data={pastResult}
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
