import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import fonts from 'assets/fonts';

type props = {
  name?: string;
  received?: string;
  ref_no?: string;
  summary?: string;
  doctor?: string;
  title?: string;
  status?: string;
  onPress?: any;
};

const LatestResultCard = (Props: props) => {
  const { colors } = useTheme();
  const styles = Styles(colors);

  return (
    <>
      <TouchableOpacity style={styles.latestResultView} onPress={Props.onPress}>
        <View style={styles.view}>
          <Image
            source={require('../../assets/images/home/pad.png')}
            style={{ height: 30, width: 30 }}
          />
          <Text style={styles.title}>{Props.name}</Text>
        </View>
        <Text style={styles.text3}>{Props.received}</Text>
        <Text style={styles.text3}>REF: {Props.ref_no}</Text>

        {Props.summary && (
          <View style={styles.pastResultView}>
            <Image
              source={require('../../assets/images/home/info.png')}
              style={styles.prImage}
            />
            <Text style={styles.text6}>
              {Props.summary.split(/[0-9]+ out of [0-9]+/)[0]}
              <Text style={styles.summaryText}>
                {Props.summary.match(/[0-9]+ out of [0-9]+/)}
              </Text>
              {Props.summary.split(/[0-9]+ out of [0-9]+/)[1]}
            </Text>
          </View>
        )}

        {Props.doctor && (
          <View style={styles.pastResultView2}>
            <Image
              source={require('../../assets/images/home/doctor.png')}
              style={styles.prImage}
            />
            <Text style={styles.text7}>{Props.doctor}</Text>
          </View>
        )}

        {Props.status && (
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
              alignItems: 'center',
              borderRadius: 15,
              marginHorizontal: 15,
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                backgroundColor: '#EFEFEF',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5,
                borderRadius: 15,
                marginHorizontal: 15,
              }}
            >
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor: colors.greenDark,
                  width: 15,
                  height: 15,
                }}
              ></View>
              <Text
                style={{
                  marginHorizontal: 8,
                  fontFamily: fonts.OpenSansBold,
                  color: 'black',
                }}
              >
                {Props.status}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.bottomView}></View>
      </TouchableOpacity>
    </>
  );
};
export default LatestResultCard;
