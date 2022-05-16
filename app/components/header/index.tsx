import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { ArrowBack } from 'assets/svgs/index';

import makeStyles from './styles';

type Props = {
  title: string;
};

export default function Header(props: Props) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const navigations = useNavigation();

  return (
    <>
      <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
        <View style={styles.header}>
          <TouchableRipple
            borderless
            style={styles.ripple}
            onPress={() => navigations.goBack()}
            rippleColor={'#8493AE20'}
          >
            <ArrowBack />
          </TouchableRipple>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </View>
    </>
  );
}
