import { View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

import StepIndicator from 'react-native-step-indicator';

type Props = { currentPosition: number; label: boolean; icons: array };

const Index = (props: Props) => {
  const { colors } = useTheme();

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: colors.blue,
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

  return (
    <View style={{ marginVertical: 5 }}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={props?.currentPosition}
        stepCount={4}
        renderStepIndicator={({ position }) => props?.icons[position]}
      />
    </View>
  );
};

export default Index;
