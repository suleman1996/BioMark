import { Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { ArrowBack } from 'assets/svgs/index';
import { styles } from './styles';

type Props = {
  title: string;
};

export default function Header(props: Props) {
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
