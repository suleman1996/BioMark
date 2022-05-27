import React, { useEffect } from 'react';

import { useIsFocused } from '@react-navigation/native';
import { Pressable, View, Text, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';

import makeStyles from './styles';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import QRCode from 'react-qr-code';
import ButtonComponent from 'components/base/button';

type Props = {
  route?: any;
};

const SingleCovidResult = (props: Props) => {
  const { route } = props;
  const id = route?.params?.id;
  console.log(id);
  const focused = useIsFocused();
  const { colors }: any = useTheme();
  const styles = makeStyles(colors);

  /*eslint-disable */

  useEffect(() => {}, [focused]);
  /*eslint-enable */

  const SingleResult = () => {
    return (
      <Pressable style={styles.parent}>
        <Entypo
          name="circle-with-minus"
          size={responsiveFontSize(100)}
          color={colors.lightGreen}
        />
        <Text style={styles.text1}>
          Your Test result is <Text style={styles.text2}>POSITIVE</Text> for
          COVID-19
        </Text>
        <View style={{ marginTop: heightToDp(1) }} />
        <View style={styles.headerLine} />
        <View style={{ marginTop: heightToDp(1) }} />
        <View style={styles.row}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={styles.title}>Testing Center</Text>
            <Text style={styles.content}>Queen's avenue clinic</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              paddingLeft: widthToDp(4),
            }}
          >
            <Text style={styles.title}>Test Center</Text>
            <Text style={styles.content}>03/03/2022</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.itemContainer}>
            <Text style={styles.title}>Testing Type</Text>
            <Text style={styles.content}>COVID-19 RT-PCR (Urgent)</Text>
          </View>
          <View style={[styles.itemContainer, { paddingLeft: widthToDp(4) }]}>
            <Text style={styles.title}>Report Date</Text>
            <Text style={styles.content}>03/03/2022</Text>
          </View>
        </View>
        <View style={{ marginTop: heightToDp(1) }} />
        <View style={styles.headerLine} />
        <View style={{ marginTop: heightToDp(1) }} />
        <Text style={styles.text1}>Share to share Covid-19 Test Result</Text>
        <View style={{ marginTop: heightToDp(2) }} />
        <QRCode value="heysdfsdfsdfsfsdfsdfsdfsdfsfsdf" />
        <View style={{ marginTop: heightToDp(1) }} />
        <Text style={styles.text3}>COVID-19 POSITIVE (03/03/2022)</Text>
        <Text style={styles.text4}>
          Please isolate and quarantine yourself.
        </Text>
        <View style={{ marginTop: heightToDp(2) }} />
        <ButtonComponent onPress={undefined} title={'Share Test Result'} />
      </Pressable>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SingleResult />
        </ScrollView>
      </View>
    </>
  );
};

export default SingleCovidResult;
