import React from 'react';
import { View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

import makeStyles from './styles';

const Lungs = () => {
  const styles = makeStyles();

  return (
    <View style={styles.container}>
      <CircularProgress
        value={96}
        radius={80}
        valueSuffix={'%'}
        title="SpO2"
        titleColor="#8493AE"
        titleStyle={styles.content}
        progressValueColor="black"
        progressValueFontSize={19}
        activeStrokeColor={'#1B96D8'}
        inActiveStrokeOpacity={0.2}
        activeStrokeWidth={15}
        inActiveStrokeWidth={15}
      />
    </View>
  );
};

export default Lungs;
