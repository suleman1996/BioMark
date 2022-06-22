import { View, TouchableOpacity } from 'react-native';
import React from 'react';

import { Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import Styles from './styles';
import SCREENS from 'navigation/constants/index';
import SearIcon from 'react-native-vector-icons/Fontisto';
import Filter from '../../assets/svgs/filter';

type Props = { placeHolder: string; onPress: any; LabId: any };

const Index = (props: Props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const styles = Styles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.searchView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(SCREENS.SEARCH_RESULT, { labId: props.LabId });
          }}
          style={styles.inputView}
        >
          <View style={styles.input}>
            <Text style={styles.placeHolder}>{props.placeHolder}</Text>
          </View>
          <SearIcon style={{ marginRight: 10 }} size={18} name="search" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterView}>
        <TouchableOpacity onPress={props.onPress}>
          <Filter fill={colors.blue} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;
