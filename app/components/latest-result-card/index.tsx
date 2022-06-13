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
      <Text style={styles.latestResult}>{Props.title}</Text>
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
              source={require('../../assets/images/home/GD.png')}
              style={styles.prImage}
            />
            <Text style={styles.text6}>{Props.summary}</Text>
          </View>
        )}

        <View
          style={{
            backgroundColor: 'lightgrey',
            flexDirection: 'row',
            padding: 5,
            alignItems: 'center',
            width: '40%',
            borderRadius: 15,
            marginHorizontal: 15,
            marginTop: 10,
            marginBottom: 10,
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

        {/* <View style={styles.pastResultView2}>
          <Image
            source={require('../../assets/images/home/GD.png')}
            style={styles.prImage}
          />
          <Text style={styles.text7}>{Props.doctor}</Text>
        </View> */}

        <View style={styles.bottomView}></View>
      </TouchableOpacity>
    </>
  );
};
export default LatestResultCard;
