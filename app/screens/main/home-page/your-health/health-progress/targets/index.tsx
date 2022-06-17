import React, { useEffect, useRef, useState } from 'react';
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
import LinearGradient from 'react-native-linear-gradient';

import { SearchBarWithLeftScanIcon } from 'components/higher-order';
import { BloodSugar, HbA1c } from 'components';

import SCREENS from 'navigation/constants/index';

import { ArrowBack } from 'assets/svgs';
import AddGradient from 'assets/svgs/add-gradient';

import makeStyles from './styles';

export default function InboxScreen({ route }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const navigation = useNavigation();

  const pagerRef = useRef<any>();
  const [currentPage, setCurrentPage] = useState(0);

  const { ADD_HBA1C, ADD_BLOOD_SUGAR } = SCREENS;

  const onPageScroll = (event: any) => {
    const { position } = event.nativeEvent;
    if (position !== currentPage) {
      setCurrentPage(position);
    }
  };

  useEffect(() => {
    console.log(route.params.key);
    if (!route.params.key) return;
    pagerRef.current.setPage(route.params.key);
  }, [route.params.key]);

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
            <Text
              style={[
                styles.tabText,
                currentPage == 0
                  ? { color: colors.shineBlue }
                  : { color: colors.darkPrimary },
              ]}
            >
              Blood Sugar
            </Text>
          </Pressable>
          <Pressable
            onPress={() => pagerRef.current.setPage(1)}
            style={[
              styles.tab,
              currentPage == 1 ? { borderBottomWidth: 3 } : {},
            ]}
          >
            <Text
              style={[
                styles.tabText,
                currentPage == 1
                  ? { color: colors.shineBlue }
                  : { color: colors.darkPrimary },
              ]}
            >
              HbA1c
            </Text>
          </Pressable>
        </View>
      </LinearGradient>
      <View style={styles.lowerContainer}>
        <PagerView
          ref={pagerRef}
          onPageScroll={onPageScroll}
          style={styles.pagerView}
          initialPage={0}
        >
          <ScrollView
            contentContainerStyle={styles.tabScrollContainerSize}
            key="0"
          >
            <BloodSugar />
          </ScrollView>
          <ScrollView
            contentContainerStyle={styles.tabScrollContainerSize}
            key="1"
          >
            <HbA1c />
          </ScrollView>
        </PagerView>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (currentPage === 0) {
            navigation.navigate(ADD_BLOOD_SUGAR);
          } else {
            navigation.navigate(ADD_HBA1C);
          }
        }}
      >
        <View style={styles.fixedIconView}>
          <AddGradient />
        </View>
      </TouchableOpacity>
    </View>
  );
}
