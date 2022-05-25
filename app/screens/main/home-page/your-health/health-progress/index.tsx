import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import Styles from './styles';
import { SearchBarWithLeftScanIcon } from 'components/higher-order';
import { useTheme, TouchableRipple } from 'react-native-paper';
import { ArrowBack } from 'assets/svgs';
import { useNavigation } from '@react-navigation/native';

import Weight from './weight/index';
import BloodSugar from './blood-sugar/index';
import Medication from './medication/index';
import HbA1c from './hba1c/index';
import BloodPressue from './blood-pressure/index';
import SCREENS from 'navigation/constants/index';

const Index = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);

  const { TARGETS } = SCREENS;

  const navigation = useNavigation();
  const [healthProgress] = useState([
    { id: 0, title: 'Weight' },
    { id: 1, title: 'Blood Sugar' },
    { id: 2, title: 'Medication' },
    { id: 3, title: 'HbA1c' },
    { id: 4, title: 'Blood Pressure' },
  ]);
  const [selectedHorizontal, setSelectedHorizontal] = useState(0);

  const horizontalListItem = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => {
    const ifST =
      selectedHorizontal === index
        ? { color: colors.darkPrimary }
        : { color: colors.inactive };
    const ifSBLine =
      selectedHorizontal === index
        ? { borderBottomWidth: 3 }
        : { borderBottomWidth: 0 };
    return (
      <TouchableRipple
        onPress={() => {
          setSelectedHorizontal(index);
        }}
        style={[styles.horizontalListItem, ifSBLine]}
      >
        <Text style={[styles.horizontalListItemText, ifST]}>{item?.title}</Text>
      </TouchableRipple>
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
        <FlatList
          data={healthProgress}
          keyExtractor={(item) => item.id}
          style={{ flexGrow: 0 }}
          horizontal
          renderItem={horizontalListItem}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.body}>
          {selectedHorizontal == 0 && <Weight />}
          {selectedHorizontal == 1 && <BloodSugar />}
          {selectedHorizontal == 2 && <Medication />}
          {selectedHorizontal == 3 && <HbA1c />}
          {selectedHorizontal == 4 && <BloodPressue />}
        </View>
      </View>
    </View>
  );
};

export default Index;
