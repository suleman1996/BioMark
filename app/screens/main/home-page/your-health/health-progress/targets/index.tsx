import React, { useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import PagerView from 'react-native-pager-view';

import { heightToDp } from 'utils/functions/responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';

import makeStyles from './styles';
import { ArrowBack } from 'assets/svgs';
import { SearchBarWithLeftScanIcon } from 'components/higher-order';
import AddGradient from 'assets/svgs/add-gradient';
// import navigation from 'navigation/';

export default function InboxScreen() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const navigation = useNavigation();

  const pagerRef = useRef<any>();
  const [currentPage, setCurrentPage] = useState(0);
  const onPageScroll = (event: any) => {
    const { position } = event.nativeEvent;
    if (position !== currentPage) {
      setCurrentPage(position);
    }
  };

  const BloodSugar = () => {
    return (
      <View style={styles.TabContainer}>
        <Text style={styles.yourTargetsHeading}>Your Targets</Text>
        <View style={styles.outerTarget}>
          <View style={styles.targetsContainer}>
            <Text style={styles.targetText}>12:59 pm Apr 4, 2022</Text>
          </View>
          <View style={styles.targetsContainer}>
            <Text style={styles.targetText}>FPG Fasting 80.0-130.0 mg/dL</Text>
          </View>
          <View style={styles.targetsContainer}>
            <Text style={styles.targetText}>
              PPG Post-Meal 80.0-180.0 mg/dL
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const HbA1c = () => {
    return (
      <View style={styles.TabContainer}>
        <Text style={styles.yourTargetsHeading}>Your Targets</Text>
        <View style={styles.outerTarget}>
          <View style={styles.targetsContainer}>
            <Text style={styles.targetText}>06:19 pm May 16, 2022</Text>
          </View>
          <View style={styles.targetsContainer}>
            <Text style={styles.targetText}>Goal Percentage 6.0%</Text>
          </View>
        </View>

        <View
          style={[styles.outerTarget, { backgroundColor: colors.opacityBlack }]}
        >
          <View style={styles.targetsContainer}>
            <Text style={styles.targetText}>05:57 pm May 16, 2022</Text>
          </View>
          <View style={styles.targetsContainer}>
            <Text style={styles.targetText}>Goal Percentage 6.0%</Text>
          </View>
        </View>
      </View>
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
          <Text style={styles.navHeading}>Targets</Text>
        </View>
        <View style={styles.navSearch}>
          <SearchBarWithLeftScanIcon />
        </View>
      </View>
      <LinearGradient
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        colors={['#2C6CFC', '#2CBDFC']}
      >
        <View style={styles.tabNameContainer}>
          <Pressable
            onPress={() => pagerRef.current.setPage(0)}
            style={[
              styles.tab,
              currentPage == 0 ? { borderBottomWidth: 3 } : {},
            ]}
          >
            <Text style={styles.tabText}>Blood Sugar</Text>
          </Pressable>
          <Pressable
            onPress={() => pagerRef.current.setPage(1)}
            style={[
              styles.tab,
              currentPage == 1 ? { borderBottomWidth: 3 } : {},
            ]}
          >
            <Text style={styles.tabText}>HbA1c</Text>
          </Pressable>
        </View>
      </LinearGradient>
      <ScrollView>
        <View style={styles.lowerContainer}>
          <View
            style={{ height: heightToDp(100), paddingBottom: heightToDp(20) }}
          >
            <PagerView
              ref={pagerRef}
              onPageScroll={onPageScroll}
              style={styles.pagerView}
              initialPage={0}
            >
              <View key="0">
                <BloodSugar />
              </View>
              <View key="1">
                <HbA1c />
              </View>
            </PagerView>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity>
        <View style={styles.fixedIconView}>
          <AddGradient />
        </View>
      </TouchableOpacity>
    </View>
  );
}
