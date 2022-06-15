/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

import StepIndicator from 'react-native-step-indicator';

import Camera from 'assets/svgs/report-scan';
import makeStyles from './styles';
import ReportVerify from 'assets/svgs/report-verify';
import Processing from 'assets/svgs/report-processing';
import ReportView from 'assets/svgs/report-viewing';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
type Props = { currentPosition: number; label: boolean; icons: array };

const Index = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: colors.accent,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: colors.blue,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: colors.blue,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: colors.blue,
    stepIndicatorUnFinishedColor: '#aaaaaa',
    stepIndicatorCurrentColor: colors.blue, //current bg color
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: colors.white, //current lable color
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#ffffff',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: colors.blue,
  };
  console.log(' props?.icons', props?.icons[1]);

  return (
    <View style={{ marginVertical: 5 }}>
      {/* <StepIndicator
        customStyles={customStyles}
        currentPosition={props?.currentPosition}
        stepCount={4}
        renderStepIndicator={({ position }) => props?.icons[position]}
      /> */}
      <View
        style={{
          width: '100%',
          // borderWidth: 1,
          height: widthToDp(15),
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={styles.circleView}>
          <Camera fill={colors.white} />
        </View>
        <View style={styles.blueBar} />
        <View style={styles.circleView}>
          <Processing fill={colors.white} />
        </View>
        <View style={styles.blueBar} />
        <View style={styles.circleView}>
          <ReportView fill={colors.white} />
        </View>
        <View style={styles.blueBar} />
        <View style={styles.circleView}>
          <ReportVerify />
        </View>
      </View>
    </View>
  );
};

export default Index;
