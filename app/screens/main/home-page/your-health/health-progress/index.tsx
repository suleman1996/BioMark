import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Styles from './styles';
import { SearchBarWithLeftScanIcon } from 'components/higher-order';
import { useTheme } from 'react-native-paper';
import { ArrowBack } from 'assets/svgs';
import { useNavigation } from '@react-navigation/native';
import SCREENS from 'navigation/constants/index';

const Index = () => {
  const { colors } = useTheme();

  const styles = Styles(colors);
  const { TARGETS } = SCREENS;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowBack fill={colors.white} />
          </TouchableOpacity>
          <Text style={styles.navHeading}>Health Progress</Text>
        </View>
        <View style={styles.navSearch}>
          <SearchBarWithLeftScanIcon />
        </View>
      </View>
      <View style={styles.containerBody}>
        <TouchableOpacity onPress={() => navigation.navigate(TARGETS)}>
          <Text>Targets</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;
