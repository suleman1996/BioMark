import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import style from './styles';
import { ArrowBack } from 'assets/svgs';
import { useTheme } from 'react-native-paper';

type Props = { title: any };

const PlaneHeader = (props: Props) => {
  const navigation = useNavigation();

  const { colors } = useTheme();
  const styles = style(colors);
  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ArrowBack fill={colors.heading} />
      </TouchableOpacity>
      <Text style={styles.navHeading}>{props.title}</Text>
    </View>
  );
};

export default PlaneHeader;
