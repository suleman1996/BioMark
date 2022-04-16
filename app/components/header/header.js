import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import ArrowBack from '../../assets/svgs/arrow-back';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';

export default function header(props) {
  const navigations = useNavigation();
  return (
    <>
      <View style={{overflow: 'hidden', paddingBottom: 5}}>
        <View style={styles.header}>
          <TouchableRipple
            borderless
            style={styles.ripple}
            onPress={() => navigations.goBack()}
            rippleColor={'#8493AE20'}>
            <ArrowBack />
          </TouchableRipple>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  ripple: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    //   backgroundColor: 'red',
  },
  title: {marginLeft: 5, fontFamily: fonts.regular, fontSize: 16},
});
