import { View, Text, Image } from 'react-native';
import React from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';

type props = {
  name?: string;
  received?: string;
  ref_no?: string;
  summary?: string;
  doctor?: string;
  title?: string;
};

const LatestResultCard = (Props: props) => {
  const { colors } = useTheme();
  const styles = Styles(colors);

  return (
    <>
      <Text style={styles.latestResult}>{Props.title}</Text>
      <View style={styles.latestResultView}>
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

        <View style={styles.pastResultView2}>
          <Image
            source={require('../../assets/images/home/GD.png')}
            style={styles.prImage}
          />
          <Text style={styles.text7}>{Props.doctor}</Text>
        </View>

        <View style={styles.bottomView}></View>
      </View>
    </>
  );
};
export default LatestResultCard;
