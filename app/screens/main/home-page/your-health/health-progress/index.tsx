import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';

import { SearchBarWithLeftScanIcon } from 'components/higher-order';
import { useTheme, TouchableRipple } from 'react-native-paper';
import { ArrowBack } from 'assets/svgs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FloatingAction } from 'react-native-floating-action';

import Weight from './weight/index';
import BloodSugar from './blood-sugar/index';
import Medication from './medication/index';
import HbA1c from './hba1c/index';
import BloodPressue from './blood-pressure/index';
import SCREENS from 'navigation/constants/index';

import PlusMedicationIcon from 'assets/svgs/plus-medication';
import PillMedicationIcon from 'assets/svgs/pill-mediction';
import EditMedicationIcon from 'assets/svgs/edit-medication-icon';
import TickMedicationIcon from 'assets/svgs/tick-medication-icon';

import Styles from './styles';
import fonts from 'assets/fonts';
import { getReduxHealthTracker } from 'store/home/home-actions';
import { useDispatch } from 'react-redux';

const Index = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const [healthProgress] = useState([
    { id: 0, title: 'Weight' },
    { id: 1, title: 'Blood Sugar' },
    { id: 2, title: 'Medication' },
    { id: 3, title: 'HbA1c' },
    { id: 4, title: 'Blood Pressure' },
  ]);
  const [selectedHorizontal, setSelectedHorizontal] = useState(
    route?.params ? route?.params : 0
  );

  const horizontalListItem = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => {
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
        <Text style={styles.horizontalListItemText}>{item?.title}</Text>
      </TouchableRipple>
    );
  };

  const ACTION_BUTTONS = [
    {
      text: 'Take Medication',
      icon: <TickMedicationIcon />,
      name: 'bt_TakeMedication',
      position: 1,
      color: colors.white,
      buttonSize: 53,
      textBackground: '#0000',
      textElevation: 0,
      margin: 0,
      textStyle: [
        {
          fontSize: 16,
          fontFamily: fonts.mulishRegular,
          color: colors.white,
        },
      ],
    },
    {
      text: 'Add New Medication',
      icon: <PlusMedicationIcon />,
      iconColor: colors.shineBlue,
      name: 'bt_AddMedication',
      margin: 0,
      textBackground: '#0000',
      textElevation: 0,
      position: 2,
      color: colors.white,
      buttonSize: 53,
      textStyle: [
        {
          fontSize: 16,
          fontFamily: fonts.mulishRegular,
          color: colors.white,
        },
      ],
    },
    {
      text: 'Edit Medication',
      icon: <EditMedicationIcon />,
      iconColor: colors.shineBlue,
      name: 'bt_EditMedication',
      position: 3,
      textBackground: '#0000',
      margin: 0,
      textElevation: 0,
      color: colors.white,
      buttonSize: 53,
      textStyle: [
        {
          fontSize: 16,
          fontFamily: fonts.mulishRegular,
          color: colors.white,
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}
        >
          <TouchableOpacity
            onPress={() => {
              dispatch(getReduxHealthTracker());
              navigation.navigate(SCREENS.YOUR_HEALTH);
            }}
          >
            <ArrowBack fill={colors.white} />
          </TouchableOpacity>
          <Text style={styles.navHeading}>Health Progress</Text>
        </View>
        <View style={styles.navSearch}>
          <SearchBarWithLeftScanIcon />
        </View>
      </View>
      <View style={styles.containerBody}>
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
      {selectedHorizontal == 2 && (
        <FloatingAction
          actions={ACTION_BUTTONS}
          onPressItem={(item) => {
            if (item === 'bt_TakeMedication') {
              navigation.navigate(SCREENS.MEDICATION);
            } else if (item === 'bt_AddMedication') {
              navigation.navigate(SCREENS.ADD_NEW_MEDICATION);
            } else if (item === 'bt_EditMedication') {
              navigation.navigate(SCREENS.EDIT_MEDICATION);
            }
          }}
          overlayColor={colors.opacityBlackDark}
          // color={colors.shineBlue}
          buttonSize={53}
          distanceToEdge={35}
          actionsPaddingTopBottom={5}
          floatingIcon={<PillMedicationIcon />}
        />
      )}
    </View>
  );
};

export default Index;
